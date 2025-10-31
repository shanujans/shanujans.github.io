export interface Skill {
  name: string;
  percentage: number;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
}