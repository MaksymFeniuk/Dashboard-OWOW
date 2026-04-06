import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import { createSessionToken, setSessionCookie } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const username = String(body?.username ?? "").trim()
    const password = String(body?.password ?? "")
    const rememberMe = Boolean(body?.rememberMe)

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const user = await db.collection("users").findOne({ username })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const hash = String(user.passwordHash)
    const isBcryptHash = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash)
    if (!isBcryptHash) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, hash)
    if (!ok) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24
    const token = await createSessionToken(
      { userId: String(user._id), username: user.username },
      maxAge
    )

    const response = NextResponse.json({
      ok: true,
      user: { id: String(user._id), username: user.username, name: user.name ?? null },
    })
    setSessionCookie(response, token, maxAge)
    return response
  } catch (error) {
    console.error("POST /api/auth/login error:", error)
    return NextResponse.json(
      { error: "Internal Server Error", detail: process.env.NODE_ENV === "development" ? String(error) : undefined },
      { status: 500 }
    )
  }
}