import type { VercelRequest, VercelResponse } from "@vercel/node";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  setRefreshCookie,
  clearRefreshCookie,
  getRefreshCookie,
} from "../_lib/auth";

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  record.count++;
  return record.count > MAX_ATTEMPTS;
}

async function verifyIAMCredentials(
  accessKeyId: string,
  secretAccessKey: string
): Promise<{ valid: boolean; accountId?: string; userId?: string; arn?: string }> {
  try {
    const sts = new STSClient({
      region: process.env.AWS_REGION ?? "us-east-1",
      credentials: { accessKeyId, secretAccessKey },
    });
    const { Account, UserId, Arn } = await sts.send(new GetCallerIdentityCommand({}));
    return { valid: true, accountId: Account, userId: UserId, arn: Arn };
  } catch {
    return { valid: false };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ADMIN_ORIGIN ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(204).end();

  // POST — login with IAM credentials
  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] as string) ?? "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ ok: false, error: "Too many attempts. Try again in 15 minutes." });
    }

    const { accessKeyId, secretAccessKey } = req.body as {
      accessKeyId?: string;
      secretAccessKey?: string;
    };

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ ok: false, error: "Access Key ID and Secret Access Key are required." });
    }

    const identity = await verifyIAMCredentials(accessKeyId.trim(), secretAccessKey.trim());

    if (!identity.valid) {
      return res.status(401).json({ ok: false, error: "Invalid AWS credentials." });
    }

    // If EXPECTED_ACCOUNT_ID is set, restrict to that account only
    const expectedAccount = process.env.EXPECTED_ACCOUNT_ID;
    if (expectedAccount && identity.accountId !== expectedAccount) {
      return res.status(403).json({ ok: false, error: "Credentials do not belong to the authorized account." });
    }

    const token = signAccessToken();
    const refreshToken = signRefreshToken();
    const expiresAt = Date.now() + 15 * 60 * 1000;

    setRefreshCookie(res, refreshToken);
    return res.status(200).json({
      ok: true,
      data: { token, expiresAt, identity: { accountId: identity.accountId, arn: identity.arn } },
    });
  }

  // GET — refresh access token via httpOnly refresh cookie
  if (req.method === "GET") {
    const refreshToken = getRefreshCookie(req);
    if (!refreshToken) {
      return res.status(401).json({ ok: false, error: "No refresh token." });
    }
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      clearRefreshCookie(res);
      return res.status(401).json({ ok: false, error: "Session expired. Please sign in again." });
    }
    const token = signAccessToken();
    const expiresAt = Date.now() + 15 * 60 * 1000;
    return res.status(200).json({ ok: true, data: { token, expiresAt } });
  }

  // DELETE — logout
  if (req.method === "DELETE") {
    clearRefreshCookie(res);
    return res.status(200).json({ ok: true, data: null });
  }

  return res.status(405).json({ ok: false, error: "Method not allowed." });
}
