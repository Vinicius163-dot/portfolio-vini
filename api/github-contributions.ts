import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const username = (req.query.username as string) || "Vinicius163-dot";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN not configured" });
  }

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-vercel",
  };

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged+-user:${username}&sort=updated&order=desc&per_page=6`,
      { headers }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "GitHub API error" });
    }

    const data = await response.json();

    const contributions = (data.items ?? []).map((item: Record<string, unknown>) => ({
      id: item.id,
      title: item.title,
      url: item.html_url,
      repo: (item.repository_url as string)?.replace("https://api.github.com/repos/", "") ?? "",
      repoUrl: (item.html_url as string)?.split("/pull/")[0] ?? "",
      created_at: item.created_at,
      merged_at: (item.pull_request as Record<string, unknown>)?.merged_at ?? null,
    }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).json(contributions);
  } catch {
    return res.status(500).json({ error: "Failed to fetch contributions" });
  }
}
