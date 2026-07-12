
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowLeft, ScanLine, Keyboard, Camera, AlertCircle, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { STATUS_CONFIG } from "../data"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type ScanMode = "camera" | "manual"
type ScanState = "idle" | "scanning" | "found" | "not_found" | "error"

export default function ScanPage() {
  const router = useRouter()
  const { user } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const detectorRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)

  const [mode, setMode] = useState<ScanMode>("camera")
  const [state, setState] = useState<ScanState>("idle")
  const [manualCode, setManualCode] = useState("")
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scannedCode, setScannedCode] = useState("")
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (!("BarcodeDetector" in window)) {
      setSupported(false)
      setMode("manual")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setState("idle")
  }, [])

  useEffect(() => () => stopCamera(), [stopCamera])

  async function startCamera() {
    setCameraError(null)
    setState("scanning")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      if (!detectorRef.current) {
        detectorRef.current = new (window as any).BarcodeDetector({
          formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"]
        })
      }

      const detect = async () => {
        if (!videoRef.current || !streamRef.current) return
        try {
          const barcodes = await detectorRef.current.detect(videoRef.current)
          if (barcodes.length > 0) {
            const code = barcodes[0].rawValue
            handleBarcode(code)
            return
          }
        } catch {}
        rafRef.current = requestAnimationFrame(detect)
      }
      rafRef.current = requestAnimationFrame(detect)
    } catch (err: any) {
      setCameraError(err.message || "Camera access denied")
      setState("error")
    }
  }

  async function handleBarcode(code: string) {
    stopCamera()
    setScannedCode(code)
    const supabase = createClient()
    const { data: product } = await (supabase as any)
      .from("halal_products")
      .select("id")
      .eq("barcode", code)
      .maybeSingle()

    if (user?.uid) {
      await (supabase as any).from("product_scans").insert({
        user_id: user.uid,
        barcode: code,
        product_id: product?.id ?? null,
      })
    }

    if (product) {
      setState("found")
      setTimeout(() => router.push(`/halal-check/product/${product.id}`), 800)
    } else {
      setState("not_found")
    }
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!manualCode.trim()) return
    handleBarcode(manualCode.trim())
  }

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto min-h-screen pb-28 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">Barcode Scanner</h1>
          <p className="text-[10px] text-muted-foreground">Scan any product to check its halal status</p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 px-4 pt-4">
        {[
          { id: "camera" as ScanMode, label: "Camera", icon: Camera, disabled: !supported },
          { id: "manual" as ScanMode, label: "Manual Entry", icon: Keyboard, disabled: false },
        ].map(m => (
          <button
            key={m.id}
            disabled={m.disabled}
            onClick={() => { setMode(m.id); stopCamera(); setState("idle"); }}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all",
              mode === m.id ? "bg-primary text-white" : "border border-border/50 text-muted-foreground hover:bg-muted",
              m.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            <m.icon className="h-3.5 w-3.5" />
            {m.label}
          </button>
        ))}
        {!supported && (
          <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Camera scanner not supported in this browser
          </span>
        )}
      </div>

      {/* Camera view */}
      {mode === "camera" && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 space-y-4">
          <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-2 border-border bg-black">
            <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            {state !== "scanning" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
                <ScanLine className="h-12 w-12 text-white/60" />
                <p className="text-white/70 text-xs font-medium">Camera inactive</p>
              </div>
            )}
            {state === "scanning" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-white/80 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/70 animate-pulse" />
                </div>
              </div>
            )}
            {state === "found" && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/80">
                <CheckCircle2 className="h-16 w-16 text-white" />
              </div>
            )}
            {state === "not_found" && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80">
                <XCircle className="h-16 w-16 text-white/60" />
              </div>
            )}
          </div>

          {cameraError && (
            <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 px-4 py-3 rounded-2xl w-full max-w-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {state === "not_found" && scannedCode && (
            <div className="text-center space-y-2 w-full max-w-sm">
              <p className="text-sm font-black text-muted-foreground">Barcode: <span className="text-foreground font-mono">{scannedCode}</span></p>
              <p className="text-xs text-muted-foreground">Product not in our database yet.</p>
            </div>
          )}

          <div className="flex gap-3 w-full max-w-sm">
            {state !== "scanning" ? (
              <button
                onClick={startCamera}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white h-12 rounded-2xl font-black text-sm hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4" /> Start Scanning
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex-1 flex items-center justify-center gap-2 border border-border h-12 rounded-2xl font-black text-sm hover:bg-muted transition-colors"
              >
                Stop
              </button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground text-center max-w-xs">
            Point your camera at the barcode on the product packaging. Works best in good lighting.
          </p>
        </div>
      )}

      {/* Manual entry */}
      {mode === "manual" && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Keyboard className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-base font-black">Enter Barcode</h2>
            <p className="text-xs text-muted-foreground">Type the barcode number found on the product</p>
          </div>
          <form onSubmit={handleManualSubmit} className="w-full max-w-sm space-y-3">
            <Input
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="e.g. 4000400141504"
              className="h-12 rounded-2xl text-center font-mono text-base tracking-widest border-border/60"
              inputMode="numeric"
              autoFocus
            />
            {state === "not_found" && (
              <div className="flex items-center gap-2 text-slate-600 text-xs bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>No product found for barcode <span className="font-mono font-bold">{scannedCode}</span>. Try another or search by name.</span>
              </div>
            )}
            <button
              type="submit"
              disabled={!manualCode.trim()}
              className="w-full h-12 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              {state === "scanning" ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Look Up Product"}
            </button>
          </form>

          <div className="text-center space-y-1">
            <p className="text-[10px] text-muted-foreground">Try these demo barcodes:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { code: "4000400141504", label: "Haribo" },
                { code: "5449000000996", label: "Coca-Cola" },
                { code: "0028400064057", label: "Lay's" },
              ].map(d => (
                <button
                  key={d.code}
                  onClick={() => setManualCode(d.code)}
                  className="px-3 py-1.5 rounded-xl border border-border/50 text-[10px] font-black text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {d.label} ({d.code})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom: search by name link */}
      <div className="px-4 py-3 border-t border-border/30 text-center">
        <p className="text-[10px] text-muted-foreground">
          No barcode? <Link href="/halal-check/product-checker" className="text-primary font-black">Search by name or ingredient instead</Link>
        </p>
      </div>
    </div>
  )
}
