import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center space-y-8 pb-32">
      <div className="space-y-3">
        <p className="text-[120px] font-black text-primary/10 leading-none select-none">404</p>
        <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground -mt-6">Page Not Found</h1>
        <p className="text-muted-foreground font-medium max-w-sm mx-auto">
          We couldn't find what you were looking for. It may have moved or doesn't exist.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
            <Home className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-2">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </Link>
      </div>
    </div>
  )
}
