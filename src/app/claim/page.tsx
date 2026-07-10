"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2, UploadCloud, ShieldCheck, Building2, Phone,
  User, X, FileText, CheckCircle2, AlertCircle
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FormState {
  fullName: string
  mobile: string
  role: string
  businessName: string
  proofFile: File | null
}

const ROLES = ["Owner", "Manager", "Authorised Representative", "Director", "Partner"]

export default function ClaimBusinessPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({ fullName: "", mobile: "", role: "", businessName: "", proofFile: null })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function set(key: keyof FormState, value: string | File | null) {
    setForm(p => ({ ...p, [key]: value }))
    setErrors(p => ({ ...p, [key]: "" }))
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 2) e.fullName = "Full name must be at least 2 characters."
    if (!form.mobile.trim()) e.mobile = "Mobile number is required."
    if (!/^\+?[0-9\s\-().]{7,20}$/.test(form.mobile)) e.mobile = "Enter a valid mobile number with country code."
    if (!form.role) e.role = "Please select your role."
    if (!form.proofFile) e.proofFile = "A proof of ownership document is required."
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.fullName, mobile: form.mobile, role: form.role, businessName: form.businessName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast({ title: "Claim Submitted!", description: "We'll review your documents and get back within 48 hours." })
      router.push("/")
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Failed to submit. Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  function ErrorMsg({ field }: { field: keyof FormState }) {
    if (!errors[field]) return null
    return <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="h-3 w-3" />{errors[field]}</p>
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">Claim Your Business</h1>
          <p className="text-sm font-medium text-muted-foreground max-w-sm mx-auto">
            Verify your ownership to manage your listing, respond to reviews, and unlock your business dashboard.
          </p>
        </div>

        <Card className="rounded-[2.5rem] border-none shadow-soft bg-card">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Your Full Name *</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={cn("h-12 rounded-2xl bg-muted border-none font-bold pl-11", errors.fullName && "ring-2 ring-red-500/50")}
                />
              </div>
              <ErrorMsg field="fullName" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mobile Number *</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.mobile}
                  onChange={(e) => set("mobile", e.target.value)}
                  placeholder="+91 99999 99999"
                  className={cn("h-12 rounded-2xl bg-muted border-none font-bold pl-11", errors.mobile && "ring-2 ring-red-500/50")}
                />
              </div>
              <ErrorMsg field="mobile" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Your Role *</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ROLES.map(r => (
                  <button
                    key={r}
                    onClick={() => set("role", r)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all",
                      form.role === r ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <ErrorMsg field="role" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Proof of Ownership *</Label>
              <p className="text-xs text-muted-foreground font-medium">Upload a business license, trade certificate, or official document showing your name and business.</p>
              <label className={cn(
                "relative flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all",
                form.proofFile ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30",
                errors.proofFile && "border-red-400"
              )}>
                {form.proofFile ? (
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-foreground truncate">{form.proofFile.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{(form.proofFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); set("proofFile", null) }}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 bg-muted rounded-3xl flex items-center justify-center text-muted-foreground">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-black text-foreground">Click or drag to upload</p>
                      <p className="text-xs font-medium text-muted-foreground">PDF, JPG or PNG — max 5MB</p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f && f.size <= 5 * 1024 * 1024) set("proofFile", f)
                    else if (f) setErrors(p => ({ ...p, proofFile: "File must be under 5MB." }))
                  }}
                />
              </label>
              <ErrorMsg field="proofFile" />
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-2xl">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                Documents are reviewed privately by our team. By submitting, you agree to our <Link href="/terms" className="font-bold text-primary hover:underline">Terms of Service</Link>.
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 text-sm"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Claim for Review"}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground font-medium">
          New business? <Link href="/partner/portal" className="font-black text-primary hover:underline">Register your business instead →</Link>
        </p>
      </div>
    </div>
  )
}
