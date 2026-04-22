<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Guide For Dashboard-OWOW

Dashboard-OWOW is a client-facing OWOW project dashboard built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The app is a demo/client portal where users can log in, track project progress, view updates, manage documents, open demo environments, and understand team responsibilities.

## Current Project State

- The app currently uses mock data, not a live backend.
- The main example client is Acme Corp.
- Login is a visual flow only; there is no real authentication.
- Settings are visual only and do not persist to a backend.
- Document upload/delete actions use browser `localStorage`.
- MongoDB helper scripts exist, but the dashboard pages do not depend on MongoDB yet.

## Main Routes

- `/` redirects to `/login`.
- `/login` contains the client login screen.
- `/dashboard` contains the overview page with timeline, budget, updates, and documents.
- `/dashboard/projects` lists active projects with filters, sorting, status, progress, deadlines, and quick actions.
- `/dashboard/projects/[id]` shows project details, milestones, progress, budget usage, and sprints.
- `/dashboard/projects/[id]/analytics` shows project health, sprint performance, milestone completion, and delivery outlook.
- `/dashboard/projects/[id]/demo` links to that project's staging/demo environment.
- `/dashboard/projects/[id]/docs` shows documents for that project.
- `/dashboard/progress` shows the visual sprint timeline, milestones, phases, and contact moments.
- `/dashboard/updates` shows a searchable and filterable activity timeline.
- `/dashboard/documents` shows the document library with preview, upload, delete, search, filters, and sorting.
- `/dashboard/demos` lists all demo environments.
- `/dashboard/team` explains team members, roles, responsibilities, and placeholder contact info.
- `/dashboard/settings` contains notification and security settings UI.

## Important Files

- `app/page.tsx`: redirects users to `/login`.
- `app/login/page.tsx`: login page shell.
- `components/auth/login-form.tsx`: login form behavior.
- `app/dashboard/layout.tsx`: dashboard sidebar, header, user card, and main layout.
- `components/layout/dashboard-nav.ts`: main dashboard navigation items.
- `components/layout/notification-drawer.tsx`: header notification drawer.
- `lib/mock-data.ts`: client, project, sprint, milestone, contact moment, document, and demo URL data.
- `lib/dashboard-data.ts`: overview page timeline, budget, recent updates, and documents.
- `app/globals.css`: global theme, animations, and styling.
- `README.md`: human-readable project summary and setup notes.

## Development Commands

Use npm because this repo includes `package-lock.json`.

```bash
npm install
npm run dev
npm run build
npm run lint
```

`npm run dev` starts Next.js with Webpack. `npm run dev:turbopack` is also available.

## Agent Guidelines

- Read the relevant Next.js 16 documentation in `node_modules/next/dist/docs/` before changing Next.js-specific code.
- Prefer existing project patterns and components before adding new abstractions.
- Keep dashboard behavior consistent with the current mock-data-first setup unless explicitly asked to add a backend.
- Do not remove the login redirect from `/` unless the requested change needs it.
- Treat placeholder links, contact info, demo URLs, and mock data as intentional demo content unless asked to replace them.
- Keep UI changes responsive for both the desktop sidebar layout and mobile navigation layout.
- Avoid unrelated refactors; make small, focused changes.
- If adding new dashboard content, update `README.md` and this file when the project behavior or routes change.
