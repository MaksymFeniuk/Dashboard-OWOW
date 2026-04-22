# Dashboard-OWOW

Dashboard-OWOW is a client-facing project dashboard built with Next.js. It is designed as a professional portal where a client can follow project progress, review updates, access documents, open demo environments, and understand who is responsible for each part of the work.

The project currently uses mock data, so it can run locally without a backend or database. This makes it easy to demonstrate the full dashboard experience without needing live client data.

## Project Goal

The goal of this dashboard is to give clients one clear place to understand the status of their project. Instead of spreading information across emails, documents, meetings, and demo links, the dashboard brings the most important project information together in one interface.

Clients can use it to:

- Track project status and progress
- See upcoming milestones and deadlines
- Read project updates
- Access important documents
- Open staging/demo environments
- View team members and responsibilities
- Manage basic dashboard settings

## Page Flow Map

The dashboard is built around a simple client journey. The user starts at the login page, enters the dashboard overview, and can then move to project details, documents, updates, demos, team information, or settings.

```text
/ 
|
| redirects to
v
/login
|
| after submitting the login form
v
/dashboard
|
+-- /dashboard/projects
|   |
|   +-- /dashboard/projects/[id]
|       |
|       +-- /dashboard/projects/[id]/analytics
|       +-- /dashboard/projects/[id]/demo
|       +-- /dashboard/projects/[id]/docs
|
+-- /dashboard/progress
+-- /dashboard/updates
+-- /dashboard/documents
+-- /dashboard/demos
+-- /dashboard/team
+-- /dashboard/settings
```

### How The Pages Connect

- The root page `/` automatically redirects to `/login`.
- The login form sends the user to `/dashboard`.
- The dashboard overview acts as the central hub.
- The sidebar connects the main dashboard pages: Overview, Projects, Updates, Progress, Documents, and Team.
- The settings page is available from the dashboard sidebar/footer area.
- The notification drawer links users to the full updates page.
- The project cards link to project detail, analytics, and demo pages.
- Each project detail page connects to its own analytics and demo views.
- The global documents page shows all dashboard documents, while project document pages show documents for one project.
- The global demos page shows all demo environments, while project demo pages focus on one project.

## Project Timeline

The main dashboard also includes a project timeline that shows how the project moves through its delivery phases:

```text
Design        -> UX            -> Building          -> Testing
Complete      -> Complete      -> In progress       -> Upcoming
Oct-Dec 2025  -> Jan-Feb 2026  -> Mar-May 2026      -> Jun 2026
```

This timeline helps the client quickly understand what has already been completed, what is currently being built, and what still needs to happen before delivery.

## Main Features

### Login

Route: `/login`

The dashboard starts with a login screen. It includes a username field, password field, password visibility toggle, and a "keep me signed in" option.

At the moment, this is a visual login flow only. There is no real authentication connected yet.

### Dashboard Overview

Route: `/dashboard`

The overview page gives the client a quick summary of the project. It includes project status, progress, current phase, deadline, budget summary, recent updates, recent documents, and a quick communication link.

The timeline shows the project phases:

- Design
- UX
- Building
- Testing

### Projects

Route: `/dashboard/projects`

The projects page lists all active client projects. Each project card shows the project name, status, progress, current sprint, deadline, priority, and quick actions.

The page also supports filtering and sorting, so projects can be viewed by status, deadline, progress, or priority.

### Project Detail Pages

Route: `/dashboard/projects/[id]`

Each project has a detail page with a more complete breakdown. This includes the project description, progress, budget usage, milestones, sprint timeline, and links to analytics and demo pages.

### Analytics

Route: `/dashboard/projects/[id]/analytics`

The analytics page gives more insight into project health. It shows progress, budget usage, completed milestones, average sprint velocity, sprint performance, and delivery outlook.

This page is meant to help the client quickly understand whether a project is healthy, delayed, or needs attention.

### Demo Environments

Routes:

- `/dashboard/demos`
- `/dashboard/projects/[id]/demo`

The demo pages provide access to staging/demo builds. The global demo page lists all available project demos, while the project demo page focuses on one specific project.

### Documents

Routes:

- `/dashboard/documents`
- `/dashboard/projects/[id]/docs`

The documents page works as a central document library. It includes search, filtering, sorting, previews, upload, delete, and share actions.

Uploaded and deleted documents are stored in browser `localStorage`, so the behavior works locally but is not connected to a real backend yet.

### Progress Timeline

Route: `/dashboard/progress`

The progress page visualizes the project timeline. It shows sprints, milestones, phases, and client contact moments such as meetings, reviews, presentations, and kickoffs.

This helps the client see where the project is now and what is coming next.

### Updates

Route: `/dashboard/updates`

The updates page shows a timeline of project activity. Updates can be searched, filtered by category, and expanded for more detail.

Update categories include:

- Release
- Testing
- Design
- Milestone
- Bugfix
- Infrastructure

### Team

Route: `/dashboard/team`

The team page explains who worked on the dashboard and what each person is responsible for. It includes team member names, roles, responsibilities, and placeholder contact information.

### Settings

Route: `/dashboard/settings`

The settings page contains UI for notification preferences and account security. It includes email settings, dashboard update settings, email address fields, and password fields.

These settings are currently visual only and do not save to a backend.

### Notifications

The dashboard header includes a notification drawer. It shows recent alerts such as release updates, QA feedback, security notices, and design updates.

Users can also mark notifications as read and open the full updates page.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style UI components
- Base UI
- lucide-react icons
- next-themes
- Recharts
- Mongoose

## Data

Most dashboard content comes from local mock data files:

- `lib/mock-data.ts`
- `lib/dashboard-data.ts`

These files include client data, project data, sprints, milestones, documents, updates, contact moments, demo URLs, and dashboard overview statistics.

MongoDB support is present through helper scripts, but the visible dashboard pages do not require MongoDB yet.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

The homepage redirects automatically to:

```text
http://localhost:3000/login
```

## Available Scripts

```bash
npm run dev
```

Starts the development server with Webpack.

```bash
npm run dev:turbopack
```

Starts the development server with Turbopack.

```bash
npm run build
```

Builds the project for production.

```bash
npm run start
```

Starts the production build.

```bash
npm run lint
```

Runs ESLint.

## Current Limitations

- Login is not connected to real authentication.
- Most data is mock data.
- Settings do not save permanently.
- Document uploads and deletes only use browser `localStorage`.
- Demo links and contact details are placeholders.
- MongoDB is optional and not required for the current dashboard pages.

## Summary

Dashboard-OWOW demonstrates a complete client dashboard experience. It combines project tracking, updates, documents, demos, team information, notifications, and settings into one clear workspace for clients.
