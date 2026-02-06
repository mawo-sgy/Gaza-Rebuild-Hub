
import { Project, ProjectCategory, ProjectStatus } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Al-Shifa Emergency Wing Repair',
    category: ProjectCategory.HOSPITAL,
    location: {
      lat: 31.524,
      lng: 34.453,
      address: 'Gaza City, North Gaza'
    },
    budget: 500000,
    raised: 350000,
    description: 'Structural reinforcement and equipment resupply for the emergency wing. This project aims to restore critical care capabilities to the region\'s largest medical complex.',
    status: ProjectStatus.IN_PROGRESS,
    currentPhase: 2, // Construction
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    expertNeeds: [
        { role: 'Structural Engineer', count: 2 },
        { role: 'Medical Equipment Tech', count: 3 }
    ],
    technicalBrief: {
        requiredCertifications: ["ISO 13485 (Medical Devices)", "Advanced Structural Analysis"],
        estimatedDuration: "6 Months",
        equipmentNeeded: ["Heavy Duty Cranes", "Sterile Ventilation Units", "Seismic Dampers"]
    },
    subProjects: [
        { id: 'sp1', title: 'Western Wall Reinforcement', completion: 85 },
        { id: 'sp2', title: 'HVAC Filtration System', completion: 40 },
        { id: 'sp3', title: 'Emergency Power Grid', completion: 60 },
        { id: 'sp4', title: 'Interior Sterilization', completion: 10 }
    ],
    updates: [
        {
            id: 'u1',
            date: '2023-11-15',
            title: 'Damage Assessment Complete',
            description: 'Initial structural analysis reveals 40% damage to the western wing pillars.',
            author: 'Dr. Ahmed K., Lead Engineer',
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'u2',
            date: '2023-12-01',
            title: 'Debris Clearance Started',
            description: 'Local teams have begun clearing rubble to allow access for heavy machinery.',
            author: 'Site Manager Youssef'
        }
    ]
  },
  {
    id: '2',
    title: 'Khan Younis Primary School',
    category: ProjectCategory.SCHOOL,
    location: {
      lat: 31.346,
      lng: 34.304,
      address: 'Khan Younis, Southern Gaza'
    },
    budget: 120000,
    raised: 45000,
    description: 'Rebuilding 12 classrooms and installing solar power systems. Focusing on creating a safe, resilient learning environment for 400 students.',
    status: ProjectStatus.FUNDING,
    currentPhase: 1, // Foundation
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000',
    expertNeeds: [
        { role: 'Architect', count: 1 },
        { role: 'Solar Technician', count: 2 }
    ],
    technicalBrief: {
        requiredCertifications: ["LEED Green Associate", "Civil Engineering License"],
        estimatedDuration: "4 Months",
        equipmentNeeded: ["Solar Panel Arrays", "Prefabricated Concrete Walls", "Excavators"]
    },
    subProjects: [
        { id: 'sp1', title: 'Foundation Pouring', completion: 30 },
        { id: 'sp2', title: 'Solar Frame Mounting', completion: 0 },
        { id: 'sp3', title: 'Classroom Partitioning', completion: 0 }
    ],
    updates: [
        {
            id: 'u3',
            date: '2023-10-20',
            title: 'Project Initiated',
            description: 'Community leaders identified the site for reconstruction.',
            author: 'Community Board'
        }
    ]
  },
  {
    id: '3',
    title: 'Water Desalination Unit 4',
    category: ProjectCategory.INFRASTRUCTURE,
    location: {
      lat: 31.417,
      lng: 34.352,
      address: 'Deir al-Balah'
    },
    budget: 250000,
    raised: 250000,
    description: 'Restoring critical water infrastructure for 5,000 residents.',
    status: ProjectStatus.COMPLETED,
    currentPhase: 3, // Finalizing/Complete
    imageUrl: 'https://images.unsplash.com/photo-1663931398130-369391b92879?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    expertNeeds: [],
    technicalBrief: {
        requiredCertifications: ["Hydraulic Engineering", "Chemical Safety"],
        estimatedDuration: "Completed",
        equipmentNeeded: ["Reverse Osmosis Membranes", "High-Pressure Pumps"]
    },
    subProjects: [
        { id: 'sp1', title: 'Pump Installation', completion: 100 },
        { id: 'sp2', title: 'Grid Connection', completion: 100 }
    ],
    updates: []
  },
  {
    id: '4',
    title: 'Rafah Shelter Complex',
    category: ProjectCategory.HOUSING,
    location: {
      lat: 31.296,
      lng: 34.243,
      address: 'Rafah'
    },
    budget: 1500000,
    raised: 120000,
    description: 'Permanent housing units for displaced families utilizing rapid-deploy techniques.',
    status: ProjectStatus.PLANNING,
    currentPhase: 0, // Planning
    imageUrl: 'https://images.unsplash.com/photo-1543225852-2bbf041818ce?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    expertNeeds: [
        { role: 'Urban Planner', count: 2 },
        { role: 'Civil Engineer', count: 5 }
    ],
    technicalBrief: {
        requiredCertifications: ["Urban Planning Degree", "Structural Safety Inspector"],
        estimatedDuration: "12 Months",
        equipmentNeeded: ["Bulldozers", "Surveying Drones", "Cement Mixers"]
    },
    subProjects: [],
    updates: []
  }
];

export const getProjects = async (): Promise<Project[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PROJECTS), 500);
  });
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PROJECTS.find(p => p.id === id)), 400);
    });
}
