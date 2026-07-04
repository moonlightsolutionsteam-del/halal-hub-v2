
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Wallet, Calendar, Utensils, MessageSquare,
  Users, Star, ClipboardList, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CateringDashboard() {
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [showNewProposalModal, setShowNewProposalModal] = useState(false)
  const [showAddMenuModal, setShowAddMenuModal] = useState(false)
  const [showInquiriesModal, setShowInquiriesModal] = useState(false)
  const [showScheduleStaffModal, setShowScheduleStaffModal] = useState(false)
  const [showMarketingModal, setShowMarketingModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showContactSupportModal, setShowContactSupportModal] = useState(false)
  const [showRespondModal, setShowRespondModal] = useState(false)

  const kpis = [
    { label: "Revenue (Month)", value: "₹1,85,000", trend: "+10.2%", icon: Wallet },
    { label: "Upcoming Events", value: "8", trend: "3 this weekend", icon: Calendar },
    { label: "Pending Proposals", value: "15", trend: "Action required", icon: ClipboardList, variant: "destructive" as const },
    { label: "New Inquiries", value: "42", trend: "+5 today", icon: MessageSquare },
    { label: "Active Staff", value: "12", trend: "On duty: 4", icon: Users },
    { label: "Avg. Rating", value: "4.9", trend: "from 120 reviews", icon: Star },
    { label: "Menu Items", value: "45", trend: "3 seasonal specials", icon: Utensils },
    { label: "Inventory Alerts", value: "2", trend: "Low stock", icon: AlertCircle, variant: "destructive" as const },
  ];

  const upcomingEvents = [
    { id: "CAT-101", customer: "Amara Weddings", type: "Full Service", date: "Nov 02, 2024", status: "Confirmed" },
    { id: "CAT-102", customer: "Tech Corp BBQ", type: "Corporate Lunch", date: "Nov 05, 2024", status: "Preparation" },
    { id: "CAT-103", customer: "Zaid Birthday", type: "Home Delivery", date: "Nov 10, 2024", status: "Planning" },
  ];

  const quickActions = [
    { label: "New Proposal", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50", action: () => setShowNewProposalModal(true) },
    { label: "Add Menu Item", icon: Utensils, color: "text-muted-foreground", bg: "bg-muted", action: () => setShowAddMenuModal(true) },
    { label: "Inquiries", icon: ClipboardList, color: "text-blue-500", bg: "bg-blue-50", action: () => setShowInquiriesModal(true) },
    { label: "Schedule Staff", icon: Users, color: "text-amber-500", bg: "bg-amber-50", action: () => setShowScheduleStaffModal(true) },
    { label: "Marketing", icon: Star, color: "text-purple-500", bg: "bg-purple-50", action: () => setShowMarketingModal(true) },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted", action: () => setShowSettingsModal(true) },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground">Catering Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your events, menus, and customer proposals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Upcoming Catering Events</CardTitle>
              <Button size="sm" onClick={() => setShowCalendarModal(true)} className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                Full Calendar <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Customer / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Date</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Type</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{event.customer}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{event.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{event.date}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{event.type}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} onClick={action.action} className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Popular Menu Packages</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Traditional Nikah", status: "Popular", val: 95 },
                { name: "Corporate Breakfast", status: "Steady", val: 55, variant: "warning" },
                { name: "Gourmet BBQ", status: "Rising", val: 78 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-primary'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <Utensils className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Need Specialized Help?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Connect with our vendor support team for help with halal supply chain verification.
              </p>
              <Button variant="secondary" onClick={() => setShowContactSupportModal(true)} className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Contact Support</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Recent Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">SK</div>
                  <div>
                    <p className="text-xs font-black text-foreground">Sami Khan</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Proposal Request • 4h ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 italic">
                  "Inquiry for a corporate event on Dec 15th for 200 people. Need fully halal options..."
                </p>
                <Button variant="outline" size="sm" onClick={() => setShowRespondModal(true)} className="w-full rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Respond</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Event Calendar</DialogTitle>
            <DialogDescription>View and manage all scheduled catering events.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Filter Month</Label>
              <Input placeholder="e.g. November 2024" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Type</Label>
              <Input placeholder="e.g. Nikah, Corporate, Birthday" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCalendarModal(false)}>View Calendar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Proposal Modal */}
      <Dialog open={showNewProposalModal} onOpenChange={setShowNewProposalModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create New Proposal</DialogTitle>
            <DialogDescription>Fill in the details to generate a catering proposal.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Client Name</Label>
              <Input placeholder="e.g. Amara Weddings" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Type</Label>
              <Input placeholder="e.g. Nikah, Corporate Lunch" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Guest Count</Label>
              <Input placeholder="e.g. 200" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowNewProposalModal(false)}>Create Proposal</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Menu Item Modal */}
      <Dialog open={showAddMenuModal} onOpenChange={setShowAddMenuModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add Menu Item</DialogTitle>
            <DialogDescription>Add a new dish or package to your catering menu.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Item Name</Label>
              <Input placeholder="e.g. Mutton Biryani" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Category</Label>
              <Input placeholder="e.g. Main Course, Starter, Dessert" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Price Per Head (₹)</Label>
              <Input placeholder="e.g. 450" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowAddMenuModal(false)}>Add Item</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inquiries Modal */}
      <Dialog open={showInquiriesModal} onOpenChange={setShowInquiriesModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Guest Inquiries</DialogTitle>
            <DialogDescription>You have 42 new inquiries awaiting response.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Filter by Priority</Label>
              <Input placeholder="e.g. High, Medium, Low" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Filter by Status</Label>
              <Input placeholder="e.g. Unread, Pending, Responded" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowInquiriesModal(false)}>Go to Inquiries</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Staff Modal */}
      <Dialog open={showScheduleStaffModal} onOpenChange={setShowScheduleStaffModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Schedule Staff</DialogTitle>
            <DialogDescription>Assign staff members to upcoming events and shifts.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event / Shift</Label>
              <Input placeholder="e.g. Amara Wedding – Nov 02" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Staff Member</Label>
              <Input placeholder="e.g. Omar Sheikh" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Shift Time</Label>
              <Input placeholder="e.g. 08:00 AM – 06:00 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowScheduleStaffModal(false)}>Save Schedule</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Marketing Modal */}
      <Dialog open={showMarketingModal} onOpenChange={setShowMarketingModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Marketing & Promotions</DialogTitle>
            <DialogDescription>Boost your visibility and create seasonal campaigns.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Campaign Name</Label>
              <Input placeholder="e.g. Winter Wedding Special" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Discount / Offer</Label>
              <Input placeholder="e.g. ₹5,000 OFF" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowMarketingModal(false)}>Launch Campaign</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Business Settings</DialogTitle>
            <DialogDescription>Update your catering business preferences and configurations.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Business Name</Label>
              <Input placeholder="Your Catering Business" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Contact Email</Label>
              <Input placeholder="contact@yourbusiness.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Service Radius (km)</Label>
              <Input placeholder="e.g. 50" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowSettingsModal(false)}>Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Support Modal */}
      <Dialog open={showContactSupportModal} onOpenChange={setShowContactSupportModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Contact Support</DialogTitle>
            <DialogDescription>Reach out to our vendor support team for halal supply chain assistance.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Subject</Label>
              <Input placeholder="e.g. Halal Certification Query" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Your Message</Label>
              <Input placeholder="Describe your issue..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowContactSupportModal(false)}>Send Message</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Respond Modal */}
      <Dialog open={showRespondModal} onOpenChange={setShowRespondModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Reply to Inquiry</DialogTitle>
            <DialogDescription>Send a response to Sami Khan's proposal request.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Your Reply</Label>
              <Input placeholder="Type your response..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Attach Proposal (optional)</Label>
              <Input placeholder="Proposal reference #" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowRespondModal(false)}>Send Reply</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
