import type { MetadataRoute } from "next"

const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl,
  }
}
