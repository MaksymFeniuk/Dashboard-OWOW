# OWOW Anti Gravity Dashboard

## Overview
This is a modern, enterprise-grade client dashboard tailored for digital agency OWOW. It communicates project phases, sprints, deadlines, and documentation clearly to clients.

## MongoDB Setup
The dashboard now reads from MongoDB when `MONGODB_URI` is defined. If the variable is missing, the app falls back to the existing mock data so local development still works.

On first connection, the app seeds two collections automatically:
- `clients` for project data
- `dashboard_overviews` for the overview cards on the dashboard home page

Use a local `.env.local` file with a value like:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/owow-dashboard
```

---

## Team Task Distribution

The following section reflects the real task distribution within the team. Responsibilities were divided based on each member's strengths and the needs of the project, which helped the team work efficiently and avoid unnecessary overlap.

### Karim - Frontend and Backend Lead / Project Structure
Karim is responsible for the overall structure and integration of the dashboard. He ensures that all components and pages are connected properly and that the application stays consistent.

**Responsibilities:**
- Setting up the Next.js project and folder structure
- Creating the main layout, including the sidebar and topbar
- Developing the dashboard overview page
- Integrating components and pages from other team members
- Maintaining consistency across the application

### Mirthe - UI/UX Designer
Mirthe is responsible for the visual design and user experience of the dashboard. She defines the design system and makes sure the interface is clean, modern, and user-friendly.

**Responsibilities:**
- Designing the dashboard in Figma
- Defining color schemes, typography, and spacing
- Designing key screens such as the login page, dashboard, and project pages
- Creating a consistent design system
- Providing design guidelines for the team

### Maksym - Component Developer
Maksym focuses on building reusable UI components that are used across the dashboard. His work supports both consistency and development efficiency.

**Responsibilities:**
- Developing reusable components such as cards, buttons, badges, and progress bars
- Styling components using Tailwind CSS
- Ensuring consistency with the design system
- Supporting other team members with UI components

### Maurice - Project Detail and Data Handling
Maurice is responsible for the logic and structure of the project detail pages. He ensures that project-related data is presented clearly and effectively.

**Responsibilities:**
- Developing the project detail page
- Displaying project information such as progress, milestones, deadlines, and budget
- Structuring and managing mock data
- Connecting data to the user interface components

### Merlijn - Documents and Demo Pages
Merlijn focuses on content-related pages, making sure that project resources and demo environments are accessible and well-organized.

**Responsibilities:**
- Developing the documents page
- Creating the demo environments page
- Displaying files and links for each project
- Organizing content in a clear and structured way

### Omar - Authentication and Settings
Omar is responsible for user-related features, including login functionality and user settings.

**Responsibilities:**
- Designing and developing the login page
- Implementing a basic authentication flow with login and redirect
- Creating the settings page
- Adding user profile elements
- Implementing optional features such as theme switching

---

## Collaboration Approach
The team follows a structured workflow to ensure smooth collaboration:
- The design is created first to guide development.
- The project structure is set up before feature development.
- Reusable components are developed early and shared across the team.
- Each member works on separate features to avoid conflicts.
- Regular integration ensures all parts function together.

This approach helps maintain clarity, efficiency, and a high-quality final product.

## Summary
By dividing tasks based on roles and responsibilities, the team ensures clear ownership of features, minimal overlap in development, efficient collaboration, and a consistent and professional dashboard.
