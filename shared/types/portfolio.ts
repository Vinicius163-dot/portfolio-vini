export type AvailabilityStatus = "available" | "busy" | "unavailable";
export type CertStatus = "active" | "planned";

export interface Cert {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  status: CertStatus;
  credentialUrl?: string;
  badge?: string;
}

export interface WorkItem {
  id: string;
  company: string;
  periodMain: string;
  stack: string;
  order: number;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  email: string;
  cvUrl: string;
  githubUsername: string;
  githubRepo: string;
  availability: AvailabilityStatus;
  statValues: [string, string, string];
}

export interface PortfolioData {
  certs: Cert[];
  work: WorkItem[];
  skills: SkillGroup[];
  social: SocialLink[];
  config: SiteConfig;
}

export type SectionKey = keyof PortfolioData;
