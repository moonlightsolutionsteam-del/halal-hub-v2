import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Check",
  description: "Instantly verify halal status of products, E-codes, and ingredients. Barcode scanner and full database included.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
