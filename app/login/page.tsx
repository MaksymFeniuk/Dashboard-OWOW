import Image from "next/image"
import { ShieldCheck } from "lucide-react"

import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,123,213,0.18),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(30,64,175,0.14),transparent_24%),linear-gradient(180deg,#070a14_0%,#04060d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-4">
          <Image
            src="/owow-wordmark.svg"
            alt="OWOW"
            width={180}
            height={42}
            priority
            className="h-auto w-[140px] sm:w-[180px]"
          />
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          <p className="hidden text-[11px] uppercase tracking-[0.34em] text-slate-400 sm:block">
            Client Dashboard
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 md:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
          Secure workspace access
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl items-center justify-center px-6 pb-12 lg:px-10 lg:pb-16">
        <section className="w-full max-w-[34rem]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(8,11,20,0.88))] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-8">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
