import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Get support, FAQs, and guides for using Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
