"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, TrendingUp, Users, Target } from "lucide-react"

const donations = [
  { donor: "Ahmed Khan", email: "ahmed.k@example.com", campaign: "Renovation", amount: "₹5,000", date: "Mar 20, 2026" },
  { donor: "Fatima Al-Sayed", email: "fatima.s@example.com", campaign: "Education", amount: "₹1,000", date: "Mar 18, 2026" },
  { donor: "Yusuf Ibrahim", email: "yusuf.i@example.com", campaign: "Renovation", amount: "₹2,500", date: "Mar 15, 2026" },
  { donor: "Anonymous", email: "—", campaign: "General Sadaqah", amount: "₹10,000", date: "Mar 10, 2026" },
]

const kpis = [
  { label: "Total This Month", value: "₹45,231", icon: CircleDollarSign },
  { label: "Growth", value: "+20.1%", icon: TrendingUp },
  { label: "Unique Donors", value: "312", icon: Users },
  { label: "Active Campaigns", value: "3", icon: Target },
]

export default function MosqueDonationsPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Donations</h1>
        <p className="text-sm font-bold text-muted-foreground">Track contributions from your community.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 space-y-2">
              <kpi.icon className="h-5 w-5 text-teal-600" />
              <p className="text-xl font-black text-foreground">{kpi.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">All Donations</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead className="hidden sm:table-cell">Campaign</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="font-bold">{d.donor}</div>
                    <div className="text-xs text-muted-foreground hidden md:block">{d.email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell"><Badge variant="secondary">{d.campaign}</Badge></TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{d.date}</TableCell>
                  <TableCell className="text-right font-black">{d.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
