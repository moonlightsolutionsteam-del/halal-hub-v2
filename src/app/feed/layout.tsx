import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Feed",
  description: "Stay connected with Mumbai's Muslim community — posts, reels, discussions, and halal recommendations.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
