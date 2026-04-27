import type { PortfolioData, SectionKey } from "./portfolio";

export interface ApiSuccess<T = unknown> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

export interface AuthRequest {
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: number;
}

export interface SectionGetResponse<K extends SectionKey = SectionKey> {
  id: K;
  data: PortfolioData[K];
  source: "db" | "fallback";
}

export interface SectionPutRequest<K extends SectionKey = SectionKey> {
  id: K;
  data: PortfolioData[K];
}
