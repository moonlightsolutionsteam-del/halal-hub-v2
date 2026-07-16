"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Loader2, AlertCircle, Lock, Unlock, RefreshCw, MapPin, Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePrayerSettings } from "@/lib/prayer-context"
import { getQiblaDirection, type QiblaData } from "@/lib/ummah-api"

function deg(n: number) { return ((n % 360) + 360) % 360 }

export default function QiblaPage() {
  const { settings } = usePrayerSettings()
  const [qibla, setQibla] = useState<QiblaData | null>(null)
  const [qiblaLoading, setQiblaLoading] = useState(true)
  const [qiblaError, setQiblaError] = useState<string | null>(null)

  const [heading, setHeading] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [sensorError, setSensorError] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [lockedHeading, setLockedHeading] = useState<number | null>(null)
  const [calibrating, setCalibrating] = useState(false)
  const [permissionState, setPermissionState] = useState<"idle" | "requesting" | "granted" | "denied">("idle")

  const latestHeading = useRef<number | null>(null)

  // Fetch qibla direction
  useEffect(() => {
    setQiblaLoading(true)
    getQiblaDirection(settings.latitude, settings.longitude)
      .then(setQibla)
      .catch(() => setQiblaError("Could not load Qibla direction. Check your location settings."))
      .finally(() => setQiblaLoading(false))
  }, [settings.latitude, settings.longitude])

  const startCompass = useCallback(() => {
    if (typeof window === "undefined") return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // iOS uses webkitCompassHeading; Android uses 360-alpha
      const h = (e as any).webkitCompassHeading != null
        ? (e as any).webkitCompassHeading
        : e.alpha != null
        ? deg(360 - e.alpha)
        : null

      if (h === null) return
      latestHeading.current = h
      if (!locked) {
        setHeading(h)
        if ((e as any).webkitCompassAccuracy != null) {
          setAccuracy((e as any).webkitCompassAccuracy)
        }
      }
    }

    // iOS 13+ requires explicit permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      setPermissionState("requesting")
      ;(DeviceOrientationEvent as any).requestPermission()
        .then((res: string) => {
          if (res === "granted") {
            setPermissionState("granted")
            window.addEventListener("deviceorientationabsolute", handleOrientation, true)
            window.addEventListener("deviceorientation", handleOrientation, true)
          } else {
            setPermissionState("denied")
            setSensorError("Motion sensor permission denied. Try refreshing the page.")
          }
        })
        .catch(() => {
          setPermissionState("denied")
          setSensorError("Could not request motion permission.")
        })
    } else {
      // Android / desktop
      setPermissionState("granted")
      window.addEventListener("deviceorientationabsolute", handleOrientation, true)
      window.addEventListener("deviceorientation", handleOrientation, true)
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true)
      window.removeEventListener("deviceorientation", handleOrientation, true)
    }
  }, [locked])

  useEffect(() => {
    const cleanup = startCompass()
    return cleanup
  }, [startCompass])

  const handleLock = () => {
    if (locked) {
      setLocked(false)
      setLockedHeading(null)
    } else {
      setLocked(true)
      setLockedHeading(latestHeading.current)
    }
  }

  const handleCalibrate = () => {
    setCalibrating(true)
    setTimeout(() => setCalibrating(false), 3000)
  }

  const activeHeading = locked ? lockedHeading : heading
  const arrowRotation = qibla && activeHeading !== null
    ? deg(qibla.qibla_direction - activeHeading)
    : 0

  const isAligned = activeHeading !== null && qibla &&
    Math.abs(deg(qibla.qibla_direction - activeHeading)) < 5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 md:p-8 max-w-lg mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Compass className="h-7 w-7 text-primary" />Qibla Direction
          </h1>
          <p className="text-sm font-bold text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />{settings.locationName}
          </p>
        </div>

        {qiblaLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-bold">Loading Qibla data…</span>
          </div>
        )}

        {qiblaError && (
          <Card className="border-destructive/40">
            <CardContent className="p-5 flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-bold">{qiblaError}</p>
            </CardContent>
          </Card>
        )}

        {/* iOS permission prompt */}
        {permissionState === "idle" && !sensorError && (
          <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5">
            <CardContent className="p-6 text-center space-y-4">
              <Compass className="h-12 w-12 text-primary mx-auto" />
              <div>
                <p className="text-base font-black text-foreground">Enable Live Compass</p>
                <p className="text-sm text-muted-foreground mt-1">Tap below to allow motion sensor access for the live Qibla compass.</p>
              </div>
              <Button onClick={startCompass} className="rounded-full font-bold">
                <Compass className="h-4 w-4 mr-2" />Enable Compass
              </Button>
            </CardContent>
          </Card>
        )}

        {sensorError && (
          <Card className="rounded-[2rem] border-orange-200/60 dark:border-orange-800/40">
            <CardContent className="p-5 space-y-3 text-center">
              <AlertCircle className="h-8 w-8 text-orange-500 mx-auto" />
              <p className="text-sm font-bold text-foreground">{sensorError}</p>
              <p className="text-xs text-muted-foreground">The static compass below still shows your Qibla direction.</p>
              <Button variant="outline" size="sm" onClick={() => { setSensorError(null); setPermissionState("idle") }} className="rounded-full">
                <RefreshCw className="h-4 w-4 mr-2" />Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main compass */}
        {qibla && (
          <Card className={cn(
            "rounded-[2.5rem] border-none shadow-soft-lg transition-all duration-500 overflow-hidden",
            isAligned && "ring-4 ring-emerald-400 shadow-emerald-200/40 dark:shadow-emerald-900/40"
          )}>
            <CardContent className="p-8 flex flex-col items-center gap-8">
              {/* Compass rose */}
              <div className="relative w-72 h-72">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
                {/* Mid ring */}
                <div className="absolute inset-5 rounded-full border border-dashed border-muted-foreground/20" />
                {/* Inner ring */}
                <div className="absolute inset-12 rounded-full bg-muted/30" />

                {/* Cardinal points */}
                {(["N", "E", "S", "W"] as const).map((d, i) => {
                  const angle = i * 90
                  const rad = (angle * Math.PI) / 180
                  const r = 44
                  const x = 50 + r * Math.sin(rad)
                  const y = 50 - r * Math.cos(rad)
                  return (
                    <div
                      key={d}
                      className={cn(
                        "absolute text-sm font-black",
                        d === "N" ? "text-red-500" : "text-muted-foreground"
                      )}
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      {d}
                    </div>
                  )
                })}

                {/* Degree ticks */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const angle = i * 10
                  const isMajor = i % 9 === 0
                  const rad = (angle * Math.PI) / 180
                  const r1 = isMajor ? 38 : 40
                  const r2 = 42
                  const x1 = 50 + r1 * Math.sin(rad)
                  const y1 = 50 - r1 * Math.cos(rad)
                  const x2 = 50 + r2 * Math.sin(rad)
                  const y2 = 50 - r2 * Math.cos(rad)
                  return (
                    <svg key={i} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={isMajor ? "0.6" : "0.3"} className="text-muted-foreground/30" />
                    </svg>
                  )
                })}

                {/* Qibla arrow — rotates to point toward Kaaba */}
                <div
                  className="absolute inset-0 flex items-start justify-center transition-transform duration-300 ease-out"
                  style={{ transform: `rotate(${arrowRotation}deg)` }}
                >
                  <div className="flex flex-col items-center -mt-2 select-none">
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[28px] border-l-transparent border-r-transparent border-b-primary drop-shadow-md" />
                    <div className="w-2 h-16 bg-primary/30 rounded-b-full -mt-1" />
                    <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 whitespace-nowrap">
                      KAABA ✦
                    </span>
                  </div>
                </div>

                {/* Centre dot + degree */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={cn(
                      "text-3xl font-black tabular-nums transition-colors",
                      isAligned ? "text-emerald-500" : "text-primary"
                    )}>
                      {qibla.qibla_direction}°
                    </div>
                    <div className="text-xs font-bold text-muted-foreground">{qibla.compass_bearing}</div>
                  </div>
                </div>

                {/* Alignment glow */}
                {isAligned && (
                  <div className="absolute inset-0 rounded-full bg-emerald-400/10 animate-pulse pointer-events-none" />
                )}
              </div>

              {/* Status row */}
              <div className="w-full space-y-3">
                {isAligned ? (
                  <div className="text-center py-3 rounded-2xl bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-800/40">
                    <p className="text-base font-black text-emerald-600 dark:text-emerald-400">You are facing the Qibla ✦</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Allahu Akbar — remain still</p>
                  </div>
                ) : activeHeading !== null ? (
                  <div className="text-center py-3 rounded-2xl bg-muted/50">
                    <p className="text-sm font-bold text-foreground">
                      Rotate <span className="text-primary">{Math.round(deg(qibla.qibla_direction - activeHeading))}°</span> to face the Qibla
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-3 rounded-2xl bg-muted/50">
                    <p className="text-sm font-bold text-muted-foreground">
                      {permissionState === "granted" ? "Move your device to calibrate…" : "Tap Enable Compass above for live tracking"}
                    </p>
                  </div>
                )}

                {/* Accuracy warning */}
                {accuracy !== null && accuracy > 30 && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-800/40">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      Low accuracy ({accuracy}°) — move away from metal objects and figure-8 your phone to calibrate
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3 w-full">
                <Button
                  variant={locked ? "default" : "outline"}
                  className="flex-1 rounded-full font-bold"
                  onClick={handleLock}
                  disabled={activeHeading === null}
                >
                  {locked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                  {locked ? "Locked" : "Lock"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full font-bold"
                  onClick={handleCalibrate}
                  disabled={calibrating}
                >
                  {calibrating
                    ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Calibrating…</>
                    : <><RefreshCw className="h-4 w-4 mr-2" />Calibrate</>
                  }
                </Button>
              </div>

              {calibrating && (
                <p className="text-xs text-center text-muted-foreground animate-pulse">
                  Wave your device in a figure-8 pattern to improve accuracy
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Info cards */}
        {qibla && (
          <div className="grid grid-cols-2 gap-3">
            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-5 space-y-1 text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Distance</p>
                <p className="text-xl font-black text-foreground">{qibla.distance_km.toLocaleString()} km</p>
                <p className="text-xs text-muted-foreground">{qibla.distance_miles.toLocaleString()} mi</p>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-5 space-y-1 text-center">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Bearing</p>
                <p className="text-xl font-black text-primary">{qibla.qibla_direction}°</p>
                <p className="text-xs text-muted-foreground">{qibla.compass_bearing}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* How-to */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-muted/30">
          <CardContent className="p-5 space-y-3">
            <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">How to use</p>
            <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
              <li>Hold your device flat and level</li>
              <li>Allow motion sensor access if prompted</li>
              <li>Slowly rotate until the arrow points straight up</li>
              <li>Tap <strong>Lock</strong> to freeze the direction while you pray</li>
              <li>Figure-8 your phone to improve compass accuracy</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
