# Standard Operating Procedure (SOP)
**Application:** OWOW Client Project Dashboard (POC)
**Role:** Full-Stack Engineer / Project Manager

---

## 1. Purpose and Scope
This Standard Operating Procedure (SOP) outlines the guidelines for maintaining, updating, and deploying the OWOW Client Project Dashboard. The dashboard currently serves as a Proof of Concept (POC) designed to communicate project phases, sprints, deadlines, and documentation clearly to OWOW clients without manual Project Manager updates.

---

## 2. Local Environment Setup
To run the dashboard locally for development or testing:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MaksymFeniuk/Dashboard-OWOW.git
   cd Dashboard-OWOW
   ```
2. **Install Dependencies:**
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```
3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
4. **Access the App:** 
   Open `http://localhost:3000`. You will be automatically redirected to the `/login` page.

---

## 3. Managing Client Data (Mock Data Updates)
Currently, the application relies on a robust mock data layer. Before transitioning to a live database (CMS/PostgreSQL), all client project updates must be managed via the `mock-data.ts` file.

**File Location:** `lib/mock-data.ts`

### 3.1 Adding a New Client
To add a new client, append a new object to the `mockClients` array:
```typescript
{
  id: 'c2',
  name: 'New Client Name',
  projects: [ /* Project Objects */ ]
}
```

### 3.2 Updating Sprint Progress
To update a project's sprint so that it reflects on the client dashboard:
1. Locate the specific project within `mockClients`.
2. Find the relevant `sprint` inside the `sprints` array.
3. Update the `progress` (0-100) and `status` ('To Do', 'In Progress', 'Review', 'Done').
4. *Important:* Update the `currentSprint` string on the parent `Project` object to match the active sprint.

### 3.3 Adding Documentation
To add a new PRD or Migration file:
1. Locate the project.
2. Add a new object to the `documents` array.
3. Provide an appropriate `type` ('PRD', 'Planning', 'Migration', 'Other') and a valid `url` (e.g., a Confluence or Google Drive link).

---

## 4. UI Library & Theming
The dashboard uses **Tailwind CSS** and **shadcn/ui** for its enterprise-grade aesthetics.

- **Adding new UI components:** Use the shadcn CLI to pull components into your local project. 
  *Example:* `npx shadcn@latest add dialog`
- **Modifying Colors:** Global theme variables (Primary, Secondary, Muted, Background) are located inside `app/globals.css`. By default, it uses high-contrast SaaS styling.
- **Icons:** The project exclusively uses `lucide-react`. Ensure any new icons added are imported from this library to maintain a consistent visual language.

---

## 5. Deployment Procedure
The recommended deployment platform for this Next.js App Router application is **Vercel** or **Cloudflare Pages**.

1. Commit all your changes to the `main` branch.
   ```bash
   git add .
   git commit -m "Update client data"
   git push origin main
   ```
2. Navigate to your Vercel Dashboard and ensure it is linked to `MaksymFeniuk/Dashboard-OWOW`.
3. Vercel will automatically trigger a deployment pipeline on every push to the `main` branch.
4. Verify the deployment link against the layout rules (Desktop vs Mobile responsiveness).

---

## 6. Future Expansion Roadmap (Transition from POC)
When moving out of POC state, the following architecture upgrades must be performed:
- [ ] **Authentication:** Replace the dummy `/login` with `NextAuth.js` linked to a database of valid client emails.
- [ ] **Database Integration:** Swap `lib/mock-data.ts` imports with asynchronous Prisma or Mongoose calls.
- [ ] **Jira API:** Build a webhook handler to automatically transition sprint states (`In Progress` -> `Done`) directly within the database instead of manual data entry.
