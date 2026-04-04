import { cn } from "@/lib/utils"

export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("motion-page-enter", className)}>{children}</div>
}
