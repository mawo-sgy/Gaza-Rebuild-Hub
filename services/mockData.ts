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
    imageUrl: 'https://picsum.photos/800/600?random=1',
    expertNeeds: [
        { role: 'Structural Engineer', count: 2 },
        { role: 'Medical Equipment Tech', count: 3 }
    ],
    updates: [
        {
            id: 'u1',
            date: '2023-11-15',
            title: 'Damage Assessment Complete',
            description: 'Initial structural analysis reveals 40% damage to the western wing pillars.',
            imageUrl: 'https://picsum.photos/400/300?random=10'
        },
        {
            id: 'u2',
            date: '2023-12-01',
            title: 'Debris Clearance Started',
            description: 'Local teams have begun clearing rubble to allow access for heavy machinery.'
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
    imageUrl: 'https://picsum.photos/800/600?random=2',
    expertNeeds: [
        { role: 'Architect', count: 1 },
        { role: 'Solar Technician', count: 2 }
    ],
    updates: [
        {
            id: 'u3',
            date: '2023-10-20',
            title: 'Project Initiated',
            description: 'Community leaders identified the site for reconstruction.'
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
    imageUrl: 'https://picsum.photos/800/600?random=3',
    expertNeeds: [],
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
    imageUrl: 'https://picsum.photos/800/600?random=4',
    expertNeeds: [
        { role: 'Urban Planner', count: 2 },
        { role: 'Civil Engineer', count: 5 }
    ],
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