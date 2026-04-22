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
    label: "Disponível para projetos",
  },

  heroBlurb: {
    annotation: "... /About project ...",
    title:
      "The goal is <em>to build a modern, performant portfolio</em> for a Software Engineer & Solutions Architect that presents skills, projects, work experience and contact in a clean, functional way.",
  },

  hero: {
    eyebrow:
      "My goal is to <em>write maintainable, clean and reliable code</em> that scales well in production.",
    titleLines: ["Software", "Engineer"],
    description:
      "Blending robust backend engineering with clean, responsive frontend development to build products that scale, perform, and delight.",
    photo: viniImg,
  },

  services: {
    annotation: "... /services ...",
    title: "Services",
    subtitle:
      "Designing and shipping reliable, scalable and responsive products.",
    items: [
      {
        title: "Backend Engineering",
        description:
          "Reliable APIs and services with strong architecture, clean data layers, and maintainable code at the core.",
        tags: ["REST & GraphQL", "Microservices"],
      },
      {
        title: "Frontend Development",
        description:
          "Responsive interfaces using React, TypeScript, and modern tooling for fast, consistent, reliable experiences.",
        tags: ["React & Next.js", "Design systems"],
      },
      {
        title: "Performance & Scale",
        description:
          "Fast, mobile-first products optimized for speed, observability, and dependable performance under load.",
        tags: ["Caching & queues", "Observability"],
      },
      {
        title: "Cloud & DevOps",
        description:
          "Cloud-native setups with automated pipelines, containerization, and IaC for predictable, safe releases.",
        tags: ["AWS & Docker", "CI/CD pipelines"],
      },
    ],
  },

  about: {
    annotation: "... /About me ...",
    title:
      "Hello! I'm Vinícius, I'm a <em>Software Engineer & Solutions Architect</em>. More than <em>5 years</em> experience.",
    description:
      "I design and build production systems end-to-end, from cloud architecture to frontend experience. I focus on shipping reliable software that scales — simple where it can be, robust where it has to be.",
    approachTitle: "My Approach",
    steps: [
      { number: "01", label: "Understand product goals" },
      { number: "02", label: "Design reliable architecture" },
      { number: "03", label: "Ship and iterate fast" },
    ],
    stats: [
      { value: "05+", label: "Years Of Experience" },
      { value: "20+", label: "Projects Delivered" },
      { value: "10+", label: "Clients Served" },
    ],
  },

  skills: {
    annotation: "... /skills ...",
    title: "Skills",
    tail: "Some of my <em>favorite technologies, topics, or tools</em> that I worked with",
    groups: [
      {
        title: "Backend",
        items: [
          "Java",
          "Spring Boot",
          "Python",
          "Golang",
          "Node",
          "REST",
          "GraphQL",
          "Microservices",
        ],
      },
      {
        title: "Frontend",
        items: ["TypeScript", "React", "Next.js", "Tailwind", "Vite"],
      },
      {
        title: "Cloud",
        items: ["AWS", "Azure", "Terraform", "Serverless"],
      },
      {
        title: "DevOps",
        items: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Bash"],
      },
    ],
  },

  work: {
    annotation: "... /work ...",
    title: "Work",
    items: [
      {
        periodMain: "2024 -",
        periodSub: "1 year+",
        company: "Alest",
        role: "Solutions Architect",
        stack: "AWS & Azure",
      },
      {
        periodMain: "2022 - 2024",
        periodSub: "2 years",
        company: "Previous Co.",
        role: "Software Engineer",
        stack: "Java & Spring Boot",
      },
      {
        periodMain: "2020 - 2022",
        periodSub: "2 years",
        company: "Earlier Co.",
        role: "Backend Developer",
        stack: "Python & Golang",
      },
      {
        periodMain: "2019 - 2020",
        periodSub: "1 year",
        company: "First Co.",
        role: "Junior Developer",
        stack: "Node & React",
      },
    ],
    total: "5+ years",
  },

  projects: {
    annotation: "... /projects ...",
  },

  contact: {
    annotation: "... /contacts ...",
  },

  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/", icon: "github" },
  ],

  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contacts", href: "#contact" },
  ],
};
