"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "dark"

  const storedTheme = window.localStorage.getItem("theme")
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const isDark = mounted ? theme === "dark" : true

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-10 w-[78px] items-center rounded-full border px-1.5 transition-all duration-300 ${
        isDark
          ? "border-white/10 bg-[#17141a] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          : "border-border/70 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <span
        className={`absolute top-1.5 h-7 w-7 rounded-full transition-all duration-300 ${
          isDark
            ? "translate-x-0 bg-[#f5f2ef] shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
            : "translate-x-[36px] bg-[#16171b] shadow-[0_6px_18px_rgba(15,23,42,0.2)]"
        }`}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <span
          className={`flex h-5 w-5 items-center justify-center transition-colors duration-300 ${
            isDark ? "text-[#17141a]" : "text-muted-foreground"
          }`}
        >
          <Moon className="h-3.5 w-3.5" />
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center transition-colors duration-300 ${
            isDark ? "text-muted-foreground" : "text-white"
          }`}
        >
          <Sun className="h-3.5 w-3.5" />
        </span>
      </span>
    </button>
  )
}
