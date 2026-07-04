"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Receipt } from "lucide-react"

const transactions = [
  { label: "Donation Payout", amount: "+₹45,231", date: "Mar 20, 2026", type: "credit" },
  { label: "Platform Fee", amount: "-₹450", date: "Mar 20, 2026", type: "debit" },
  { label: "Donation Payout", amount: "+₹38,900", date: "Feb 20, 2026", type: "credit" },
]

export default function MosqueWalletPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Wallet & Payouts</h1>
        <p className="text-sm font-bold text-muted-foreground">Manage your masjid&apos;s donation payouts.</p>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-soft-lg bg-gradient-to-br from-teal-600 to-teal-400 text-white">
        <CardContent className="p-8 space-y-4">
          <p className="text-xs font-black uppercase tracking-widest opacity-80">Available Balance</p>
          <p className="text-5xl font-black">₹1,24,500</p>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="rounded-full"><ArrowDownToLine className="h-4 w-4 mr-2" />Withdraw</Button>
            <Button variant="secondary" className="rounded-full"><Receipt className="h-4 w-4 mr-2" />Statements</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Recent Transactions</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {transactions.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  {t.type === "credit" ? <ArrowDownToLine className="h-4 w-4 text-primary" /> : <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
              </div>
              <span className={`text-sm font-black ${t.type === "credit" ? "text-primary" : "text-muted-foreground"}`}>{t.amount}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
