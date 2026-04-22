const platforms: { name: string; icon: string }[] = [
  { name: "AWS", icon: "https://skillicons.dev/icons?i=aws&theme=dark" },
  { name: "Azure", icon: "https://skillicons.dev/icons?i=azure&theme=dark" },
  { name: "GitHub", icon: "https://skillicons.dev/icons?i=github&theme=dark" },
  { name: "Java", icon: "https://skillicons.dev/icons?i=java&theme=dark" },
  { name: "Spring Boot", icon: "https://skillicons.dev/icons?i=spring&theme=dark" },
  { name: "Python", icon: "https://skillicons.dev/icons?i=py&theme=dark" },
  { name: "MCP", icon: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "Golang", icon: "https://skillicons.dev/icons?i=go&theme=dark" },
  { name: "Docker", icon: "https://skillicons.dev/icons?i=docker&theme=dark" },
  { name: "Kubernetes", icon: "https://skillicons.dev/icons?i=kubernetes&theme=dark" },
  { name: "React", icon: "https://skillicons.dev/icons?i=react&theme=dark" },
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
