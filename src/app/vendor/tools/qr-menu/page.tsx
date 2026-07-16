"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Printer, Share2, Loader2, Copy, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function QRMenuGeneratorPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [bizId, setBizId] = useState<string | null>(null)
  const [bizName, setBizName] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses")
      .select("id, name")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: { id: string; name: string }[] | null }) => {
        const biz = data?.[0]
        setBizId(biz?.id ?? null)
        setBizName(biz?.name ?? "")
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const menuUrl = bizId ? `https://halalhub.com/entities/${bizId}` : null
  const qrSrc = menuUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(menuUrl)}&format=svg&color=000000&bgcolor=ffffff&margin=2`
    : null

  async function copyLink() {
    if (!menuUrl) return
    await navigator.clipboard.writeText(menuUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Link copied to clipboard" })
  }

  async function share() {
    if (!menuUrl) return
    if (navigator.share) {
      await navigator.share({ title: bizName, url: menuUrl })
    } else {
      copyLink()
    }
  }

  function download() {
    if (!qrSrc) return
    const link = document.createElement("a")
    link.href = qrSrc
    link.download = `${bizName || "halalhub"}-qr-menu.svg`
    link.click()
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 max-w-3xl pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <QrCode className="h-3 w-3" /> Digital Tools
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">QR Menu</h1>
        <p className="text-muted-foreground font-medium text-sm">
          Share your listing page as a scannable QR code. Customers scan to view your menu, reviews, and booking options.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !bizId ? (
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-8 text-center text-muted-foreground">
            <QrCode className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-bold">Set up your business profile first to generate a QR code.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm flex flex-col items-center p-8 gap-6">
            <div className="relative">
              <div className="bg-white rounded-3xl p-4 shadow-lg border border-border">
                {qrSrc && (
                  <Image
                    src={qrSrc}
                    alt={`QR code for ${bizName}`}
                    width={256}
                    height={256}
                    className="rounded-2xl"
                    unoptimized
                  />
                )}
              </div>
              <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-4 border-background h-8 px-3 rounded-full font-black text-[10px] shadow-xl">LIVE</Badge>
            </div>

            <div className="text-center space-y-1">
              <p className="text-lg font-black text-foreground">{bizName}</p>
              <p className="text-xs text-muted-foreground font-medium break-all max-w-sm">{menuUrl}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 w-full">
              <Button onClick={download} className="rounded-full px-6 font-bold gap-2 flex-1 sm:flex-none">
                <Download className="h-4 w-4" /> Download QR
              </Button>
              <Button onClick={share} variant="outline" className="rounded-full px-6 font-bold gap-2 flex-1 sm:flex-none">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button onClick={copyLink} variant="outline" className="rounded-full px-6 font-bold gap-2 flex-1 sm:flex-none">
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5">
            <CardContent className="p-6 space-y-3">
              <h3 className="font-black text-foreground">How to use your QR code</h3>
              <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                <li className="flex gap-2"><span className="text-primary font-black">1.</span> Download your QR code as SVG (scalable — prints at any size)</li>
                <li className="flex gap-2"><span className="text-primary font-black">2.</span> Print it on table cards, menus, or window stickers</li>
                <li className="flex gap-2"><span className="text-primary font-black">3.</span> Customers scan to view your live HalalHub listing with menus, reviews, and bookings</li>
                <li className="flex gap-2"><span className="text-primary font-black">4.</span> Keep your listing up to date — the QR link never changes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
