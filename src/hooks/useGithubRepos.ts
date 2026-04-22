import { useEffect, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

interface Cache {
  data: GithubRepo[];
  fetchedAt: number;
}

const TTL_MS = 60 * 60 * 1000; // 1h

function cacheKey(username: string) {
  return `portfolio:gh:${username}`;
}

function readCache(username: string): Cache | null {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cache;
    if (Date.now() - parsed.fetchedAt > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(username: string, data: GithubRepo[]) {
  try {
    const payload: Cache = { data, fetchedAt: Date.now() };
    localStorage.setItem(cacheKey(username), JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
}

interface Options {
  username: string;
  featured?: string[];
  max?: number;
}

export function useGithubRepos({ username, featured = [], max = 6 }: Options) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache(username);
      if (cached) {
        if (!cancelled) {
          setRepos(pickRepos(cached.data, featured, max));
          setLoading(false);
        }
        return;
      }

      try {
        const endpoint = import.meta.env.DEV
          ? `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
          : `/api/github-repos?username=${encodeURIComponent(username)}`;
        const res = await fetch(endpoint, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = (await res.json()) as GithubRepo[];
        writeCache(username, data);
        if (!cancelled) {
          setRepos(pickRepos(data, featured, max));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username, featured.join(","), max]);

  return { repos, loading, error };
}

function pickRepos(all: GithubRepo[], featured: string[], max: number) {
  const visible = all.filter((r) => !r.fork && !r.archived);

  if (featured.length > 0) {
    const pinned = featured
      .map((name) => visible.find((r) => r.name === name))
      .filter((r): r is GithubRepo => Boolean(r));
    const rest = visible.filter((r) => !featured.includes(r.name));
    return [...pinned, ...rest].slice(0, max);
  }

  return [...visible]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, max);
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  HCL: "#844FBA",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  "C#": "#178600",
  "C++": "#f34b7d",
};
