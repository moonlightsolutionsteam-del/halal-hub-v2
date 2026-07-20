// @ts-nocheck
"use client"

import { useEffect, useState, useCallback } from "react"
import {
  ShieldCheck, Award, Search, Plus, ArrowRight, Clock,
  CheckCircle2, Upload, FileText, Loader2, Building2,
  Globe, MapPin, AlertCircle, XCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CertBody = {
  id: string
  name: string
  logo_url: string | null
  certification_categories: string[]
  coverage_type: string
  coverage_states: string[]
  standards_issued: string[]
  contact_email: string | null
}

type MyApplication = {
  id: string
  certification_body_name: string
  halal_standard_requested: string | null
  product_scope: string | null
  status: string
  submitted_at: string
  estimated_completion_date: string | null
}

type MyVerificationRequest = {
  id: string
  certification_body_name: string
  claimed_certificate_number: string
  status: string
  created_at: string
  certifier_response: string | null
}

const APP_STATUS_PROGRESS: Record<string, number> = {
  submitted: 15,
  contacted: 30,
  in_progress: 50,
  inspection_scheduled: 65,
  inspection_done: 80,
  approved: 100,
  rejected: 0,
  withdrawn: 0,
}

const APP_STATUS_STYLES: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-purple-50 text-purple-700 border-purple-200",
  inspection_scheduled: "bg-cyan-50 text-cyan-700 border-cyan-200",
  inspection_done: "bg-indigo-50 text-indigo-700 border-indigo-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  withdrawn: "bg-zinc-50 text-zinc-600 border-zinc-200",
}

const DEMO_BUSINESS_ID = "00000000-0000-0000-0000-000000000001"
const DEMO_BUSINESS_NAME = "My Business"

const emptyApplyForm = {
  halal_standard_requested: "",
  product_scope: "",
  product_categories: "",
  message_to_body: "",
}

const emptyClaimForm = {
  claimed_certificate_number: "",
  claimed_issue_date: "",
  claimed_expiry_date: "",
  notes: "",
}

export default function VendorVerificationPage() {
  const [bodies, setBodies] = useState<CertBody[]>([])
  const [myApps, setMyApps] = useState<MyApplication[]>([])
  const [myRequests, setMyRequests] = useState<MyVerificationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [applyDialog, setApplyDialog] = useState<CertBody | null>(null)
  const [applyForm, setApplyForm] = useState(emptyApplyForm)
  const [claimDialog, setClaimDialog] = useState<CertBody | null>(null)
  const [claimForm, setClaimForm] = useState(emptyClaimForm)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data: bodiesData }, { data: appsData }, { data: reqsData }] = await Promise.all([
      supabase
        .from("certification_bodies")
        .select("id,name,logo_url,certification_categories,coverage_type,coverage_states,standards_issued,contact_email")
        .eq("status", "approved")
        .order("name"),
      supabase
        .from("certification_applications")
        .select("id,certification_body_name,halal_standard_requested,product_scope,status,submitted_at,estimated_completion_date")
        .eq("business_id", DEMO_BUSINESS_ID)
        .order("submitted_at", { ascending: false }),
      supabase
        .from("certifier_verification_requests")
        .select("id,certification_body_name,claimed_certificate_number,status,created_at,certifier_response")
        .eq("business_id", DEMO_BUSINESS_ID)
        .order("created_at", { ascending: false }),
    ])

    setBodies(bodiesData ?? [])
    setMyApps(appsData ?? [])
    setMyRequests(reqsData ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleApply = async () => {
    if (!applyDialog) return
    setSaving(true)

    await supabase.from("certification_applications").insert({
      business_id: DEMO_BUSINESS_ID,
      business_name: DEMO_BUSINESS_NAME,
      certification_body_id: applyDialog.id,
      certification_body_name: applyDialog.name,
      halal_standard_requested: applyForm.halal_standard_requested || null,
      product_scope: applyForm.product_scope || null,
      product_categories: applyForm.product_categories ? applyForm.product_categories.split(",").map(s => s.trim()) : [],
      message_to_body: applyForm.message_to_body || null,
      status: "submitted",
    })

    await logErpActivity({
      employeeName: DEMO_BUSINESS_NAME,
      action: "APPLIED",
      module: "Certification Applications",
      recordType: "certification_application",
      recordTitle: `Applied to ${applyDialog.name}`,
    })

    setApplyDialog(null)
    setApplyForm(emptyApplyForm)
    setSaving(false)
    load()
  }

  const handleClaim = async () => {
    if (!claimDialog) return
    setSaving(true)

    const deadline = new Date()
    deadline.setHours(deadline.getHours() + 48)

    await supabase.from("certifier_verification_requests").insert({
      business_id: DEMO_BUSINESS_ID,
      business_name: DEMO_BUSINESS_NAME,
      certification_body_id: claimDialog.id,
      certification_body_name: claimDialog.name,
      claimed_certificate_number: claimForm.claimed_certificate_number,
      claimed_issue_date: claimForm.claimed_issue_date || null,
      claimed_expiry_date: claimForm.claimed_expiry_date || null,
      notes: claimForm.notes || null,
      status: "pending",
      response_deadline: deadline.toISOString(),
    })

    await logErpActivity({
      employeeName: DEMO_BUSINESS_NAME,
      action: "CLAIMED CERT",
      module: "Verification Requests",
      recordType: "certifier_verification_request",
      recordTitle: `${claimForm.claimed_certificate_number} with ${claimDialog.name}`,
    })

    setClaimDialog(null)
    setClaimForm(emptyClaimForm)
    setSaving(false)
    load()
  }

  const filteredBodies = bodies.filter(b =>
    !search ||
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    (b.certification_categories ?? []).some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  const activeApps = myApps.filter(a => !["approved", "rejected", "withdrawn"].includes(a.status))
  const completedApps = myApps.filter(a => ["approved", "rejected", "withdrawn"].includes(a.status))

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-6xl pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <ShieldCheck className="h-3 w-3" /> Compliance Hub
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground">Certification Centre</h1>
        <p className="text-muted-foreground font-medium">Apply for halal certification, track applications, and verify existing certificates.</p>
      </div>

      <Tabs defaultValue={activeApps.length > 0 ? "applications" : "browse"}>
        <TabsList className="bg-muted rounded-2xl p-1 h-auto gap-1">
          <TabsTrigger value="browse" className="rounded-xl px-5 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Browse Bodies
          </TabsTrigger>
          <TabsTrigger value="applications" className="rounded-xl px-5 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">
            My Applications {myApps.length > 0 && `(${myApps.length})`}
          </TabsTrigger>
          <TabsTrigger value="claims" className="rounded-xl px-5 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Cert Claims {myRequests.length > 0 && `(${myRequests.length})`}
          </TabsTrigger>
        </TabsList>

        {/* Tab: Browse Certification Bodies */}
        <TabsContent value="browse" className="mt-6 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by body name or certification category..."
              className="pl-11 h-12 rounded-2xl bg-card border-none shadow-sm font-medium text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filteredBodies.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Award className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="font-black text-foreground">No approved certification bodies yet.</p>
              <p className="text-sm text-muted-foreground font-medium">Certification bodies are being onboarded. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBodies.map(body => (
                <Card key={body.id} className="rounded-[2.5rem] border-none shadow-sm bg-card hover:shadow-md transition-all group overflow-hidden">
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                        {body.logo_url
                          ? <img src={body.logo_url} alt={body.name} className="h-full w-full object-contain" />
                          : <Award className="h-7 w-7 text-muted-foreground" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-foreground leading-tight">{body.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground mt-1">
                          {body.coverage_type === "national" ? <Globe className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                          <span className="capitalize">{body.coverage_type} coverage</span>
                        </div>
                      </div>
                    </div>

                    {(body.certification_categories ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {body.certification_categories.slice(0, 4).map(c => (
                          <Badge key={c} variant="secondary" className="rounded-full text-[10px] font-black px-3 py-0.5">{c}</Badge>
                        ))}
                        {body.certification_categories.length > 4 && (
                          <Badge variant="secondary" className="rounded-full text-[10px] font-black px-3 py-0.5">+{body.certification_categories.length - 4} more</Badge>
                        )}
                      </div>
                    )}

                    {(body.standards_issued ?? []).length > 0 && (
                      <p className="text-[11px] font-bold text-muted-foreground">
                        Standards: {body.standards_issued.join(", ")}
                      </p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground h-11 gap-2"
                        onClick={() => setApplyDialog(body)}
                      >
                        <Plus className="h-3.5 w-3.5" /> Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-2xl font-black text-[11px] uppercase tracking-widest h-11 gap-2 border-2"
                        onClick={() => setClaimDialog(body)}
                      >
                        <Upload className="h-3.5 w-3.5" /> Claim Cert
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab: My Applications */}
        <TabsContent value="applications" className="mt-6 space-y-6">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : myApps.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="font-black text-foreground">No applications yet.</p>
              <p className="text-sm text-muted-foreground font-medium">Browse certification bodies and apply for halal certification.</p>
            </div>
          ) : (
            <>
              {activeApps.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" /> Active Applications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {activeApps.map(app => (
                      <Card key={app.id} className="rounded-[2.5rem] border-none shadow-sm bg-card">
                        <div className="p-6 space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-black text-foreground">{app.certification_body_name}</p>
                              {app.halal_standard_requested && (
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{app.halal_standard_requested}</p>
                              )}
                            </div>
                            <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 shrink-0 ${APP_STATUS_STYLES[app.status] ?? ""}`}>
                              {app.status.replace(/_/g, " ")}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              <span>Progress</span>
                              <span>{APP_STATUS_PROGRESS[app.status] ?? 0}%</span>
                            </div>
                            <Progress value={APP_STATUS_PROGRESS[app.status] ?? 0} className="h-2" />
                          </div>
                          {app.estimated_completion_date && (
                            <p className="text-[10px] font-bold text-muted-foreground">
                              Est. completion: {app.estimated_completion_date}
                            </p>
                          )}
                          <p className="text-[10px] font-bold text-muted-foreground">
                            Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {completedApps.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-base font-black text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Completed
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedApps.map(app => (
                      <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/40">
                        <div>
                          <p className="font-black text-sm text-foreground">{app.certification_body_name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground">{new Date(app.submitted_at).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${APP_STATUS_STYLES[app.status] ?? ""}`}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Tab: Certificate Claims */}
        <TabsContent value="claims" className="mt-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-800">
              Already have a halal certificate? Submit a claim to have the certification body verify and link it to your HalalHub profile. They have 48 hours to respond.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : myRequests.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="font-black text-foreground">No certificate claims submitted yet.</p>
              <p className="text-sm text-muted-foreground font-medium">Browse certification bodies and use &ldquo;Claim Cert&rdquo; to link an existing certificate.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myRequests.map(r => (
                <div key={r.id} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-card shadow-sm">
                  <div className="space-y-1">
                    <p className="font-black text-foreground">{r.certification_body_name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{r.claimed_certificate_number}</p>
                    {r.certifier_response && (
                      <p className="text-xs font-medium text-muted-foreground italic">&ldquo;{r.certifier_response}&rdquo;</p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${
                      r.status === "confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      r.status === "denied" ? "bg-red-50 text-red-700 border-red-200" :
                      r.status === "escalated" ? "bg-purple-50 text-purple-700 border-purple-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {r.status}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground font-bold">{new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Apply Dialog */}
      <Dialog open={!!applyDialog} onOpenChange={open => { if (!open) { setApplyDialog(null); setApplyForm(emptyApplyForm) } }}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">Apply for Certification</DialogTitle>
            <DialogDescription>Applying to <strong>{applyDialog?.name}</strong></DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Halal Standard Requested</Label>
              <Input
                value={applyForm.halal_standard_requested}
                onChange={e => setApplyForm(f => ({ ...f, halal_standard_requested: e.target.value }))}
                placeholder="e.g., JAKIM, HMC, MS 1500:2019"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product / Service Scope <span className="text-red-500">*</span></Label>
              <Textarea
                value={applyForm.product_scope}
                onChange={e => setApplyForm(f => ({ ...f, product_scope: e.target.value }))}
                placeholder="Describe what you need certified: all food products, specific meat items, restaurant kitchen, etc."
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Product Categories (comma separated)</Label>
              <Input
                value={applyForm.product_categories}
                onChange={e => setApplyForm(f => ({ ...f, product_categories: e.target.value }))}
                placeholder="e.g., Meat, Dairy, Beverages"
                className="rounded-2xl h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Message to Certification Body</Label>
              <Textarea
                value={applyForm.message_to_body}
                onChange={e => setApplyForm(f => ({ ...f, message_to_body: e.target.value }))}
                placeholder="Any additional information for the certification body..."
                className="rounded-2xl"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setApplyDialog(null); setApplyForm(emptyApplyForm) }}>Cancel</Button>
            <Button
              className="rounded-2xl font-black bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={saving || !applyForm.product_scope.trim()}
              onClick={handleApply}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Claim Existing Cert Dialog */}
      <Dialog open={!!claimDialog} onOpenChange={open => { if (!open) { setClaimDialog(null); setClaimForm(emptyClaimForm) } }}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">Claim Existing Certificate</DialogTitle>
            <DialogDescription>
              Submit your existing certificate details to <strong>{claimDialog?.name}</strong> for verification. They will confirm within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Certificate Number <span className="text-red-500">*</span></Label>
              <Input
                value={claimForm.claimed_certificate_number}
                onChange={e => setClaimForm(f => ({ ...f, claimed_certificate_number: e.target.value }))}
                placeholder="e.g., HH-IND-2024-001"
                className="rounded-2xl h-11 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Issue Date</Label>
                <Input
                  type="date"
                  value={claimForm.claimed_issue_date}
                  onChange={e => setClaimForm(f => ({ ...f, claimed_issue_date: e.target.value }))}
                  className="rounded-2xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
                <Input
                  type="date"
                  value={claimForm.claimed_expiry_date}
                  onChange={e => setClaimForm(f => ({ ...f, claimed_expiry_date: e.target.value }))}
                  className="rounded-2xl h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Additional Notes</Label>
              <Textarea
                value={claimForm.notes}
                onChange={e => setClaimForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Any notes to help the certification body verify your certificate..."
                className="rounded-2xl"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setClaimDialog(null); setClaimForm(emptyClaimForm) }}>Cancel</Button>
            <Button
              className="rounded-2xl font-black bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={saving || !claimForm.claimed_certificate_number.trim()}
              onClick={handleClaim}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Submit Claim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
