"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Package } from "lucide-react"

const services = [
  { name: "General Consultation", price: "₹500", duration: "30 min" },
  { name: "Follow-up Visit", price: "₹300", duration: "15 min" },
  { name: "First Consultation", price: "₹700", duration: "45 min" },
  { name: "Home Visit", price: "₹1,200", duration: "60 min" },
]

export default function ProfessionalServicesPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Services & Products</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage the services you offer and their pricing.</p>
        </div>
        <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Add Service</Button>
      </div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center shrink-0">
                <Package className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground font-medium">{service.duration}</p>
              </div>
              <span className="text-base font-black text-foreground">{service.price}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
