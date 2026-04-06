import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"

const COOKIE_NAME = "session"
const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 // 1 day

type SessionPayload = {
  userId: string
  username: string
}

function getSecretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error("Missing AUTH_SECRET in .env.local")
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(
  payload: SessionPayload,
  maxAgeSeconds = DEFAULT_MAX_AGE_SECONDS
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return {
      userId: String(payload.userId),
      username: String(payload.username),
    }
  } catch {
    return null
  }
}

function readCookie(request: Request, key: string): string | null {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(";").map((c) => c.trim())
  const match = cookies.find((c) => c.startsWith(`${key}=`))
  if (!match) return null
  return decodeURIComponent(match.slice(key.length + 1))
}

export async function getSession(request: Request) {
  const token = readCookie(request, COOKIE_NAME)
  if (!token) return null
  return verifySessionToken(token)
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  maxAgeSeconds = DEFAULT_MAX_AGE_SECONDS
) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  })
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  })
}