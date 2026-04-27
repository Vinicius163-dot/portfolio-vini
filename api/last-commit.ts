import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = (req.query.username as string) || "Vinicius163-dot";
  const repo = (req.query.repo as string) || "portfolio-vini";
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "portfolio-vercel",
        },
      }
    );

    if (!response.ok) return res.status(response.status).json({ date: null });
    const data = await response.json();
    const date: string | null = data[0]?.commit?.committer?.date ?? null;
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json({ date });
  } catch {
    return res.status(500).json({ date: null });
  }
}
