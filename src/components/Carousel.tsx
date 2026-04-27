import { useState } from "react";
import awsLogo from "../assets/logos/aws.png";
import csharpLogo from "../assets/logos/csharp.png";
import dockerLogo from "../assets/logos/docker.jpg";
import githubLogo from "../assets/logos/github.png";
import goLogo from "../assets/logos/go.png";
import javaLogo from "../assets/logos/java.png";
import javascriptLogo from "../assets/logos/javascript.png";
import kubernetesLogo from "../assets/logos/kubernetes.png";
import mcpLogo from "../assets/logos/mcp.png";
import nodeLogo from "../assets/logos/node.svg";
import pythonLogo from "../assets/logos/python.png";
import reactLogo from "../assets/logos/react.png";
import springLogo from "../assets/logos/spring.png";
import typescriptLogo from "../assets/logos/typescript.png";

type Category = "Backend" | "Frontend" | "Cloud" | "DevOps";

const CATEGORY_COLORS: Record<Category, string> = {
  Backend: "#6366f1",
  Frontend: "#06b6d4",
  Cloud: "#f59e0b",
  DevOps: "#22c55e",
};

const platforms: { name: string; icon: string; category: Category }[] = [
  { name: "AWS",         icon: awsLogo,        category: "Cloud"    },
  { name: "Azure",       icon: "https://skillicons.dev/icons?i=azure&theme=dark", category: "Cloud" },
  { name: "GitHub",      icon: githubLogo,     category: "DevOps"   },
  { name: "Java",        icon: javaLogo,       category: "Backend"  },
  { name: "Spring Boot", icon: springLogo,     category: "Backend"  },
  { name: "Python",      icon: pythonLogo,     category: "Backend"  },
  { name: "Go",          icon: goLogo,         category: "Backend"  },
  { name: "Node",        icon: nodeLogo,       category: "Backend"  },
  { name: "TypeScript",  icon: typescriptLogo, category: "Frontend" },
  { name: "JavaScript",  icon: javascriptLogo, category: "Frontend" },
  { name: "C#",          icon: csharpLogo,     category: "Backend"  },
  { name: "React",       icon: reactLogo,      category: "Frontend" },
  { name: "MCP",         icon: mcpLogo,        category: "Backend"  },
  { name: "Docker",      icon: dockerLogo,     category: "DevOps"   },
  { name: "Kubernetes",  icon: kubernetesLogo, category: "DevOps"   },
];

export default function Carousel() {
  const loop = [...platforms, ...platforms, ...platforms];
  const [paused, setPaused] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="platforms">
      <div
        className="platforms__track-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setActiveKey(null); }}
      >
        <div className={`platforms__track${paused ? " platforms__track--paused" : ""}`}>
          {loop.map((p, i) => {
            const key = p.name + i;
            const isActive = activeKey === key;
            return (
              <span
                key={i}
                className={`platform-chip platform-chip--icon-only${isActive ? " platform-chip--active" : ""}`}
                onMouseEnter={() => setActiveKey(key)}
                onMouseLeave={() => setActiveKey(null)}
              >
                <img
                  className="platform-chip__icon"
                  src={p.icon}
                  alt={p.name}
                  loading="lazy"
                  width={26}
                  height={26}
                />
                {isActive && (
                  <span className="platform-chip__tooltip">
                    <span className="platform-chip__tooltip-name">{p.name}</span>
                    <span
                      className="platform-chip__tooltip-badge"
                      style={{ background: CATEGORY_COLORS[p.category] + "22", color: CATEGORY_COLORS[p.category], borderColor: CATEGORY_COLORS[p.category] + "55" }}
                    >
                      {p.category}
                    </span>
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
