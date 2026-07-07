import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Messages",
  description: "Private and group messaging for the Halal Hub community.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
