import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suggest a Place",
  description: "Help the community by suggesting a halal business or mosque to add to Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
