import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSection } from "./_lib/dynamo";
import { siteDataFallback } from "./_lib/fallback";
import type { SectionKey } from "../shared/types/portfolio";

const VALID_SECTIONS: SectionKey[] = ["certs", "work", "skills", "social", "config"];
const CACHE_TTL = 60; // seconds

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const id = req.query.section as string;

  if (!id || !VALID_SECTIONS.includes(id as SectionKey)) {
    // Return all sections if no id specified
    const all: Record<string, unknown> = {};
    await Promise.all(
      VALID_SECTIONS.map(async (key) => {
        const dbData = await getSection(key);
        all[key] = dbData ?? siteDataFallback[key];
      })
    );
    res.setHeader("Cache-Control", `s-maxage=${CACHE_TTL}, stale-while-revalidate`);
    return res.status(200).json({ ok: true, data: all });
  }

  const section = id as SectionKey;
  const dbData = await getSection(section);
  const data = dbData ?? siteDataFallback[section];

  res.setHeader("Cache-Control", `s-maxage=${CACHE_TTL}, stale-while-revalidate`);
  return res.status(200).json({ ok: true, data: { id: section, data, source: dbData ? "db" : "fallback" } });
}
