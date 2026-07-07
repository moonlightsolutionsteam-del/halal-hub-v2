import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mosques in Mumbai",
  description: "Find verified mosques, prayer halls, and Islamic centres near you in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
