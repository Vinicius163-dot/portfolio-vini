import { useEffect, useMemo, useRef, useState } from "react";
import { LANGUAGE_COLORS, type GithubRepo } from "../hooks/useGithubRepos";

interface Props {
  repos: GithubRepo[];
  hoveredId: number | null;
  onHover: (id: number | null) => void;
}

const SIZE = 440;
const CENTER = SIZE / 2;
const RADIUS = 150;
const PADDING = 40;

interface SimNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
}

const SPRING_K = 0.015;
const REST_LENGTH = 110;
const REPULSION = 2800;
const CENTER_K = 0.008;
const DAMPING = 0.82;

const MIN_ZOOM = 0.35;
const MAX_ZOOM = 3;

export default function ReposGraph({ repos, hoveredId, onHover }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const draggingRef = useRef<{ id: number; moved: boolean } | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const [, setTick] = useState(0);
  const [view, setView] = useState({ zoom: 1, panX: 0, panY: 0 });

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < repos.length; i++) {
      for (let j = i + 1; j < repos.length; j++) {
        const a = repos[i];
        const b = repos[j];
        const shareLang = a.language && a.language === b.language;
        const shareTopic = a.topics.some((t) => b.topics.includes(t));
        if (shareLang || shareTopic) result.push([i, j]);
      }
    }
    for (let i = 0; i < repos.length; i++) {
      const hasEdge = result.some(([a, b]) => a === i || b === i);
      if (!hasEdge && repos.length > 1) {
        result.push([i, (i + 1) % repos.length]);
      }
    }
    return result;
  }, [repos]);

  useEffect(() => {
    const n = repos.length || 1;
    nodesRef.current = repos.map((repo, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const seed = ((repo.id % 1000) / 1000) * 2 - 1;
      const jitter = seed * 28;
      return {
        id: repo.id,
        x: CENTER + Math.cos(angle) * (RADIUS + jitter),
        y: CENTER + Math.sin(angle) * (RADIUS + jitter),
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      };
    });
    setTick((t) => t + 1);
  }, [repos]);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      const nodes = nodesRef.current;
      if (nodes.length > 0) {
        const forces = nodes.map(() => ({ fx: 0, fy: 0 }));

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distSq = dx * dx + dy * dy + 0.01;
            const dist = Math.sqrt(distSq);
            const f = REPULSION / distSq;
            const fxComp = (dx / dist) * f;
            const fyComp = (dy / dist) * f;
            forces[i].fx -= fxComp;
            forces[i].fy -= fyComp;
            forces[j].fx += fxComp;
            forces[j].fy += fyComp;
          }
        }

        for (const [a, b] of edges) {
          const dx = nodes[b].x - nodes[a].x;
          const dy = nodes[b].y - nodes[a].y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
          const f = SPRING_K * (dist - REST_LENGTH);
          const fxComp = (dx / dist) * f;
          const fyComp = (dy / dist) * f;
          forces[a].fx += fxComp;
          forces[a].fy += fyComp;
          forces[b].fx -= fxComp;
          forces[b].fy -= fyComp;
        }

        for (let i = 0; i < nodes.length; i++) {
          forces[i].fx += (CENTER - nodes[i].x) * CENTER_K;
          forces[i].fy += (CENTER - nodes[i].y) * CENTER_K;
        }

        let moving = false;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.fx !== null && node.fy !== null) {
            node.x = node.fx;
            node.y = node.fy;
            node.vx = 0;
            node.vy = 0;
            moving = true;
            continue;
          }
          node.vx = (node.vx + forces[i].fx) * DAMPING;
          node.vy = (node.vy + forces[i].fy) * DAMPING;
          node.x += node.vx;
          node.y += node.vy;
          node.x = Math.max(PADDING, Math.min(SIZE - PADDING, node.x));
          node.y = Math.max(PADDING, Math.min(SIZE - PADDING, node.y));
          if (Math.abs(node.vx) + Math.abs(node.vy) > 0.05) moving = true;
        }

        if (moving) setTick((t) => (t + 1) % 1_000_000);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [edges]);

  const nodes = nodesRef.current;

  const hoveredIndex = useMemo(() => {
    if (hoveredId === null) return null;
    return nodes.findIndex((n) => n.id === hoveredId);
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

  const hoveredRepo =
    hoveredIndex !== null && hoveredIndex >= 0 ? repos[hoveredIndex] : null;
  const hoveredNode =
    hoveredIndex !== null && hoveredIndex >= 0 ? nodes[hoveredIndex] : null;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      setView((prev) => {
        const viewW = SIZE / prev.zoom;
        const cursorX = prev.panX + px * viewW;
        const cursorY = prev.panY + py * viewW;

        const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
        const nextZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, prev.zoom * factor)
        );
        const nextViewW = SIZE / nextZoom;
        return {
          zoom: nextZoom,
          panX: cursorX - px * nextViewW,
          panY: cursorY - py * nextViewW,
        };
      });
    };

    const handleDblClick = () => {
      setView({ zoom: 1, panX: 0, panY: 0 });
    };

    svg.addEventListener("wheel", handleWheel, { passive: false });
    svg.addEventListener("dblclick", handleDblClick);
    return () => {
      svg.removeEventListener("wheel", handleWheel);
      svg.removeEventListener("dblclick", handleDblClick);
    };
  }, []);

  const svgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  };

  const onPointerDown = (
    e: React.PointerEvent<SVGGElement>,
    index: number
  ) => {
    e.preventDefault();
    (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
    pointerIdRef.current = e.pointerId;
    draggingRef.current = { id: nodes[index].id, moved: false };
    const { x, y } = svgPoint(e.clientX, e.clientY);
    nodes[index].fx = x;
    nodes[index].fy = y;
  };

  const onPointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!draggingRef.current) return;
    const idx = nodes.findIndex((n) => n.id === draggingRef.current!.id);
    if (idx < 0) return;
    const { x, y } = svgPoint(e.clientX, e.clientY);
    nodes[idx].fx = x;
    nodes[idx].fy = y;
    draggingRef.current.moved = true;
  };

  const onPointerUp = (
    e: React.PointerEvent<SVGGElement>,
    index: number,
    repo: GithubRepo
  ) => {
    if (pointerIdRef.current !== null) {
      try {
        (e.currentTarget as SVGGElement).releasePointerCapture(
          pointerIdRef.current
        );
      } catch {
        /* ignore */
      }
    }
    const wasMoved = draggingRef.current?.moved ?? false;
    draggingRef.current = null;
    pointerIdRef.current = null;
    nodes[index].fx = null;
    nodes[index].fy = null;
    if (!wasMoved) {
      window.open(repo.html_url, "_blank", "noreferrer");
    }
  };

  return (
    <div className="repos-graph">
      <svg
        ref={svgRef}
        viewBox={`${view.panX} ${view.panY} ${SIZE / view.zoom} ${SIZE / view.zoom}`}
        className="repos-graph__svg"
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
          if (!na || !nb) return null;
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
              stroke={
                active ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.09)"
              }
              strokeWidth={active ? 1.4 : 1}
            />
          );
        })}

        {nodes.map((node, i) => {
          const repo = repos[i];
          if (!repo) return null;
          const color = repo.language
            ? LANGUAGE_COLORS[repo.language] ?? "#9ca3af"
            : "#9ca3af";
          const isHovered = i === hoveredIndex;
          const isDim = hoveredIndex !== null && !connectedSet.has(i);
          const r = isHovered ? 11 : 7;

          return (
            <g
              key={node.id}
              onPointerDown={(e) => onPointerDown(e, i)}
              onPointerMove={onPointerMove}
              onPointerUp={(e) => onPointerUp(e, i, repo)}
              onMouseEnter={() => onHover(repo.id)}
              onMouseLeave={() => onHover(null)}
              style={{
                cursor: draggingRef.current?.id === node.id ? "grabbing" : "grab",
                opacity: isDim ? 0.3 : 1,
                transition: "opacity 0.2s",
                touchAction: "none",
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
              />
              <text
                x={node.x}
                y={node.y + r + 14}
                textAnchor="middle"
                fill={isHovered ? "#fff" : "rgba(255,255,255,0.45)"}
                fontSize="10.5"
                fontWeight={isHovered ? 600 : 500}
                style={{
                  pointerEvents: "none",
                  fontFamily: "inherit",
                  userSelect: "none",
                }}
              >
                {repo.name}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredRepo && hoveredNode && (
        <div className="repos-graph__tooltip">
          <div className="repos-graph__tooltip-head">
            <span
              className="repos-graph__dot"
              style={{
                background: hoveredRepo.language
                  ? LANGUAGE_COLORS[hoveredRepo.language] ?? "#9ca3af"
                  : "#9ca3af",
              }}
            />
            <strong>{hoveredRepo.name}</strong>
          </div>
          <p>{hoveredRepo.description ?? "Sem descrição."}</p>
          <div className="repos-graph__tooltip-meta">
            {hoveredRepo.language && <span>{hoveredRepo.language}</span>}
            <span>★ {hoveredRepo.stargazers_count}</span>
            <span>⑂ {hoveredRepo.forks_count}</span>
          </div>
        </div>
      )}

      <div className="repos-graph__legend">
        {repos.length} repositórios · arraste · scroll para zoom · duplo clique reseta
      </div>
    </div>
  );
}
