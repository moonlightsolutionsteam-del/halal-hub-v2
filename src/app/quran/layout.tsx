import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quran",
  description: "Read, listen to, and explore the Holy Quran with tafseer and translation.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
