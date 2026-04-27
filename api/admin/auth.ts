import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ADMIN_ORIGIN ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(204).end();

  // POST — login with password
  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] as string) ?? "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ ok: false, error: "Too many attempts. Try again in 15 minutes." });
    }

    const { password } = req.body as { password?: string };
    if (!password) {
      return res.status(400).json({ ok: false, error: "Password is required." });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      return res.status(500).json({ ok: false, error: "Server misconfigured — ADMIN_PASSWORD_HASH not set." });
    }

    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      return res.status(401).json({ ok: false, error: "Incorrect password." });
    }

    const token = signAccessToken();
    const refreshToken = signRefreshToken();
    const expiresAt = Date.now() + 15 * 60 * 1000;

    setRefreshCookie(res, refreshToken);
    return res.status(200).json({ ok: true, data: { token, expiresAt } });
  }

  // GET — refresh via httpOnly cookie
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
