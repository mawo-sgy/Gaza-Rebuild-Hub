
// Data Schema for Firestore (Conceptual)

export enum ProjectCategory {
  HOSPITAL = 'Healthcare',
  SCHOOL = 'Education',
  HOUSING = 'Residential',
  INFRASTRUCTURE = 'Infrastructure'
}

export enum ProjectStatus {
  PLANNING = 'Planning',
  FUNDING = 'Funding',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

export const PROJECT_PHASES = ['Planning', 'Foundation', 'Construction', 'Finalizing'];

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  author: string; // Added for author attribution
  imageUrl?: string; 
}

export interface ExpertNeed {
  role: string; // e.g. "Structural Engineer"
  count: number;
}

export interface TechnicalBrief {
  requiredCertifications: string[];
  estimatedDuration: string;
  equipmentNeeded: string[];
  blueprintUrl?: string;
}

export interface SubProject {
  id: string;
  title: string;
  completion: number; // 0-100 percentage
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  budget: number;
  raised: number;
  description: string;
  status: ProjectStatus;
  currentPhase: number; // 0 to 3 index based on PROJECT_PHASES
  imageUrl: string; 
  expertId?: string;
  
  // New Fields for Detail Page
  expertNeeds?: ExpertNeed[];
  updates?: ProjectUpdate[];
  subProjects?: SubProject[]; // Added for cumulative progress
  technicalBrief?: TechnicalBrief; 
}

export interface Expert {
  id: string;
  name: string;
  email: string; 
  title: string; 
  yearsExperience: number; 
  location: string; 
  availability: 'Remote' | 'On-site' | 'Both'; 
  bio: string; 
  skills: string[]; 
  specialization: string; 
  verified: boolean;
  imageUrl?: string;
}

export interface Donation {
  id: string;
  projectId: string;
  amount: number;
  timestamp: Date;
  donorName?: string; 
}

// Map Types
export interface MapLocation {
  lat: number;
  lng: number;
  title: string;
}
