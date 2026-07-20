"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Shield } from "lucide-react"

export default function EmployeeLoginPage() {
  const { signInWithEmail } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try {
      await signInWithEmail(email, password)
    } catch (err: any) {
      toast({
        title: "Sign-in failed",
        description: err?.message ?? "Check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo / brand */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Halal Hub ERP</h1>
            <p className="text-sm text-muted-foreground mt-1">Internal employee access only</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Work Email
            </label>
            <Input
              type="email"
              placeholder="you@halalhub.co.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="rounded-xl h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-bold text-sm"
            disabled={loading || !email || !password}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Sign In to ERP
          </Button>
        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground">
          Not an employee?{" "}
          <a href="/login" className="text-primary font-bold hover:underline">
            Consumer login →
          </a>
        </p>
      </div>
    </div>
  )
}
