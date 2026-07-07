import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Islamic Blog",
  description: "Articles, research, and insights on halal living, Islamic finance, and Muslim community life.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
