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

const platforms: { name: string; icon: string }[] = [
  { name: "AWS", icon: awsLogo },
  { name: "Azure", icon: "https://skillicons.dev/icons?i=azure&theme=dark" },
  { name: "GitHub", icon: githubLogo },
  { name: "Java", icon: javaLogo },
  { name: "Spring Boot", icon: springLogo },
  { name: "Python", icon: pythonLogo },
  { name: "Go", icon: goLogo },
  { name: "Node", icon: nodeLogo },
  { name: "TypeScript", icon: typescriptLogo },
  { name: "JavaScript", icon: javascriptLogo },
  { name: "C#", icon: csharpLogo },
  { name: "React", icon: reactLogo },
  { name: "MCP", icon: mcpLogo },
  { name: "Docker", icon: dockerLogo },
  { name: "Kubernetes", icon: kubernetesLogo },
];

export default function Carousel() {
  const loop = [...platforms, ...platforms, ...platforms];

  return (
    <div className="platforms">
      <div className="platforms__track-wrap">
        <div className="platforms__track">
          {loop.map((p, i) => (
            <span key={i} className="platform-chip">
              <img
                className="platform-chip__icon"
                src={p.icon}
                alt=""
                loading="lazy"
                width={22}
                height={22}
              />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
