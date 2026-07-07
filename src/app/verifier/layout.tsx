import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Verifier",
  description: "Apply to become a certified halal verifier and help businesses get verified on Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
