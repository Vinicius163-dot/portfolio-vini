import jwt from "jsonwebtoken";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change-me";

const ACCESS_TTL = 15 * 60;       // 15 min
const REFRESH_TTL = 7 * 24 * 3600; // 7 days

export interface TokenPayload {
  sub: "admin";
  iat?: number;
  exp?: number;
}

export function signAccessToken(): string {
  return jwt.sign({ sub: "admin" } satisfies TokenPayload, JWT_SECRET, {
    expiresIn: ACCESS_TTL,
  });
}

export function signRefreshToken(): string {
  return jwt.sign({ sub: "admin" } satisfies TokenPayload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TTL,
  });
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function extractBearerToken(req: VercelRequest): string | null {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function requireAuth(
  req: VercelRequest,
  res: VercelResponse
): boolean {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ ok: false, error: "Missing authorization header" });
    return false;
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    res.status(401).json({ ok: false, error: "Invalid or expired token" });
    return false;
  }
  return true;
}

export function setRefreshCookie(res: VercelResponse, token: string): void {
  const maxAge = REFRESH_TTL;
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/api/admin/auth`
  );
}

export function clearRefreshCookie(res: VercelResponse): void {
  res.setHeader(
    "Set-Cookie",
    "refreshToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/api/admin/auth"
  );
}

export function getRefreshCookie(req: VercelRequest): string | null {
  const raw = req.headers.cookie ?? "";
  const match = raw.match(/(?:^|;\s*)refreshToken=([^;]+)/);
  return match?.[1] ?? null;
}
