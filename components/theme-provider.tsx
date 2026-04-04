"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  attribute?: "class"
}

const STORAGE_KEY = "theme"

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark"

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(resolvedTheme: ResolvedTheme, disableTransitionOnChange?: boolean) {
  const root = document.documentElement
  let cleanupTransition: (() => void) | undefined

  if (disableTransitionOnChange) {
    const style = document.createElement("style")
    style.appendChild(
      document.createTextNode("* { transition: none !important; animation: none !important; }")
    )
    document.head.appendChild(style)
    cleanupTransition = () => {
      document.head.removeChild(style)
    }
  }

  root.classList.toggle("dark", resolvedTheme === "dark")

  if (cleanupTransition) {
    window.setTimeout(cleanupTransition, 0)
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() =>
    defaultTheme === "dark" ? "dark" : "light"
  )

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
      setThemeState(storedTheme)
      return
    }

    setThemeState(defaultTheme)
  }, [defaultTheme])

  React.useEffect(() => {
    const nextResolvedTheme =
      theme === "system" && enableSystem ? getSystemTheme() : theme === "dark" ? "dark" : "light"

    setResolvedTheme(nextResolvedTheme)
    applyTheme(nextResolvedTheme, disableTransitionOnChange)

    if (theme === "system") {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [disableTransitionOnChange, enableSystem, theme])

  React.useEffect(() => {
    if (!(enableSystem && theme === "system")) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const nextResolvedTheme = mediaQuery.matches ? "dark" : "light"
      setResolvedTheme(nextResolvedTheme)
      applyTheme(nextResolvedTheme, disableTransitionOnChange)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [disableTransitionOnChange, enableSystem, theme])

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: setThemeState,
    }),
    [resolvedTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
