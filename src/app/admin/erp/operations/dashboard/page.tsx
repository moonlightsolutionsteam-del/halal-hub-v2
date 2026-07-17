"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Award, Briefcase, Headset, AlertTriangle, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type Verification = { id: string; business_id: string; halal_status: string; created_at: string | null }
type Business = { id: string; name: string; category: string | null; is_verified: boolean | null; created_at: string | null }
type Order = { id: string; status: string | null; service_type: string | null; created_at: string | null }

function verBadge(s: string) {
  if (s === "Approved" || s === "verified") return "secondary" as const
  if (s === "Rejected") return "destructive" as const
  return "default" as const
}

export default function OperationsDashboardPage() {
  const [verifications, setVerifications] = React.useState<Verification[]>([])
  const [newBusinesses, setNewBusinesses] = React.useState<Business[]>([])
  const [orders, setOrders] = React.useState<Order[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("business_verifications").select("id, business_id, halal_status, created_at").order("created_at", { ascending: false }).limit(20),
      supabase.from("businesses").select("id, name, category, is_verified, created_at").eq("is_verified", false).order("created_at", { ascending: false }).limit(10),
      supabase.from("business_orders").select("id, status, service_type, created_at").order("created_at", { ascending: false }).limit(10),
    ]).then(([ver, biz, ord]) => {
      setVerifications(ver.data ?? [])
      setNewBusinesses(biz.data ?? [])
      setOrders(ord.data ?? [])
      setLoading(false)
    })
  }, [])

  const pendingVerifications = verifications.filter(v => v.halal_status === "Pending" || v.halal_status === "pending")

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Operations Dashboard</h1>
        <p className="text-muted-foreground">Manage listings, verifications, and support.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle><ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerifications.length}</div>
            <p className="text-xs text-muted-foreground">{verifications.length} total submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle><Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter(o => o.status !== "completed" && o.status !== "Completed").length}</div>
            <p className="text-xs text-muted-foreground">{orders.length} total orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unverified Listings</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newBusinesses.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Halal Verified</CardTitle><Headset className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifications.filter(v => v.halal_status === "Approved" || v.halal_status === "verified").length}</div>
            <p className="text-xs text-muted-foreground">Approved verifications</p>
          </CardContent>
        </Card>
      </div>

      {pendingVerifications.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{pendingVerifications.length} Verifications Pending Review</AlertTitle>
          <AlertDescription>These require manual review before businesses can display the Halal badge.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Unverified Businesses</CardTitle>
                <CardDescription>New listings awaiting approval.</CardDescription>
              </div>
              <Button size="sm" variant="outline" asChild><Link href="/admin/businesses">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newBusinesses.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No pending listings.</TableCell></TableRow>
                ) : newBusinesses.map(b => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell><Badge variant="outline">{b.category ?? "—"}</Badge></TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">Review</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track the progress of business service orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow><TableCell colSpan={2} className="text-center py-6 text-muted-foreground">No orders yet.</TableCell></TableRow>
                ) : orders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.service_type ?? "Order"}</TableCell>
                    <TableCell>
                      <Badge variant={o.status === "completed" || o.status === "Completed" ? "secondary" : "default"}>
                        {o.status ?? "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
