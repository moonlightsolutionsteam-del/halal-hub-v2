"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Plus, Upload, Trash2, Eye, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Doc = {
  id: string
  name: string
  doc_type: string
  file_url: string | null
  uploader_name: string | null
  verified: boolean
  created_at: string
}

const DOC_TYPES = ["Certificate", "Religious", "Medical", "Legal", "Photo", "Other"]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
}

export default function DocumentVaultPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileRef = React.useRef<HTMLInputElement>(null)

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [docs, setDocs] = React.useState<Doc[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [docName, setDocName] = React.useState("")
  const [docType, setDocType] = React.useState("Certificate")
  const [file, setFile] = React.useState<File | null>(null)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_documents")
        .select("id, name, doc_type, file_url, uploader_name, verified, created_at")
        .eq("group_id", myRow.group_id)
        .order("created_at", { ascending: false })
      setDocs(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleUpload = async () => {
    if (!docName.trim() || !groupId) return
    setSaving(true)
    const supabase = createClient()
    let fileUrl: string | null = null

    if (file) {
      const ext = file.name.split(".").pop() ?? "bin"
      const path = `family-docs/${groupId}/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: false })
      if (!upErr) {
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(path)
        fileUrl = urlData.publicUrl
      }
    }

    const { data, error } = await (supabase as any)
      .from("family_documents")
      .insert({
        group_id: groupId,
        name: docName.trim(),
        doc_type: docType,
        file_url: fileUrl,
        uploaded_by: user?.uid,
        uploader_name: user?.name ?? user?.email ?? "Member",
      })
      .select("id, name, doc_type, file_url, uploader_name, verified, created_at")
      .single()

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" })
    } else {
      setDocs(prev => [data, ...prev])
      setDocName(""); setDocType("Certificate"); setFile(null)
      setShowAdd(false)
      toast({ title: "Document saved!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_documents").delete().eq("id", id)
    setDocs(prev => prev.filter(d => d.id !== id))
    toast({ title: "Document removed" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Document Vault</h1>
              <p className="text-xs text-muted-foreground font-bold">{docs.length} document{docs.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Document Name</Label>
              <Input placeholder="e.g. Birth Certificate — Ibrahim" className="h-12 rounded-xl bg-muted border-none font-bold"
                value={docName} onChange={e => setDocName(e.target.value)} autoFocus />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</Label>
              <div className="flex gap-2 flex-wrap">
                {DOC_TYPES.map(t => (
                  <button key={t} onClick={() => setDocType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${docType === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">File (optional)</Label>
              <input ref={fileRef} type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
              <button onClick={() => fileRef.current?.click()}
                className="w-full h-12 rounded-xl bg-muted border-2 border-dashed border-border text-sm font-bold text-muted-foreground hover:border-blue-400 transition-colors flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                {file ? file.name : "Choose file"}
              </button>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={saving || !docName.trim()} className="rounded-xl h-10 px-6 font-black bg-blue-600 hover:bg-blue-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Document"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <FileText className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && docs.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <FileText className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No documents yet</p>
          <p className="text-sm text-muted-foreground">Store important family documents securely.</p>
        </div>
      )}

      {docs.length > 0 && (
        <div className="space-y-2">
          {docs.map(doc => (
            <Card key={doc.id} className="rounded-2xl border-none shadow-sm group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate">{doc.name}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{doc.doc_type} · {doc.uploader_name} · {fmtDate(doc.created_at)}</p>
                </div>
                {doc.verified && (
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 border-none text-[9px] font-black uppercase shrink-0">Verified</Badge>
                )}
                {doc.file_url && (
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors shrink-0">
                    <Eye className="h-4 w-4" />
                  </a>
                )}
                <button onClick={() => handleDelete(doc.id)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
