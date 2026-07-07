import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Travel",
  description: "Muslim-friendly travel packages, Hajj and Umrah bookings, and halal holiday guides.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
