import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Events Mumbai",
  description: "Find Islamic lectures, community iftars, networking events, and cultural gatherings in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
