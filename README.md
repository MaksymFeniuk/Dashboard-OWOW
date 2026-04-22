## Dashboard-OWOW (Simplified Overview)

Dashboard-OWOW is a client-facing dashboard built with Next.js that lets clients track project progress, view updates, access documents, and explore demo environments in one place.

It currently runs on mock data, so no backend is required.

## Core Features

### Authentication
- Simple login page (/login)
- No real authentication yet

### Main Dashboard (/dashboard)
- Project overview (status, progress, deadline)
- Timeline with phases (Design, UX, Building, Testing)
- Budget summary
- Recent updates and documents
- Quick communication link (Slack)

### Projects
- View all projects (/dashboard/projects)
- Each project shows:
  - Status, progress, deadline
  - Sprint info and priority
- Individual project pages include:
  - Milestones
  - Budget usage
  - Timeline
  - Links to Analytics, Demo, Docs

### Analytics
- Project performance insights:
  - Progress
  - Budget usage
  - Sprint velocity
  - Delivery outlook

### Demo Environments
- View and open staging/demo builds per project

### Documents
- Central document library
- Search, filter, upload, delete (saved in localStorage)
- No real backend storage

### Progress Timeline
- Visual timeline with:
  - Sprints
  - Milestones
  - Phases
  - Client contact moments

### Updates
- Activity feed with:
  - Categories (Release, Bugfix, Design, etc.)
  - Search and filters
  - Expandable update cards

### Team Page
- Shows team members and responsibilities
- Includes roles, contact info (placeholders)

### Settings
- UI for account settings
- No real data saving yet

### Notifications
- Notification drawer in header
- Shows updates like releases, QA, etc.

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn UI components
- Recharts
- Mongoose (optional)

## Key Notes
- Works fully with mock data
- No real backend or authentication
- MongoDB setup exists but is optional
- Designed to demonstrate a complete client dashboard experience

## Purpose
To provide a professional workspace where clients can:
- Track project progress
- Stay updated
- Access documents and demos
- Understand team responsibilities