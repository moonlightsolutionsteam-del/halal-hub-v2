import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Professionals Mumbai",
  description: "Connect with Muslim doctors, lawyers, accountants, and consultants in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
