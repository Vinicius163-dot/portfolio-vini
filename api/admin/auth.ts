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

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 min
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
  res.setHeader("Access-Control-Allow-Methods", "POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(204).end();

  // POST /api/admin/auth — login
  if (req.method === "POST") {
    const ip = (req.headers["x-forwarded-for"] as string) ?? "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ ok: false, error: "Too many attempts. Try again later." });
    }

    const { password } = req.body as { password?: string };
    if (!password) {
      return res.status(400).json({ ok: false, error: "Password required" });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      return res.status(500).json({ ok: false, error: "Server misconfigured" });
    }

    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      return res.status(401).json({ ok: false, error: "Invalid password" });
    }

    const token = signAccessToken();
    const refreshToken = signRefreshToken();
    const expiresAt = Date.now() + 15 * 60 * 1000;

    setRefreshCookie(res, refreshToken);
    return res.status(200).json({ ok: true, data: { token, expiresAt } });
  }

  // GET /api/admin/auth — refresh access token via refresh cookie
  if (req.method === "GET") {
    const refreshToken = getRefreshCookie(req);
    if (!refreshToken) {
      return res.status(401).json({ ok: false, error: "No refresh token" });
    }
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      clearRefreshCookie(res);
      return res.status(401).json({ ok: false, error: "Refresh token expired" });
    }

    const token = signAccessToken();
    const expiresAt = Date.now() + 15 * 60 * 1000;
    return res.status(200).json({ ok: true, data: { token, expiresAt } });
  }

  // DELETE /api/admin/auth — logout
  if (req.method === "DELETE") {
    clearRefreshCookie(res);
    return res.status(200).json({ ok: true, data: null });
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
