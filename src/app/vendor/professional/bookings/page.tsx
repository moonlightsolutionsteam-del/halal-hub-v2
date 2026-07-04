"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const appointments = [
  { id: "APP-001", client: "Aisha Khan", service: "General Check-up", date: "Tomorrow, 10:00 AM", status: "Confirmed" },
  { id: "APP-002", client: "Yusuf Ibrahim", service: "Follow-up Visit", date: "Friday, 2:00 PM", status: "Confirmed" },
  { id: "APP-003", client: "Maryam Siddiqui", service: "First Consultation", date: "Monday, 11:30 AM", status: "Pending" },
  { id: "APP-004", client: "Omar Sheikh", service: "Home Visit", date: "Mar 12, 2026", status: "Completed" },
]

export default function ProfessionalBookingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Appointments</h1>
        <p className="text-sm font-bold text-muted-foreground">Manage your upcoming and past bookings.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">All Appointments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden sm:table-cell">Service</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-bold">{a.client}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{a.service}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{a.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={a.status === "Completed" ? "secondary" : a.status === "Pending" ? "outline" : "default"}>{a.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
