"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState, useSyncExternalStore, useTransition } from "react"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function subscribe() {
  return () => {}
}

export function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isMounted = useSyncExternalStore(subscribe, () => true, () => false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const isDisabled = isPending || username.trim().length === 0 || password.length === 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(() => {
      router.push("/dashboard")
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">
          Sign in
        </h2>
      </div>

      {!isMounted ? (
        <div className="space-y-5" aria-hidden="true">
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-white/8" />
            <div className="h-14 rounded-2xl border border-white/10 bg-white/[0.04]" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-white/8" />
            <div className="h-14 rounded-2xl border border-white/10 bg-white/[0.04]" />
          </div>
          <div className="h-[92px] rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-14 rounded-2xl bg-white/10" />
        </div>
      ) : (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-xs uppercase tracking-[0.26em] text-slate-400"
          >
            Username
          </Label>
          <div className="group relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-blue-300" />
            <Input
              id="username"
              autoComplete="username"
              required
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="h-14 rounded-2xl border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus-visible:border-blue-400/40 focus-visible:ring-blue-400/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label
              htmlFor="password"
              className="text-xs uppercase tracking-[0.26em] text-slate-400"
            >
              Password
            </Label>
            <Link
              href="#"
              className="text-xs font-medium text-blue-300 transition hover:text-blue-200"
            >
              Forgot password?
            </Link>
          </div>

          <div className="group relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-blue-300" />
            <Input
              id="password"
              autoComplete="current-password"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-14 rounded-2xl border-white/10 bg-white/[0.04] pl-12 pr-14 text-sm text-white placeholder:text-slate-500 focus-visible:border-blue-400/40 focus-visible:ring-blue-400/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl border border-transparent text-slate-400 transition hover:border-white/10 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 rounded border-white/15 bg-transparent accent-blue-500 focus:ring-2 focus:ring-blue-400/30"
            />
            Keep me signed in on this device
          </label>
          <p className="text-xs leading-6 text-slate-400">
            Protected with encrypted workspace access.
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isDisabled}
          className="h-14 w-full rounded-2xl bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_55%,#60a5fa_100%)] text-base font-semibold text-white shadow-[0_20px_50px_rgba(37,99,235,0.35)] transition hover:shadow-[0_24px_60px_rgba(37,99,235,0.42)]"
        >
          {isPending ? "Opening dashboard..." : "Enter dashboard"}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div className="h-1" />
      </form>
      )}
    </div>
  )
}
