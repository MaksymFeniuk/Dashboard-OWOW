export type Status = 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
export type SprintStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: SprintStatus;
  progress: number;
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'PRD' | 'Planning' | 'Migration' | 'Other';
  lastUpdated: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  currentSprint: string;
  deadline: string;
  overallProgress: number; // 0 - 100
  budgetUsed: number; // percentage 0 - 100
  demoUrl: string;
  sprints: Sprint[];
  milestones: Milestone[];
  documents: ProjectDocument[];
}

export interface Client {
  id: string;
  name: string;
  projects: Project[];
}

// Mock Data
export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    projects: [
      {
        id: 'p1',
        name: 'E-commerce Platform Redesign',
        description: 'Overhauling the main e-commerce platform with a new modern Next.js stack, integrated with Shopify and a custom robust CMS.',
        status: 'On Track',
        currentSprint: 'Sprint 4',
        deadline: '2026-06-15',
        overallProgress: 65,
        budgetUsed: 50,
        demoUrl: 'https://staging.acmecorp.dev',
        sprints: [
          { id: 's1', name: 'Sprint 1: Setup & Foundations', startDate: '2026-02-01', endDate: '2026-02-14', status: 'Done', progress: 100 },
          { id: 's2', name: 'Sprint 2: Product Catalog', startDate: '2026-02-15', endDate: '2026-02-28', status: 'Done', progress: 100 },
          { id: 's3', name: 'Sprint 3: Checkout Flow', startDate: '2026-03-01', endDate: '2026-03-14', status: 'Review', progress: 95 },
          { id: 's4', name: 'Sprint 4: User Accounts', startDate: '2026-03-15', endDate: '2026-03-28', status: 'In Progress', progress: 40 },
          { id: 's5', name: 'Sprint 5: Polishing & Testing', startDate: '2026-03-29', endDate: '2026-04-11', status: 'To Do', progress: 0 },
        ],
        milestones: [
          { id: 'm1', title: 'Design Approval', dueDate: '2026-01-20', completed: true },
          { id: 'm2', title: 'Backend Integration', dueDate: '2026-03-01', completed: true },
          { id: 'm3', title: 'Beta Release', dueDate: '2026-04-15', completed: false },
          { id: 'm4', title: 'Go Live', dueDate: '2026-06-15', completed: false },
        ],
        documents: [
          { id: 'd1', title: 'Product Requirements Document v2', type: 'PRD', lastUpdated: '2026-01-15', url: '#' },
          { id: 'd2', title: 'Migration Strategy', type: 'Migration', lastUpdated: '2026-02-10', url: '#' },
          { id: 'd3', title: 'Q2 Sprint Planning', type: 'Planning', lastUpdated: '2026-03-01', url: '#' },
        ]
      },
      {
        id: 'p2',
        name: 'Acme Employee Portal App',
        description: 'Internal tool for managing employee leaves, expenses, and company announcements.',
        status: 'Delayed',
        currentSprint: 'Sprint 2',
        deadline: '2026-05-01',
        overallProgress: 30,
        budgetUsed: 40,
        demoUrl: 'https://internal-portal-beta.acmecorp.dev',
        sprints: [
          { id: 's21', name: 'Sprint 1: Auth & User DB', startDate: '2026-02-15', endDate: '2026-02-28', status: 'Done', progress: 100 },
          { id: 's22', name: 'Sprint 2: Leave Management', startDate: '2026-03-01', endDate: '2026-03-14', status: 'In Progress', progress: 60 },
          { id: 's23', name: 'Sprint 3: Expense Reporting', startDate: '2026-03-15', endDate: '2026-03-28', status: 'To Do', progress: 0 },
        ],
        milestones: [
          { id: 'm21', title: 'Kickoff', dueDate: '2026-02-10', completed: true },
          { id: 'm22', title: 'MVP Delivery', dueDate: '2026-04-01', completed: false },
        ],
        documents: [
          { id: 'd21', title: 'Portal PRD', type: 'PRD', lastUpdated: '2026-02-05', url: '#' },
        ]
      },
      {
        id: 'p3',
        name: 'CMS Migration Project',
        description: 'Migrating legacy content management system to a modern headless CMS architecture.',
        status: 'At Risk',
        currentSprint: 'Sprint 3',
        deadline: '2026-07-01',
        overallProgress: 45,
        budgetUsed: 60,
        demoUrl: 'https://cms-staging.acmecorp.dev',
        sprints: [
          { id: 's31', name: 'Sprint 1: Content Audit', startDate: '2026-02-01', endDate: '2026-02-21', status: 'Done', progress: 100 },
          { id: 's32', name: 'Sprint 2: API Integration', startDate: '2026-02-22', endDate: '2026-03-14', status: 'Done', progress: 100 },
          { id: 's33', name: 'Sprint 3: Data Migration', startDate: '2026-03-15', endDate: '2026-04-04', status: 'In Progress', progress: 55 },
          { id: 's34', name: 'Sprint 4: Testing & Validation', startDate: '2026-04-05', endDate: '2026-04-25', status: 'To Do', progress: 0 },
        ],
        milestones: [
          { id: 'm31', title: 'Content Audit Complete', dueDate: '2026-02-20', completed: true },
          { id: 'm32', title: 'API Integration Done', dueDate: '2026-03-10', completed: true },
          { id: 'm33', title: 'Data Migration Milestone', dueDate: '2026-04-01', completed: false },
          { id: 'm34', title: 'Go Live', dueDate: '2026-07-01', completed: false },
        ],
        documents: [
          { id: 'd31', title: 'Content Audit Report', type: 'PRD', lastUpdated: '2026-02-20', url: '#' },
          { id: 'd32', title: 'CMS Migration Strategy', type: 'Migration', lastUpdated: '2026-03-01', url: '#' },
          { id: 'd33', title: 'API Documentation', type: 'Planning', lastUpdated: '2026-03-15', url: '#' },
        ]
      }
    ]
  }
];

export const getProjectById = (projectId: string): Project | undefined => {
  for (const client of mockClients) {
    const project = client.projects.find(p => p.id === projectId);
    if (project) return project;
  }
  return undefined;
};
