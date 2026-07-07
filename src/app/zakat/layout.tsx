import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zakat Calculator",
  description: "Calculate and pay your Zakat accurately with our Islamic finance tools.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
