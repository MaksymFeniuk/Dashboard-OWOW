import type { MetadataRoute } from "next"

const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const routes = [
  "",
  "/login",
  "/dashboard",
  "/dashboard/documents",
  "/dashboard/demos",
  "/dashboard/progress",
  "/dashboard/projects",
  "/dashboard/settings",
  "/dashboard/team",
  "/dashboard/updates",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date("2026-04-05T00:00:00.000Z"),
    changeFrequency: route.startsWith("/dashboard") ? "weekly" : "monthly",
    priority: route === "" || route === "/dashboard" ? 1 : 0.7,
  }))
}
