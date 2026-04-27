import type { PortfolioData } from "../../../shared/types/portfolio";

export const siteDataFallback: PortfolioData = {
  certs: [
    { id: "cert-1", name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024", status: "active", credentialUrl: "#", badge: "developer-associate" },
    { id: "cert-2", name: "AWS Certified DevOps Engineer – Professional", issuer: "Amazon Web Services", status: "planned", badge: "devops-professional" },
    { id: "cert-3", name: "AWS Certified Machine Learning – Specialty", issuer: "Amazon Web Services", status: "planned", badge: "ml-specialty" },
  ],
  work: [
    { id: "work-1", company: "Alest", periodMain: "2023 — atual", stack: "AWS · Java · Python · React", order: 0 },
    { id: "work-2", company: "Alest", periodMain: "2021 — 2023", stack: "Java · Spring · AWS · Docker", order: 1 },
    { id: "work-3", company: "Alest", periodMain: "2019 — 2021", stack: "Python · Golang · AWS · PostgreSQL", order: 2 },
    { id: "work-4", company: "Alest", periodMain: "2018 — 2019", stack: "Node.js · React · MySQL", order: 3 },
  ],
  skills: [
    { title: "Backend",  items: ["Java", "Spring Boot", "Python", "Golang", "Node", "REST", "GraphQL", "Microservices"] },
    { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind", "Vite"] },
    { title: "Cloud",    items: ["AWS", "Azure", "Lambda", "S3", "ECS", "RDS", "CloudFormation"] },
    { title: "DevOps",   items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Datadog"] },
  ],
  social: [
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/vinicius-possato", icon: "linkedin" },
    { id: "github",   label: "GitHub",   url: "https://github.com/Vinicius163-dot",       icon: "github" },
  ],
  config: {
    email: "vinicius.possato@alest.com.br",
    cvUrl: "#",
    githubUsername: "Vinicius163-dot",
    githubRepo: "portfolio-vini",
    availability: "available",
    statValues: ["05+", "20+", "10+"],
  },
};
