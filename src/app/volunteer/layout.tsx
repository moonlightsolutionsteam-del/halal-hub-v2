import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Volunteering",
  description: "Find and join Muslim volunteer opportunities across Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
