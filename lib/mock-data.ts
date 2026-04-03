export type Status = 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
export type SprintStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';
export type ProcessStage = 'Research' | 'Design' | 'Development' | 'Testing' | 'Delivery';

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  isNew?: boolean;
  relatedDocuments?: string[]; // document ids
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: SprintStatus;
  progress: number;
  stages?: ProcessStage[];
}

export interface ContactMoment {
  id: string;
  title: string;
  dateTime: string; // ISO date string
  type: 'meeting' | 'review' | 'presentation' | 'kickoff' | 'other';
  description?: string;
  isNew?: boolean;
  isUpcoming?: boolean;
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
  contactMoments: ContactMoment[];
  documents: ProjectDocument[];
  projectStartDate: string;
  projectEndDate: string;
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
        projectStartDate: '2026-01-15',
        projectEndDate: '2026-06-30',
        sprints: [
          { id: 's1', name: 'Sprint 1: Setup & Foundations', startDate: '2026-02-01', endDate: '2026-02-14', status: 'Done', progress: 100, stages: ['Research'] },
          { id: 's2', name: 'Sprint 2: Product Catalog', startDate: '2026-02-15', endDate: '2026-02-28', status: 'Done', progress: 100, stages: ['Design'] },
          { id: 's3', name: 'Sprint 3: Checkout Flow', startDate: '2026-03-01', endDate: '2026-03-14', status: 'Review', progress: 95, stages: ['Development'] },
          { id: 's4', name: 'Sprint 4: User Accounts', startDate: '2026-03-15', endDate: '2026-03-28', status: 'In Progress', progress: 40, stages: ['Development'] },
          { id: 's5', name: 'Sprint 5: Polishing & Testing', startDate: '2026-03-29', endDate: '2026-04-11', status: 'To Do', progress: 0, stages: ['Development'] },
          { id: 's6', name: 'Sprint 6: Performance & Scale', startDate: '2026-04-12', endDate: '2026-04-25', status: 'To Do', progress: 0, stages: ['Testing'] },
          { id: 's7', name: 'Sprint 7: Final QA & Security', startDate: '2026-04-26', endDate: '2026-05-09', status: 'To Do', progress: 0, stages: ['Testing'] },
          { id: 's8', name: 'Sprint 8: Launch & Monitoring', startDate: '2026-05-10', endDate: '2026-05-23', status: 'To Do', progress: 0, stages: ['Delivery'] },
        ],
        milestones: [
          { id: 'm1', title: 'Milestone 1: Design Approval', dueDate: '2026-01-20', completed: true },
          { id: 'm2', title: 'Milestone 2: Backend Integration', dueDate: '2026-03-01', completed: true },
          { id: 'm3', title: 'Milestone 3: Beta Release', dueDate: '2026-04-15', completed: false, isNew: true, relatedDocuments: ['d1', 'd2'] },
          { id: 'm4', title: 'Milestone 4: Go Live', dueDate: '2026-06-15', completed: false, relatedDocuments: ['d3'] },
        ],
        contactMoments: [
          { id: 'c1', title: 'Project Kickoff Meeting', dateTime: '2026-01-15T10:00:00Z', type: 'kickoff', description: 'Initial project setup and team introduction' },
          { id: 'c2', title: 'Design Review & Feedback', dateTime: '2026-02-05T14:00:00Z', type: 'review', description: 'Client feedback on initial design mockups' },
          { id: 'c3', title: 'Sprint 2 Demo', dateTime: '2026-02-28T15:00:00Z', type: 'presentation', description: 'Product Catalog feature showcase' },
          { id: 'c4', title: 'Mid-Project Sync', dateTime: '2026-03-20T11:00:00Z', type: 'meeting', description: 'Progress check and adjustments discussion' },
          { id: 'c5', title: 'Sprint 4 Demo & Review', dateTime: '2026-03-28T14:00:00Z', type: 'presentation', description: 'User Accounts feature demonstration', isUpcoming: true },
          { id: 'c6', title: 'UAT Kickoff', dateTime: '2026-04-10T10:00:00Z', type: 'kickoff', description: 'User Acceptance Testing session start', isUpcoming: true, isNew: true },
          { id: 'c7', title: 'Go-Live Planning', dateTime: '2026-05-15T13:00:00Z', type: 'meeting', description: 'Launch strategy and support plan', isUpcoming: true },
          { id: 'c8', title: 'Post-Launch Review', dateTime: '2026-06-20T10:00:00Z', type: 'review', description: 'First week retrospective and monitoring', isUpcoming: true },
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
        projectStartDate: '2026-02-01',
        projectEndDate: '2026-05-30',
        sprints: [
          { id: 's21', name: 'Sprint 1: Auth & User DB', startDate: '2026-02-15', endDate: '2026-02-28', status: 'Done', progress: 100, stages: ['Research', 'Development'] },
          { id: 's22', name: 'Sprint 2: Leave Management', startDate: '2026-03-01', endDate: '2026-03-14', status: 'In Progress', progress: 60, stages: ['Development', 'Testing'] },
          { id: 's23', name: 'Sprint 3: Expense Reporting', startDate: '2026-03-15', endDate: '2026-03-28', status: 'To Do', progress: 0, stages: ['Development', 'Testing', 'Delivery'] },
        ],
        milestones: [
          { id: 'm21', title: 'Milestone 1: Kickoff', dueDate: '2026-02-10', completed: true },
          { id: 'm22', title: 'Milestone 2: MVP Delivery', dueDate: '2026-04-01', completed: false },
        ],
        contactMoments: [
          { id: 'c21', title: 'Project Start Meeting', dateTime: '2026-02-01T09:00:00Z', type: 'kickoff', description: 'Portal project initiation' },
          { id: 'c22', title: 'Design Workshop', dateTime: '2026-02-10T14:00:00Z', type: 'meeting', description: 'UI/UX planning session' },
          { id: 'c23', title: 'Sprint 1 Demo', dateTime: '2026-02-28T15:00:00Z', type: 'presentation', description: 'Authentication features showcase' },
          { id: 'c24', title: 'Stakeholder Review', dateTime: '2026-03-20T11:00:00Z', type: 'review', description: 'Progress review with stakeholders', isUpcoming: true, isNew: true },
        ],
        documents: [
          { id: 'd21', title: 'Portal PRD', type: 'PRD', lastUpdated: '2026-02-05', url: '#' },
        ]
      },
      {
        id: 'p3',
        name: 'Marketing Site V2',
        description: 'Public website redesign and CMS migration focused on faster publishing, stronger performance, and a cleaner visual system.',
        status: 'At Risk',
        currentSprint: 'Sprint 2',
        deadline: '2026-05-20',
        overallProgress: 25,
        budgetUsed: 34,
        demoUrl: 'https://marketing-v2-preview.acmecorp.dev',
        projectStartDate: '2026-02-01',
        projectEndDate: '2026-05-30',
        sprints: [
          { id: 's31', name: 'Sprint 1: Content Model & Planning', startDate: '2026-02-08', endDate: '2026-02-21', status: 'Done', progress: 100, stages: ['Research', 'Design'] },
          { id: 's32', name: 'Sprint 2: CMS Migration', startDate: '2026-02-22', endDate: '2026-03-07', status: 'In Progress', progress: 45, stages: ['Development'] },
          { id: 's33', name: 'Sprint 3: Landing Pages', startDate: '2026-03-08', endDate: '2026-03-21', status: 'To Do', progress: 0, stages: ['Design', 'Development'] },
          { id: 's34', name: 'Sprint 4: QA & Launch Prep', startDate: '2026-03-22', endDate: '2026-04-04', status: 'To Do', progress: 0, stages: ['Testing', 'Delivery'] },
        ],
        milestones: [
          { id: 'm31', title: 'Milestone 1: Content Audit Approved', dueDate: '2026-02-15', completed: true },
          { id: 'm32', title: 'Milestone 2: CMS Migration Ready', dueDate: '2026-03-18', completed: false },
          { id: 'm33', title: 'Milestone 3: Stakeholder Review', dueDate: '2026-04-10', completed: false, isNew: true },
          { id: 'm34', title: 'Milestone 4: Launch', dueDate: '2026-05-20', completed: false },
        ],
        contactMoments: [
          { id: 'c31', title: 'Project Kickoff', dateTime: '2026-02-01T10:00:00Z', type: 'kickoff', description: 'Marketing site project start' },
          { id: 'c32', title: 'Content Strategy Workshop', dateTime: '2026-02-08T13:00:00Z', type: 'meeting', description: 'Content team planning' },
          { id: 'c33', title: 'Design Review', dateTime: '2026-02-20T14:00:00Z', type: 'review', description: 'Design mockups feedback session' },
          { id: 'c34', title: 'CMS Training', dateTime: '2026-03-05T11:00:00Z', type: 'meeting', description: 'Content team CMS training', isUpcoming: true },
          { id: 'c35', title: 'Mid-Project Review', dateTime: '2026-03-20T10:00:00Z', type: 'review', description: 'At-risk project check-in', isUpcoming: true, isNew: true },
        ],
        documents: [
          { id: 'd31', title: 'CMS Migration Brief', type: 'Migration', lastUpdated: '2026-02-18', url: '#' },
          { id: 'd32', title: 'Landing Page Plan', type: 'Planning', lastUpdated: '2026-03-02', url: '#' },
          { id: 'd33', title: 'Content Governance Notes', type: 'Other', lastUpdated: '2026-03-09', url: '#' },
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
