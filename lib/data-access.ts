import "server-only"

import mongoose from "mongoose"

import {
  overviewDocuments,
  progressHighlights,
  recentUpdates,
  timelinePhases,
  timelineStats,
  totalBudget,
} from "@/lib/dashboard-data"
import { mockClients, type Client, type Project } from "@/lib/mock-data"
import { connectToDatabase } from "@/lib/mongodb"

type DashboardStat = {
  label: string
  value: string
  accent: string
  tooltip: string
}

type DashboardPhase = {
  label: string
  date: string
  status: string
  progress: number
  accent: string
  text: string
  note: string
}

type DashboardUpdate = {
  title: string
  date: string
  color: string
  badge: string
  badgeColor: string
}

type DashboardDocument = {
  key: string
  totalBudget: number
  timelineStats: DashboardStat[]
  timelinePhases: DashboardPhase[]
  recentUpdates: DashboardUpdate[]
  overviewDocuments: typeof overviewDocuments
  progressHighlights: typeof progressHighlights
}

type ClientDocument = Client

function normalizeProject(project: Partial<Project>): Project {
  return {
    id: project.id ?? "",
    name: project.name ?? "Untitled Project",
    description: project.description ?? "",
    status: (project.status ?? "On Track") as Project["status"],
    currentSprint: project.currentSprint ?? "Sprint 1",
    deadline: project.deadline ?? new Date().toISOString().slice(0, 10),
    overallProgress: typeof project.overallProgress === "number" ? project.overallProgress : 0,
    budgetUsed: typeof project.budgetUsed === "number" ? project.budgetUsed : 0,
    demoUrl: project.demoUrl ?? "#",
    sprints: Array.isArray(project.sprints) ? project.sprints : [],
    milestones: Array.isArray(project.milestones) ? project.milestones : [],
    contactMoments: Array.isArray(project.contactMoments) ? project.contactMoments : [],
    documents: Array.isArray(project.documents) ? project.documents : [],
    projectStartDate: project.projectStartDate ?? new Date().toISOString().slice(0, 10),
    projectEndDate: project.projectEndDate ?? new Date().toISOString().slice(0, 10),
  }
}

function normalizeClient(client: Partial<Client>): Client {
  return {
    id: client.id ?? "",
    name: client.name ?? "Client",
    projects: Array.isArray(client.projects)
      ? client.projects.map((project) => normalizeProject(project))
      : [],
  }
}

const ProjectSchema = new mongoose.Schema<Project>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    currentSprint: { type: String, required: true },
    deadline: { type: String, required: true },
    overallProgress: { type: Number, required: true },
    budgetUsed: { type: Number, required: true },
    demoUrl: { type: String, required: true },
    sprints: { type: [mongoose.Schema.Types.Mixed], default: [] },
    milestones: { type: [mongoose.Schema.Types.Mixed], default: [] },
    contactMoments: { type: [mongoose.Schema.Types.Mixed], default: [] },
    documents: { type: [mongoose.Schema.Types.Mixed], default: [] },
    projectStartDate: { type: String, required: true },
    projectEndDate: { type: String, required: true },
  },
  { _id: false }
)

const ClientSchema = new mongoose.Schema<ClientDocument>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    projects: { type: [ProjectSchema], default: [] },
  },
  { collection: "clients" }
)

const DashboardOverviewSchema = new mongoose.Schema<DashboardDocument>(
  {
    key: { type: String, required: true, unique: true },
    totalBudget: { type: Number, required: true },
    timelineStats: { type: [mongoose.Schema.Types.Mixed], default: [] },
    timelinePhases: { type: [mongoose.Schema.Types.Mixed], default: [] },
    recentUpdates: { type: [mongoose.Schema.Types.Mixed], default: [] },
    overviewDocuments: { type: [mongoose.Schema.Types.Mixed], default: [] },
    progressHighlights: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { collection: "dashboard_overviews" }
)

const ClientModel = mongoose.models.Client || mongoose.model<ClientDocument>("Client", ClientSchema)
const DashboardOverviewModel =
  mongoose.models.DashboardOverview ||
  mongoose.model<DashboardDocument>("DashboardOverview", DashboardOverviewSchema)

let seeded = false

async function seedDatabase() {
  if (seeded) {
    return
  }

  const [clientCount, dashboardCount] = await Promise.all([
    ClientModel.countDocuments(),
    DashboardOverviewModel.countDocuments(),
  ])

  if (clientCount === 0) {
    await ClientModel.insertMany(mockClients)
  }

  if (dashboardCount === 0) {
    await DashboardOverviewModel.create({
      key: "overview",
      totalBudget,
      timelineStats,
      timelinePhases,
      recentUpdates,
      overviewDocuments,
      progressHighlights,
    })
  }

  seeded = true
}

async function getClientsFromDatabase(): Promise<ClientDocument[] | null> {
  const connection = await connectToDatabase()

  if (!connection) {
    return null
  }

  await seedDatabase()
  return ClientModel.find().lean<ClientDocument[]>()
}

async function getDashboardFromDatabase(): Promise<DashboardDocument | null> {
  const connection = await connectToDatabase()

  if (!connection) {
    return null
  }

  await seedDatabase()
  return DashboardOverviewModel.findOne({ key: "overview" }).lean<DashboardDocument>()
}

export async function getClients() {
  const clients = await getClientsFromDatabase()
  const source = clients ?? mockClients
  return source.map((client) => normalizeClient(client))
}

export async function getProjects() {
  const clients = await getClients()
  return clients.flatMap((client) => client.projects)
}

export async function getProjectById(projectId: string) {
  const projects = await getProjects()
  return projects.find((project) => project.id === projectId)
}

export async function getDashboardData() {
  const dashboard = await getDashboardFromDatabase()

  if (dashboard) {
    return {
      key: dashboard.key ?? "overview",
      totalBudget: dashboard.totalBudget ?? totalBudget,
      timelineStats: Array.isArray(dashboard.timelineStats)
        ? dashboard.timelineStats
        : timelineStats,
      timelinePhases: Array.isArray(dashboard.timelinePhases)
        ? dashboard.timelinePhases
        : timelinePhases,
      recentUpdates: Array.isArray(dashboard.recentUpdates)
        ? dashboard.recentUpdates
        : recentUpdates,
      overviewDocuments: Array.isArray(dashboard.overviewDocuments)
        ? dashboard.overviewDocuments
        : overviewDocuments,
      progressHighlights: Array.isArray(dashboard.progressHighlights)
        ? dashboard.progressHighlights
        : progressHighlights,
    }
  }

  return {
    key: "overview",
    totalBudget,
    timelineStats,
    timelinePhases,
    recentUpdates,
    overviewDocuments,
    progressHighlights,
  }
}

export async function getDashboardSnapshot() {
  const [clients, dashboard] = await Promise.all([getClients(), getDashboardData()])
  return { clients, dashboard }
}
