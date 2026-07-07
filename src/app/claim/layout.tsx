import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Claim Your Business",
  description: "Claim and verify your halal business listing on Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
