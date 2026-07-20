"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Trash2, BedDouble } from "lucide-react"

const ROOM_TYPES = [
  "Standard Room",
  "Deluxe Room",
  "Superior Room",
  "Suite",
  "Junior Suite",
  "Family Room",
  "Twin Room",
  "Double Room",
  "Executive Room",
  "Penthouse",
]

const STATUSES = ["Available", "Occupied", "Under Maintenance"]

type RoomRow = {
  id: string
  room_number: string | null
  room_type: string | null
  floor: number | null
  max_guests: number | null
  price_per_night: number | null
  status: string | null
  features: string | null
}

export default function HotelRoomsPage() {
  const { user } = useAuth()
  const [rooms, setRooms] = React.useState<RoomRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({
    room_number: "", room_type: ROOM_TYPES[0], floor: "", max_guests: "", price_per_night: "", status: STATUSES[0], features: "",
  })

  const load = React.useCallback(() => {
    if (!user?.uid) return
    createClient().from("hotel_rooms").select("*").eq("vendor_uid", user.uid)
      .order("created_at", { ascending: true })
      .then(({ data }) => { setRooms(data ?? []); setLoading(false) })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.room_number || !user?.uid) return
    setSaving(true)
    await createClient().from("hotel_rooms").insert({
      vendor_uid: user.uid, room_number: form.room_number, room_type: form.room_type,
      floor: form.floor ? parseInt(form.floor) : null,
      max_guests: form.max_guests ? parseInt(form.max_guests) : null,
      price_per_night: form.price_per_night ? parseFloat(form.price_per_night) : null,
      status: form.status, features: form.features || null,
    })
    setForm({ room_number: "", room_type: ROOM_TYPES[0], floor: "", max_guests: "", price_per_night: "", status: STATUSES[0], features: "" })
    setAdding(false); setSaving(false); load()
  }

  async function updateStatus(id: string, status: string) {
    await createClient().from("hotel_rooms").update({ status }).eq("id", id)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("hotel_rooms").delete().eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const STATUS_COLOR: Record<string, string> = {
    Available: "bg-emerald-100 text-emerald-700",
    Occupied: "bg-amber-100 text-amber-700",
    "Under Maintenance": "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Rooms</h1>
          <p className="text-muted-foreground text-sm">Manage your hotel rooms, types, pricing, and availability.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl font-bold" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{rooms.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total rooms</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{rooms.filter(r => r.status === "Available").length}</p><p className="text-xs text-muted-foreground mt-0.5">Available</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-amber-600">{rooms.filter(r => r.status === "Occupied").length}</p><p className="text-xs text-muted-foreground mt-0.5">Occupied</p></CardContent></Card>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Room Number *</label>
              <Input value={form.room_number} onChange={e => setForm(p => ({ ...p, room_number: e.target.value }))} placeholder="e.g. 101" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Room Type</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.room_type} onChange={e => setForm(p => ({ ...p, room_type: e.target.value }))}>
                {ROOM_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Floor</label>
              <Input type="number" placeholder="e.g. 1" value={form.floor} onChange={e => setForm(p => ({ ...p, floor: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Max Guests</label>
              <Input type="number" placeholder="e.g. 2" value={form.max_guests} onChange={e => setForm(p => ({ ...p, max_guests: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Price / Night (₹)</label>
              <Input type="number" placeholder="e.g. 3500" value={form.price_per_night} onChange={e => setForm(p => ({ ...p, price_per_night: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground">Status</label>
              <select className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-muted-foreground">Features (comma-separated)</label>
              <Input value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} placeholder="e.g. AC, King Bed, Sea View, Bathtub" />
            </div>
            <div className="col-span-2 flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Room"}</Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {rooms.length === 0 && !adding && (
        <div className="text-center py-16 space-y-2">
          <p className="text-muted-foreground font-medium">No rooms added yet.</p>
          <p className="text-sm text-muted-foreground">Add your hotel rooms to manage availability and pricing.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rooms.map(r => (
          <Card key={r.id}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <BedDouble className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm">Room {r.room_number}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">{r.room_type}</Badge>
                </div>
                <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                  {r.floor != null && <span>Floor {r.floor}</span>}
                  {r.max_guests != null && <span>· {r.max_guests} guests</span>}
                  {r.price_per_night != null && <span className="text-primary font-bold">· ₹{r.price_per_night.toLocaleString()}/night</span>}
                </div>
                {r.features && <p className="text-xs text-muted-foreground">{r.features}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  className={`h-7 rounded-lg border-transparent text-[10px] font-bold px-1.5 ${STATUS_COLOR[r.status ?? ""] ?? ""}`}
                  value={r.status ?? STATUSES[0]}
                  onChange={e => updateStatus(r.id, e.target.value)}
                >
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => handleDelete(r.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
