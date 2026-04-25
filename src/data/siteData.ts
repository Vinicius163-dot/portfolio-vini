import viniImg from "../assets/vini_photo.jpg";

export const siteData = {
  name: "Vinícius",
  firstName: "Vinícius",
  lastName: "Possato",
  initials: "vp",
  email: "vinicius.possato@alest.com.br",
  cvUrl: "#",

  github: {
    username: "Vinicius163-dot",
    featured: [] as string[],
    maxRepos: 6,
  },

  availability: {
    status: "available" as "available" | "busy" | "unavailable",
  },

  hero: { photo: viniImg },

  about: {
    statValues: ["05+", "20+", "10+"] as [string, string, string],
  },

  skills: {
    groups: [
      ["Java", "Spring Boot", "Python", "Golang", "Node", "REST", "GraphQL", "Microservices"],
      ["TypeScript", "React", "Next.js", "Tailwind", "Vite"],
      ["AWS", "Azure", "Terraform", "Serverless"],
      ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Bash"],
    ],
  },

  work: {
    items: [
      { periodMain: "2024 -", company: "Alest", stack: "AWS & Azure" },
      { periodMain: "2022 - 2024", company: "Previous Co.", stack: "Java & Spring Boot" },
      { periodMain: "2020 - 2022", company: "Earlier Co.", stack: "Python & Golang" },
      { periodMain: "2019 - 2020", company: "First Co.", stack: "Node & React" },
    ],
  },

  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/", icon: "github" },
  ],

  nav: [
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "skills", href: "#skills" },
    { key: "work", href: "#work" },
    { key: "contacts", href: "#contact" },
  ] as const,
};

export type NavKey = (typeof siteData.nav)[number]["key"];
