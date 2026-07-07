import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prayer Times Mumbai",
  description: "Accurate daily prayer times for Mumbai with Adhan alerts, Qibla direction, and Jummah finder.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
