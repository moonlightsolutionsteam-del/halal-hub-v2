import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Family Tree",
  description: "Build and explore your Islamic family history, lineage, shared expenses, and family events in one private space.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
