import { ShieldCheck } from "lucide-react"

import { LoginForm } from "@/components/auth/login-form"

import styles from "./login.module.css"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(58,123,213,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.2),transparent_24%),linear-gradient(180deg,#070a14_0%,#04060d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      <div className="absolute left-1/2 top-[16%] h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="chrome-enter flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] text-xl font-black shadow-[0_18px_50px_rgba(37,99,235,0.35)]">
            O
          </div>
          <div className="leading-none">
            <div className="flex items-start gap-1">
              <span className="text-xl font-bold tracking-tight">OWOW</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-blue-200/50">
                &reg;
              </span>
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.34em] text-slate-400">
              Client Dashboard
            </p>
          </div>
        </div>

        <div className="chrome-enter hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 shadow-[0_10px_40px_rgba(2,6,23,0.35)] backdrop-blur md:flex" style={{ animationDelay: "120ms" }}>
          <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
          Secure workspace access
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl items-center px-6 pb-12 lg:px-10 lg:pb-16">
        <div className="motion-cascade grid w-full items-center gap-10 lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-16">
          <section className="order-2 lg:order-1">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(8,11,20,0.88))] p-6 shadow-[0_24px_90px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-8">
              <LoginForm />
            </div>
          </section>

          <section className="order-1 lg:order-2">
            <div className="mx-auto flex max-w-2xl flex-col gap-8">
              <div className="lg:hidden">
                <div className="mx-auto max-w-sm">
                  <OrbScene />
                </div>
              </div>

              <div className="hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,30,0.82),rgba(5,8,18,0.58))] p-8 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur xl:block">
                <div className="rounded-[1.8rem] border border-blue-400/10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_42%),linear-gradient(180deg,rgba(15,23,42,0.42),rgba(15,23,42,0.08))] p-4">
                  <OrbScene />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function OrbScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.orbShell}>
        <div className={styles.glow} />
        <div className={styles.orb}>
          <div className={`${styles.line} ${styles.outerSphere}`} />
          <div className={`${styles.line} ${styles.meridianPrimary}`} />
          <div className={`${styles.line} ${styles.meridianSecondary}`} />
          <div className={`${styles.ring} ${styles.ringOne}`} />
          <div className={`${styles.ring} ${styles.ringTwo}`} />
          <div className={`${styles.ring} ${styles.ringThree}`} />
          <div className={styles.core} />
        </div>
      </div>
    </div>
  )
}
