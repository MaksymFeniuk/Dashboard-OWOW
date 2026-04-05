import { getDashboardSnapshot } from "@/lib/data-access"

export async function GET() {
  const payload = await getDashboardSnapshot()
  return Response.json(payload)
}
