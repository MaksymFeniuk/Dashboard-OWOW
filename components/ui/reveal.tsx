"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type RevealVariant = "fade" | "fade-up"

export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.18,
  variant = "fade-up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  variant?: RevealVariant
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reveal will-change-transform",
        variant === "fade" ? "motion-reveal-fade" : "motion-reveal-up",
        isVisible && "is-visible",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
