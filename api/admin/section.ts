import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAuth } from "../_lib/auth";
import { getSection, putSection } from "../_lib/dynamo";
import type { SectionKey } from "../../shared/types/portfolio";

const VALID_SECTIONS: SectionKey[] = ["certs", "work", "skills", "social", "config"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ADMIN_ORIGIN ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (!requireAuth(req, res)) return;

  const id = req.query.id as string;
  if (!id || !VALID_SECTIONS.includes(id as SectionKey)) {
    return res.status(400).json({ ok: false, error: `Invalid section. Valid: ${VALID_SECTIONS.join(", ")}` });
  }

  const section = id as SectionKey;

  // GET /api/admin/section?id=certs
  if (req.method === "GET") {
    const data = await getSection(section);
    if (data === null) {
      return res.status(404).json({ ok: false, error: "Section not found in DB. Will use fallback." });
    }
    return res.status(200).json({ ok: true, data: { id: section, data, source: "db" } });
  }

  // PUT /api/admin/section?id=certs
  if (req.method === "PUT") {
    const { data } = req.body as { data?: unknown };
    if (data === undefined) {
      return res.status(400).json({ ok: false, error: "Missing body.data" });
    }

    const ok = await putSection(section, data as never);
    if (!ok) {
      return res.status(500).json({ ok: false, error: "Failed to write to DynamoDB" });
    }
    return res.status(200).json({ ok: true, data: { id: section, data, source: "db" } });
  }

  return res.status(405).json({ ok: false, error: "Method not allowed" });
}
