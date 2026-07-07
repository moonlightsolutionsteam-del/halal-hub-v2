import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Halal Hub to access personalised halal recommendations, prayer times, and community features.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
