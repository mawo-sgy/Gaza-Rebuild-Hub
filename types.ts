
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

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string; // For "Before" / "Current" photos
}

export interface ExpertNeed {
  role: string; // e.g. "Structural Engineer"
  count: number;
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
  imageUrl: string; 
  expertId?: string;
  
  // New Fields for Detail Page
  expertNeeds?: ExpertNeed[];
  updates?: ProjectUpdate[];
}

export interface Expert {
  id: string;
  name: string;
  email: string; // Added
  title: string; // Added (Civil Engineer, etc.)
  yearsExperience: number; // Added
  location: string; // Added (Country/City)
  availability: 'Remote' | 'On-site' | 'Both'; // Added
  bio: string; // Added
  skills: string[]; // Added
  specialization: string; // Kept for backward compatibility (mapped from title)
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
