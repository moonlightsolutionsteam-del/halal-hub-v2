"use client"

import { useEffect, useState, useCallback } from "react"
import {
  FileText, Download, CheckCircle2, AlertTriangle, Clock,
  Upload, Loader2, ShieldCheck
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"

type ComplianceDoc = {
  type: string
  url: string
  uploaded_at: string
}

const DOC_TYPES = [
  { key: "registration_cert", label: "Registration Certificate", required: true },
  { key: "govt_approval", label: "Government Approval Letter", required: true },
  { key: "annual_compliance_report", label: "Annual Compliance Report", required: true },
  { key: "halal_standard_cert", label: "Halal Standard Accreditation", required: false },
  { key: "audit_report", label: "Latest Audit Report", required: false },
]

export default function CompliancePage() {
  const [bodyId, setBodyId] = useState<string | null>(null)
  const [docs, setDocs] = useState<Record<string, ComplianceDoc>>({})
  const [loading, setLoading] = useState(true)
  const [uploadDialog, setUploadDialog] = useState<string | null>(null)
  const [uploadUrl, setUploadUrl] = useState("")
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data: body } = await supabase
      .from("certification_bodies")
      .select("id,document_urls")
      .eq("status", "approved")
      .limit(1)
      .single()

    setBodyId(body?.id ?? null)
    setDocs(body?.document_urls ?? {})
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const handleUpload = async () => {
    if (!bodyId || !uploadDialog || !uploadUrl.trim()) return
    setSaving(true)

    const newDocs = {
      ...docs,
      [uploadDialog]: {
        type: uploadDialog,
        url: uploadUrl.trim(),
        uploaded_at: new Date().toISOString(),
      },
    }

    await supabase.from("certification_bodies").update({
      document_urls: newDocs,
      updated_at: new Date().toISOString(),
    }).eq("id", bodyId)

    await logErpActivity({
      employeeName: "Certifier",
      action: "DOCUMENT UPLOADED",
      module: "Compliance",
      recordType: "certification_body",
      recordId: bodyId,
      recordTitle: DOC_TYPES.find(d => d.key === uploadDialog)?.label ?? uploadDialog,
    })

    setDocs(newDocs)
    setUploadDialog(null)
    setUploadUrl("")
    setSaving(false)
  }

  const requiredUploaded = DOC_TYPES.filter(d => d.required && docs[d.key]).length
  const requiredTotal = DOC_TYPES.filter(d => d.required).length
  const complianceScore = Math.round((requiredUploaded / requiredTotal) * 100)

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Compliance</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Compliance & Documents</h1>
        <p className="text-muted-foreground font-medium text-sm">Upload mandatory documents and track your compliance status with HalalHub admin.</p>
      </div>

      {/* Compliance Score */}
      <Card className="rounded-3xl border-none shadow-sm bg-card">
        <CardContent className="p-6 flex items-center gap-6">
          <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 ${complianceScore === 100 ? "bg-emerald-50" : "bg-amber-50"}`}>
            <ShieldCheck className={`h-8 w-8 ${complianceScore === 100 ? "text-emerald-600" : "text-amber-600"}`} />
          </div>
          <div className="flex-1">
            <p className="font-black text-3xl text-foreground">{complianceScore}%</p>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Compliance Score</p>
            <p className="text-xs font-medium text-muted-foreground mt-1">
              {requiredUploaded} of {requiredTotal} required documents uploaded
            </p>
          </div>
          {complianceScore === 100 ? (
            <Badge className="bg-emerald-600 text-white font-black text-[10px] uppercase px-4 py-2">Compliant</Badge>
          ) : (
            <Badge className="bg-amber-500 text-white font-black text-[10px] uppercase px-4 py-2">Action Required</Badge>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documents Upload */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-6 sm:p-8 border-b">
            <CardTitle className="text-xl font-black">Required Documents</CardTitle>
            <CardDescription>Upload mandatory compliance documents for admin review.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-4">
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : DOC_TYPES.map(doc => {
              const uploaded = docs[doc.key]
              return (
                <div key={doc.key} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${uploaded ? "bg-emerald-50" : "bg-muted"}`}>
                      {uploaded
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        : <FileText className="h-4 w-4 text-muted-foreground" />
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-foreground text-sm truncate">{doc.label}</p>
                      <div className="flex items-center gap-2">
                        {doc.required && (
                          <span className="text-[9px] font-black text-red-500 uppercase">Required</span>
                        )}
                        {uploaded && (
                          <span className="text-[9px] font-bold text-muted-foreground">
                            Uploaded {new Date(uploaded.uploaded_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {uploaded && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-xl h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(uploaded.url, "_blank")}
                      >
                        <Download className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={uploaded ? "outline" : "default"}
                      className="rounded-xl font-black text-[10px] uppercase h-8 px-3 gap-1"
                      onClick={() => { setUploadDialog(doc.key); setUploadUrl("") }}
                    >
                      <Upload className="h-3 w-3" />
                      {uploaded ? "Replace" : "Upload"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Audit Trail */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-6 sm:p-8 border-b">
            <CardTitle className="text-xl font-black">Compliance Checklist</CardTitle>
            <CardDescription>HalalHub admin requirements for active certification bodies.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-4">
            {[
              { label: "Registration Certificate", status: !!docs["registration_cert"], desc: "Govt-issued registration" },
              { label: "Government Approval", status: !!docs["govt_approval"], desc: "Ministry / regulatory approval" },
              { label: "Annual Compliance Report", status: !!docs["annual_compliance_report"], desc: "Due every Jan 31" },
              { label: "Halal Standard Accreditation", status: !!docs["halal_standard_cert"], desc: "Optional but recommended" },
              { label: "Active Certificate Count > 0", status: false, desc: "Issue at least one certificate" },
              { label: "Profile 100% Complete", status: false, desc: "All profile fields filled" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
                <div className="space-y-0.5">
                  <p className="font-black text-foreground text-sm">{item.label}</p>
                  <p className="text-[10px] font-bold text-muted-foreground">{item.desc}</p>
                </div>
                {item.status
                  ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  : <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                }
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={!!uploadDialog} onOpenChange={open => { if (!open) { setUploadDialog(null); setUploadUrl("") } }}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="p-3 rounded-2xl bg-muted/50">
              <p className="text-sm font-black text-foreground">{DOC_TYPES.find(d => d.key === uploadDialog)?.label}</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Document URL <span className="text-red-500">*</span></Label>
              <Input
                value={uploadUrl}
                onChange={e => setUploadUrl(e.target.value)}
                placeholder="Paste the document URL (Google Drive, Dropbox, etc.)"
                className="rounded-2xl h-11"
              />
              <p className="text-[10px] text-muted-foreground font-medium">Upload your document to a cloud storage service and paste the shareable link here.</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-2xl font-black" onClick={() => { setUploadDialog(null); setUploadUrl("") }}>Cancel</Button>
            <Button
              className="rounded-2xl font-black bg-primary text-primary-foreground"
              disabled={saving || !uploadUrl.trim()}
              onClick={handleUpload}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
