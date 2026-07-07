import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muslim Community",
  description: "Connect with Mumbai's Muslim community — groups, discussions, and local events.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
