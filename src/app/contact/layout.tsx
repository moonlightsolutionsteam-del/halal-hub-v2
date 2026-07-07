import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to the Halal Hub team in Mumbai, BKC.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
