import { useMemo } from "react";
import { LANGUAGE_COLORS, type GithubRepo } from "../hooks/useGithubRepos";

interface Props {
  repos: GithubRepo[];
  hoveredId: number | null;
  onHover: (id: number | null) => void;
}

const SIZE = 440;
const CENTER = SIZE / 2;
const RADIUS = 150;

interface Node {
  repo: GithubRepo;
  x: number;
  y: number;
}

export default function ReposGraph({ repos, hoveredId, onHover }: Props) {
  const nodes: Node[] = useMemo(() => {
    const n = repos.length || 1;
    return repos.map((repo, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const seed = ((repo.id % 1000) / 1000) * 2 - 1;
      const jitter = seed * 28;
      return {
        repo,
        x: CENTER + Math.cos(angle) * (RADIUS + jitter),
        y: CENTER + Math.sin(angle) * (RADIUS + jitter),
      };
    });
  }, [repos]);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].repo;
        const b = nodes[j].repo;
        const shareLang = a.language && a.language === b.language;
        const shareTopic = a.topics.some((t) => b.topics.includes(t));
        if (shareLang || shareTopic) result.push([i, j]);
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const hasEdge = result.some(([a, b]) => a === i || b === i);
      if (!hasEdge && nodes.length > 1) {
        result.push([i, (i + 1) % nodes.length]);
      }
    }
    return result;
  }, [nodes]);

  const hoveredIndex = useMemo(() => {
    if (hoveredId === null) return null;
    return nodes.findIndex((n) => n.repo.id === hoveredId);
  }, [nodes, hoveredId]);

  const connectedSet = useMemo(() => {
    if (hoveredIndex === null || hoveredIndex < 0) return new Set<number>();
    const set = new Set<number>([hoveredIndex]);
    edges.forEach(([a, b]) => {
      if (a === hoveredIndex) set.add(b);
      if (b === hoveredIndex) set.add(a);
    });
    return set;
  }, [edges, hoveredIndex]);

  const hovered = hoveredIndex !== null && hoveredIndex >= 0 ? nodes[hoveredIndex] : null;

  return (
    <div className="repos-graph">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="repos-graph__svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="graph-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.035)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={CENTER} fill="url(#graph-bg)" />

        {edges.map(([a, b], i) => {
          const na = nodes[a];
          const nb = nodes[b];
          const active =
            hoveredIndex !== null &&
            (a === hoveredIndex || b === hoveredIndex);
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.09)"}
              strokeWidth={active ? 1.4 : 1}
              style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
            />
          );
        })}

        {nodes.map((node, i) => {
          const color = node.repo.language
            ? LANGUAGE_COLORS[node.repo.language] ?? "#9ca3af"
            : "#9ca3af";
          const isHovered = i === hoveredIndex;
          const isDim = hoveredIndex !== null && !connectedSet.has(i);
          const r = isHovered ? 11 : 7;

          return (
            <g
              key={node.repo.id}
              onMouseEnter={() => onHover(node.repo.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => window.open(node.repo.html_url, "_blank")}
              style={{
                cursor: "pointer",
                opacity: isDim ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={r + 6}
                fill={color}
                opacity={isHovered ? 0.25 : 0}
                style={{ transition: "opacity 0.2s" }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={color}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                style={{ transition: "r 0.2s" }}
              />
              <text
                x={node.x}
                y={node.y + r + 14}
                textAnchor="middle"
                fill={isHovered ? "#fff" : "rgba(255,255,255,0.45)"}
                fontSize="10.5"
                fontWeight={isHovered ? 600 : 500}
                style={{
                  transition: "fill 0.2s",
                  pointerEvents: "none",
                  fontFamily: "inherit",
                }}
              >
                {node.repo.name}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="repos-graph__tooltip">
          <div className="repos-graph__tooltip-head">
            <span
              className="repos-graph__dot"
              style={{
                background: hovered.repo.language
                  ? LANGUAGE_COLORS[hovered.repo.language] ?? "#9ca3af"
                  : "#9ca3af",
              }}
            />
            <strong>{hovered.repo.name}</strong>
          </div>
          <p>{hovered.repo.description ?? "Sem descrição."}</p>
          <div className="repos-graph__tooltip-meta">
            {hovered.repo.language && <span>{hovered.repo.language}</span>}
            <span>★ {hovered.repo.stargazers_count}</span>
            <span>⑂ {hovered.repo.forks_count}</span>
          </div>
        </div>
      )}

      <div className="repos-graph__legend">
        {repos.length} repositórios · arestas por linguagem e topics
      </div>
    </div>
  );
}
