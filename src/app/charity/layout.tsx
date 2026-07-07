import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Charity & Donations",
  description: "Track your Zakat, Sadaqah, and charity campaigns. Give to verified Islamic causes.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
