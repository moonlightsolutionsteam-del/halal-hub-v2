import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Asma ul Husna — 99 Names of Allah",
  description: "Explore and reflect on the 99 beautiful names of Allah with meanings and benefits.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
