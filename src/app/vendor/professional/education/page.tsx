"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Plus, Edit2, Award, CheckCircle2, BookOpen } from "lucide-react"

const EDUCATION = [
  { id: 1, degree: "MSc Marketing & Brand Management", institution: "University of Westminster", period: "2013 – 2015", grade: "Distinction", type: "degree" },
  { id: 2, degree: "BA (Hons) Business & Communication", institution: "University of Birmingham", period: "2010 – 2013", grade: "First Class", type: "degree" },
]

const CERTIFICATIONS = [
  { id: 1, title: "Google Analytics Certified", issuer: "Google", issued: "Mar 2024", expires: "Mar 2025", credential: "GA4-29384", verified: true },
  { id: 2, title: "HubSpot Content Marketing", issuer: "HubSpot Academy", issued: "Jan 2024", expires: "Jan 2025", credential: "HSCTM-11293", verified: true },
  { id: 3, title: "Islamic Finance Fundamentals", issuer: "CISI", issued: "Sep 2022", expires: "Sep 2025", credential: "CISI-IF-8821", verified: true },
  { id: 4, title: "Digital Marketing Pro", issuer: "CIM", issued: "Nov 2023", expires: null, credential: "CIM-DMP-4471", verified: false },
]

export default function ProfessionalEducationPage() {
  const [showEduModal, setShowEduModal] = useState(false)
  const [showCertModal, setShowCertModal] = useState(false)
  const [editEdu, setEditEdu] = useState<typeof EDUCATION[0] | null>(null)

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-3xl pb-24">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
          <GraduationCap className="h-3 w-3" /> Credentials
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Education & Certifications</h1>
        <p className="text-sm font-bold text-muted-foreground">Academic qualifications and professional certifications.</p>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-600" /> Education
          </h2>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9"
            onClick={() => { setEditEdu(null); setShowEduModal(true) }}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {EDUCATION.map(edu => (
            <Card key={edu.id} className="rounded-[2rem] border-none shadow-sm bg-card p-7">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                  <GraduationCap className="h-5 w-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-foreground">{edu.degree}</p>
                      <p className="text-sm font-bold text-violet-600">{edu.institution}</p>
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">{edu.period}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-xl h-8 w-8 p-0 shrink-0"
                      onClick={() => { setEditEdu(edu); setShowEduModal(true) }}>
                      <Edit2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  <Badge className="mt-2 bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">{edu.grade}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black flex items-center gap-2">
            <Award className="h-5 w-5 text-violet-600" /> Certifications
          </h2>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9"
            onClick={() => setShowCertModal(true)}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {CERTIFICATIONS.map(cert => (
            <Card key={cert.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
              <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${cert.verified ? "bg-emerald-50" : "bg-amber-50"}`}>
                  <Award className={`h-5 w-5 ${cert.verified ? "text-emerald-600" : "text-amber-600"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-foreground text-sm">{cert.title}</p>
                    {cert.verified && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                  </div>
                  <p className="text-xs font-bold text-violet-600">{cert.issuer}</p>
                  <p className="text-[11px] font-bold text-muted-foreground">
                    Issued {cert.issued} {cert.expires ? `· Expires ${cert.expires}` : "· No expiry"}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <Badge className={`border-none font-black text-[9px] ${cert.verified ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {cert.verified ? "Verified" : "Pending"}
                  </Badge>
                  <p className="text-[10px] font-bold text-muted-foreground block">{cert.credential}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Modal */}
      <Dialog open={showEduModal} onOpenChange={setShowEduModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{editEdu ? "Edit Education" : "Add Education"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Degree / Qualification</Label>
              <Input defaultValue={editEdu?.degree} placeholder="e.g., MSc Marketing" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Institution</Label>
              <Input defaultValue={editEdu?.institution} placeholder="University or school name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Start Year</Label>
                <Input type="number" placeholder="2010" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">End Year</Label>
                <Input type="number" placeholder="2013" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Grade / Classification</Label>
              <Input defaultValue={editEdu?.grade} placeholder="e.g., First Class, Distinction" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowEduModal(false)}>
              {editEdu ? "Save Changes" : "Add Education"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Certification Modal */}
      <Dialog open={showCertModal} onOpenChange={setShowCertModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add Certification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Certification Name</Label>
              <Input placeholder="e.g., Google Analytics Certified" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Issuing Body</Label>
              <Input placeholder="e.g., Google, HubSpot, CIM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Issue Date</Label>
                <Input type="month" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Expiry Date</Label>
                <Input type="month" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Credential ID</Label>
              <Input placeholder="e.g., GA4-29384" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowCertModal(false)}>
              Add Certification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
