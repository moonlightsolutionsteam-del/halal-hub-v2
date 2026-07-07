import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rewards",
  description: "Earn and redeem Halal Hub reward points for reviews, check-ins, and community contributions.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
