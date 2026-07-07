import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Privacy",
  description: "Halal Hub terms of service, privacy policy, and data practices.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
