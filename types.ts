export interface Skill {
  name: string;
  percentage: number;
  icon?: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
