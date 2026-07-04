"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, UploadCloud, CheckCircle2 } from "lucide-react"

const documents = [
  { name: "Waqf Registration Certificate", status: "Verified", date: "Uploaded Jan 2024" },
  { name: "Trust Deed", status: "Verified", date: "Uploaded Jan 2024" },
  { name: "Tax Exemption (80G) Certificate", status: "Pending Review", date: "Uploaded Mar 2026" },
]

export default function MosqueDocumentsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Documents</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage verification and legal documents.</p>
        </div>
        <Button className="rounded-full"><UploadCloud className="h-4 w-4 mr-2" />Upload</Button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">{doc.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{doc.date}</p>
              </div>
              <Badge variant={doc.status === "Verified" ? "default" : "secondary"} className="flex items-center gap-1">
                {doc.status === "Verified" && <CheckCircle2 className="h-3 w-3" />}
                {doc.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
