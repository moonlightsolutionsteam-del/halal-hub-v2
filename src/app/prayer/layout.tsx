import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prayer",
  description: "Accurate prayer times, Jummah finder, Imam consultations, Tasbeeh, and Hajj guidance for Mumbai Muslims.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
