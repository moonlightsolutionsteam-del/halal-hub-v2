"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Clock, MapPin, Navigation, Moon, Sun, Sunrise, Sunset,
  ChevronLeft, ChevronRight, Settings, Locate,
  BookOpen, RefreshCw, AlertCircle, Loader2, Heart,
  Utensils, Sparkles, BookMarked, BellRing, Search, X,
  Hash, MessageCircle, Calculator, HandHelping, Gift,
  Compass, Award, CalendarCheck, Users, Shield, ChevronRight as ChevronRightIcon,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePrayerSettings, type CitySearchResult } from "@/lib/prayer-context"
import { useFavoriteDuas } from "@/lib/favorites-context"
import { usePrayerLog, MILESTONE_COINS, type PrayerName } from "@/lib/use-prayer-log"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2, Flame, Building2 } from "lucide-react"
import {
  requestNotificationPermission, registerServiceWorker,
  getNotificationSupport, usePrayerNotifications,
} from "@/lib/use-prayer-notifications"
import {
  getPrayerTimes, getHijriDate, getQiblaDirection, getIslamicEvents,
  getMoonData, getCalculationMethods, getDuaCategories, getDuasByCategory,
  getRandomDua, getRandomHadith, getMonthlyPrayerTimes, getRamadanCalendar,
  getIslamicMonths,
  type PrayerTimesResponse, type HijriDate, type QiblaData,
  type IslamicEventsResponse, type MoonData, type CalculationMethod,
  type DuaCategory, type Dua, type Hadith, type MonthlyPrayerDay,
  type RamadanResponse, type IslamicMonth,
  PRAYER_NAMES, MAIN_PRAYERS,
} from "@/lib/ummah-api"

function formatTime(time24: string | undefined, format: "12h" | "24h"): string {
  if (!time24) return "--:--"
  if (format === "24h") return time24
  const [h, m] = time24.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`
}

function getCountdown(targetISO: string): { hours: number; minutes: number; seconds: number; total: number } {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now())
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    total: diff,
  }
}

function getPrayerIcon(prayer: string) {
  switch (prayer) {
    case "fajr": case "imsak": return <Moon className="h-4 w-4" />
    case "sunrise": return <Sunrise className="h-4 w-4" />
    case "dhuhr": return <Sun className="h-4 w-4" />
    case "asr": return <Sun className="h-4 w-4" />
    case "maghrib": return <Sunset className="h-4 w-4" />
    case "isha": return <Moon className="h-4 w-4" />
    default: return <Clock className="h-4 w-4" />
  }
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

function computeNightTimes(maghribISO: string, nextFajrISO: string) {
  const start = new Date(maghribISO).getTime()
  const end = new Date(nextFajrISO).getTime()
  const nightLength = end - start
  const midnight = new Date(start + nightLength / 2)
  const lastThird = new Date(start + (nightLength * 2) / 3)
  return { midnight, lastThird }
}

function formatClock(date: Date, format: "12h" | "24h", timeZone?: string): string {
  return date.toLocaleTimeString([], {
    hour: format === "12h" ? "numeric" : "2-digit",
    minute: "2-digit",
    hour12: format === "12h",
    timeZone,
  })
}

export default function PrayerTimesPage() {
  const { settings, updateSettings, detectLocation, locationLoading, locationError, searchCity, selectCity } = usePrayerSettings()
  const { favorites, isFavorite, toggleFavorite } = useFavoriteDuas()
  const { todayLog, streak, longestStreak, week, marking, markPrayer, signedIn } = usePrayerLog()
  const { toast } = useToast()
  const { user } = useAuth()
  const [myMosque, setMyMosque] = useState<{ id: string; name: string; jumuah: string | null; city: string | null } | null>(null)

  useEffect(() => {
    if (!user?.uid) { setMyMosque(null); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("user_prayer_settings")
      .select("my_mosque_id")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(async ({ data }: { data: any }) => {
        if (!data?.my_mosque_id) { setMyMosque(null); return }
        const { data: mosque } = await (supabase as any)
          .from("businesses")
          .select("id, name, city, prayer_times")
          .eq("id", data.my_mosque_id)
          .maybeSingle()
        if (mosque) {
          setMyMosque({ id: mosque.id, name: mosque.name, jumuah: mosque.prayer_times?.jumuah ?? null, city: mosque.city })
        }
      })
  }, [user?.uid])

  const handleMarkPrayer = async (prayer: PrayerName) => {
    if (todayLog[prayer] === "prayed") return // already marked
    try {
      const result = await markPrayer(prayer, "prayed")
      if (result?.milestone) {
        toast({
          title: `🔥 ${result.milestone}-Day Prayer Streak!`,
          description: `MashAllah! +${MILESTONE_COINS[result.milestone]} Halal Coins awarded. May Allah accept your worship.`,
        })
      }
    } catch {
      toast({ title: "Could not mark prayer", description: "Please try again.", variant: "destructive" } as any)
    }
  }

  const [citySearch, setCitySearch] = useState("")
  const [citySearchResults, setCitySearchResults] = useState<CitySearchResult[]>([])
  const [citySearching, setCitySearching] = useState(false)

  const [prayerData, setPrayerData] = useState<PrayerTimesResponse | null>(null)
  const [hijriData, setHijriData] = useState<HijriDate | null>(null)
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null)
  const [eventsData, setEventsData] = useState<IslamicEventsResponse | null>(null)
  const [moonData, setMoonData] = useState<MoonData | null>(null)
  const [methods, setMethods] = useState<Record<string, CalculationMethod>>({})
  const [duaCategories, setDuaCategories] = useState<DuaCategory[]>([])
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string>("morning")
  const [showFavorites, setShowFavorites] = useState(false)
  const [duas, setDuas] = useState<Dua[]>([])
  const [dailyDua, setDailyDua] = useState<Dua | null>(null)
  const [hadithOfDay, setHadithOfDay] = useState<Hadith | null>(null)
  const [islamicMonths, setIslamicMonths] = useState<IslamicMonth[]>([])
  const [nightTimes, setNightTimes] = useState<{ midnight: Date; lastThird: Date } | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, total: 0 })
  const [calendarDays, setCalendarDays] = useState<MonthlyPrayerDay[]>([])
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [calendarLoading, setCalendarLoading] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const [ramadanData, setRamadanData] = useState<RamadanResponse | null>(null)
  const [ramadanLoading, setRamadanLoading] = useState(false)
  const [ramadanError, setRamadanError] = useState<string | null>(null)

  const [notifPermission, setNotifPermission] = useState<string>("default")

  useEffect(() => {
    if (getNotificationSupport()) setNotifPermission(Notification.permission)
  }, [])

  usePrayerNotifications(settings.notifications && notifPermission === "granted", prayerData)

  useEffect(() => {
    if (!citySearch.trim()) {
      setCitySearchResults([])
      return
    }
    setCitySearching(true)
    const id = setTimeout(async () => {
      const results = await searchCity(citySearch)
      setCitySearchResults(results)
      setCitySearching(false)
    }, 400)
    return () => clearTimeout(id)
  }, [citySearch, searchCity])

  const handleSelectCity = (result: CitySearchResult) => {
    selectCity(result)
    setCitySearch("")
    setCitySearchResults([])
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const tomorrowDate = tomorrow.toISOString().split("T")[0]

      const [prayer, hijri, qibla, events, moon, calcMethods, duaCats, randomDua, randomHadith, monthsData, tomorrowPrayer] = await Promise.all([
        getPrayerTimes(settings.latitude, settings.longitude, settings.method, settings.madhab),
        getHijriDate(),
        getQiblaDirection(settings.latitude, settings.longitude),
        getIslamicEvents(),
        getMoonData(),
        getCalculationMethods(),
        getDuaCategories(),
        getRandomDua(),
        getRandomHadith(),
        getIslamicMonths(),
        getPrayerTimes(settings.latitude, settings.longitude, settings.method, settings.madhab, tomorrowDate),
      ])
      setPrayerData(prayer)
      setHijriData(hijri)
      setQiblaData(qibla)
      setEventsData(events)
      setMoonData(moon)
      setMethods(calcMethods)
      setDuaCategories(duaCats)
      setDailyDua(randomDua)
      setHadithOfDay(randomHadith)
      setIslamicMonths(monthsData.months)
      setNightTimes(computeNightTimes(prayer.prayer_datetimes.maghrib, tomorrowPrayer.prayer_datetimes.fajr))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prayer data")
    } finally {
      setLoading(false)
    }
  }, [settings.latitude, settings.longitude, settings.method, settings.madhab])

  useEffect(() => { loadData() }, [loadData])

  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const permission = await requestNotificationPermission()
      setNotifPermission(permission)
      if (permission === "granted") {
        await registerServiceWorker()
        updateSettings({ notifications: true })
      }
    } else {
      updateSettings({ notifications: false })
    }
  }

  useEffect(() => {
    if (!prayerData?.prayer_datetimes) return
    const tick = () => {
      const nextPrayer = prayerData.current_status.next_prayer
      const nextTime = prayerData.prayer_datetimes[nextPrayer]
      if (nextTime) setCountdown(getCountdown(nextTime))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [prayerData])

  useEffect(() => {
    if (selectedDuaCategory) {
      getDuasByCategory(selectedDuaCategory).then(setDuas).catch(() => setDuas([]))
    }
  }, [selectedDuaCategory])

  const loadCalendar = useCallback(async () => {
    setCalendarLoading(true)
    try {
      const { year, month } = calendarMonth
      const result = await getMonthlyPrayerTimes(settings.latitude, settings.longitude, year, month + 1, settings.method, settings.madhab)
      setCalendarDays(result.days)
    } catch {
      setCalendarDays([])
    } finally {
      setCalendarLoading(false)
    }
  }, [calendarMonth, settings.latitude, settings.longitude, settings.method, settings.madhab])

  useEffect(() => {
    setCalendarDays([])
  }, [calendarMonth])

  const loadRamadan = useCallback(async () => {
    setRamadanLoading(true)
    setRamadanError(null)
    try {
      const result = await getRamadanCalendar(settings.latitude, settings.longitude, settings.method, settings.madhab)
      setRamadanData(result)
    } catch (err) {
      setRamadanError(err instanceof Error ? err.message : "Failed to load Ramadan calendar")
    } finally {
      setRamadanLoading(false)
    }
  }, [settings.latitude, settings.longitude, settings.method, settings.madhab])

  const methodOptions = useMemo(() => {
    const unique = new Map<string, { key: string; name: string; description: string }>()
    for (const [key, val] of Object.entries(methods)) {
      if (!["Hanafi", "Shafi", "Maliki", "Hanbali", "ISNA", "Diyanet"].includes(key)) {
        unique.set(key, { key, name: val.name, description: val.description })
      }
    }
    return Array.from(unique.values())
  }, [methods])

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 md:col-span-2" />
          <Skeleton className="h-48" />
        </div>
        <Skeleton className="h-64" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Card className="border-destructive/50">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold text-foreground">Unable to load prayer data</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={loadData} variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentPrayer = prayerData?.current_status.current_prayer || ""
  const nextPrayer = prayerData?.current_status.next_prayer || ""

  let prayerProgress = 0
  if (prayerData) {
    const startISO = prayerData.prayer_datetimes[currentPrayer]
    const endISO = prayerData.prayer_datetimes[nextPrayer]
    if (startISO && endISO) {
      const startMs = new Date(startISO).getTime()
      let endMs = new Date(endISO).getTime()
      if (endMs <= startMs) endMs += 24 * 3600000
      prayerProgress = Math.min(100, Math.max(0, ((Date.now() - startMs) / (endMs - startMs)) * 100))
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight">Prayer Times</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-bold">
              <MapPin className="h-3.5 w-3.5" />{settings.locationName}
            </span>
            {hijriData && (
              <Badge variant="secondary" className="font-bold text-xs">
                {hijriData.hijri.formatted}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={detectLocation} disabled={locationLoading} className="rounded-full">
            {locationLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Locate className="h-4 w-4 mr-1" />}
            Detect
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSettingsOpen(!settingsOpen)} className="rounded-full">
            <Settings className="h-4 w-4 mr-1" />Settings
          </Button>
        </div>
      </div>

      {locationError && (
        <div className="flex items-center justify-between gap-2 text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-xl">
          <span>{locationError} — search for your city below instead.</span>
        </div>
      )}

      {/* Settings panel — glass surface, matches floating overlay treatment */}
      {settingsOpen && (
        <Card className="glass-strong rounded-3xl border border-border/60 shadow-soft-lg animate-in fade-in slide-in-from-top-2 duration-250">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-black text-lg text-foreground">Prayer Settings</h3>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder={`Search for a city (current: ${settings.locationName})`}
                  className="pl-9 pr-9 rounded-xl"
                />
                {citySearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
                {!citySearching && citySearch && (
                  <button onClick={() => { setCitySearch(""); setCitySearchResults([]) }} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              {citySearchResults.length > 0 && (
                <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
                  {citySearchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectCity(result)}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{result.name}</span>
                    </button>
                  ))}
                </div>
              )}
              {citySearch.trim() && !citySearching && citySearchResults.length === 0 && (
                <p className="text-xs text-muted-foreground px-1">No cities found matching &ldquo;{citySearch}&rdquo;</p>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Calculation Method</label>
                <Select value={settings.method} onValueChange={(v) => updateSettings({ method: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {methodOptions.map((m) => (
                      <SelectItem key={m.key} value={m.key}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Madhab (Asr)</label>
                <Select value={settings.madhab} onValueChange={(v) => updateSettings({ madhab: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shafi">Shafi / Maliki / Hanbali</SelectItem>
                    <SelectItem value="Hanafi">Hanafi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Time Format</label>
                <Select value={settings.timeFormat} onValueChange={(v) => updateSettings({ timeFormat: v as "12h" | "24h" })}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <BellRing className="h-3.5 w-3.5" />Prayer Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  {notifPermission === "denied"
                    ? "Blocked in browser settings"
                    : notifPermission === "unsupported"
                    ? "Not supported on this device"
                    : "Get notified before each prayer"}
                </p>
              </div>
              <Switch
                checked={settings.notifications && notifPermission === "granted"}
                onCheckedChange={handleNotificationToggle}
                disabled={notifPermission === "denied" || notifPermission === "unsupported"}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="w-full flex justify-center gap-1 rounded-full h-12 p-1 bg-muted/50 max-w-xs mx-auto">
          <TabsTrigger value="today" className="rounded-full text-sm font-bold flex-1">Today</TabsTrigger>
          <TabsTrigger value="tools" className="rounded-full text-sm font-bold flex-1">✦ Tools</TabsTrigger>
        </TabsList>

        {/* ─── TODAY TAB ─── */}
        <TabsContent value="today" className="space-y-6 mt-6">
          {/* Next prayer hero — mosque-inspired ambient gradient */}
          <Card className="relative overflow-hidden border-none rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-emerald-400 text-white shadow-soft-lg">
            {/* ambient glow */}
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
            {/* mosque arch silhouette */}
            <svg className="absolute right-0 bottom-0 h-full w-40 opacity-[0.08]" viewBox="0 0 160 200" fill="none" preserveAspectRatio="xMaxYMax slice">
              <path d="M80 0C40 0 20 40 20 80V200H140V80C140 40 120 0 80 0Z" fill="white" />
            </svg>
            <div className="absolute top-6 right-6 opacity-15">
              <Moon className="h-24 w-24" />
            </div>
            <CardContent className="relative p-8 space-y-5">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest opacity-80">
                <Clock className="h-4 w-4" />
                Next Prayer: {PRAYER_NAMES[nextPrayer] || nextPrayer}
              </div>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black tabular-nums drop-shadow-sm">
                  {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>

              {/* animated prayer-window progress */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/80 transition-[width] duration-1000 ease-linear"
                    style={{ width: `${prayerProgress}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {PRAYER_NAMES[currentPrayer]} window · {Math.round(prayerProgress)}% elapsed
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-sm pt-1">
                {prayerData && (
                  <span className="bg-white/15 backdrop-blur-md ring-1 ring-white/20 px-4 py-1.5 rounded-full font-bold">
                    {PRAYER_NAMES[nextPrayer]} at {formatTime(prayerData.prayer_times[nextPrayer as keyof typeof prayerData.prayer_times], settings.timeFormat)}
                  </span>
                )}
                {moonData && (
                  <span className="bg-white/15 backdrop-blur-md ring-1 ring-white/20 px-4 py-1.5 rounded-full font-bold">
                    🌙 {moonData.moon.phase}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Prayer schedule + info sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Schedule */}
            <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-black">Today&apos;s Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-1">
                  {prayerData && (["imsak", "fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const).map((key) => {
                    const time = prayerData.prayer_times[key as keyof typeof prayerData.prayer_times]
                    if (!time) return null
                    const isCurrent = currentPrayer === key
                    const isNext = nextPrayer === key
                    const isMainPrayer = MAIN_PRAYERS.includes(key as typeof MAIN_PRAYERS[number])
                    return (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all",
                          isCurrent && "bg-primary/10 ring-1 ring-primary/20",
                          isNext && !isCurrent && "bg-accent/50",
                          !isMainPrayer && "opacity-70"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center",
                            isCurrent ? "bg-primary text-white" : isNext ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {getPrayerIcon(key)}
                          </div>
                          <div>
                            <span className={cn("text-sm font-bold", isCurrent && "text-primary", !isCurrent && "text-foreground")}>
                              {PRAYER_NAMES[key]}
                            </span>
                            {isCurrent && <Badge variant="default" className="ml-2 text-[10px] px-1.5 py-0 bg-primary">NOW</Badge>}
                            {isNext && !isCurrent && <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0">NEXT</Badge>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn("font-mono text-sm font-bold tabular-nums", isCurrent ? "text-primary" : "text-foreground")}>
                            {formatTime(time, settings.timeFormat)}
                          </span>
                          {isMainPrayer && signedIn && (
                            <button
                              onClick={() => handleMarkPrayer(key as PrayerName)}
                              disabled={marking === key}
                              title={todayLog[key as PrayerName] === "prayed" ? "Prayed — Alhamdulillah" : "Mark as prayed"}
                              className={cn(
                                "rounded-full p-1 transition-all",
                                todayLog[key as PrayerName] === "prayed"
                                  ? "text-emerald-500"
                                  : "text-muted-foreground/30 hover:text-primary hover:scale-110"
                              )}
                            >
                              {marking === key
                                ? <Loader2 className="h-5 w-5 animate-spin" />
                                : <CheckCircle2 className={cn("h-5 w-5", todayLog[key as PrayerName] === "prayed" && "fill-emerald-100 dark:fill-emerald-950")} />
                              }
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Info sidebar */}
            <div className="space-y-4">
              {/* Prayer streak card (blueprint §9) */}
              {signedIn && (
                <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-br from-amber-500/10 to-orange-500/5">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prayer Streak</p>
                      <Flame className={cn("h-4 w-4", streak > 0 ? "text-orange-500" : "text-muted-foreground/30")} />
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-foreground tabular-nums">{streak}</span>
                      <span className="text-sm font-bold text-muted-foreground pb-1">{streak === 1 ? "day" : "days"}</span>
                      {longestStreak > streak && (
                        <span className="text-[10px] font-bold text-muted-foreground/60 pb-1.5 ml-auto">Best: {longestStreak}</span>
                      )}
                    </div>
                    {/* Last 7 days dots */}
                    <div className="flex items-center justify-between pt-1">
                      {week.map(({ date, prayedCount }) => {
                        const dayLetter = ["S", "M", "T", "W", "T", "F", "S"][new Date(date + "T12:00:00").getDay()]
                        return (
                          <div key={date} className="flex flex-col items-center gap-1">
                            <div
                              className={cn(
                                "h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black transition-colors",
                                prayedCount >= 5 ? "bg-emerald-500 text-white"
                                : prayedCount > 0 ? "bg-emerald-500/25 text-emerald-700 dark:text-emerald-400"
                                : "bg-muted text-muted-foreground/50"
                              )}
                            >
                              {prayedCount > 0 ? prayedCount : ""}
                            </div>
                            <span className="text-[8px] font-bold text-muted-foreground/60">{dayLetter}</span>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      {streak === 0
                        ? "Mark your prayers above to start a streak today."
                        : "Mark at least 5 prayers daily to keep your streak."}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* My Mosque card (blueprint §7.3) */}
              {myMosque && (
                <Link href={`/entities/${myMosque.id}`} className="block">
                  <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">My Mosque</p>
                      </div>
                      <p className="text-base font-black text-foreground leading-tight">{myMosque.name}</p>
                      {myMosque.city && <p className="text-xs text-muted-foreground font-medium">{myMosque.city}</p>}
                      {myMosque.jumuah && (
                        <div className="flex items-center justify-between pt-1 border-t border-border mt-2">
                          <span className="text-xs font-bold text-muted-foreground">Jumu'ah</span>
                          <span className="text-sm font-black text-primary tabular-nums">{myMosque.jumuah}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )}

              {/* Islamic date card */}
              {hijriData && (
                <Card className="rounded-[2rem] border-none shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Islamic Date</p>
                    <div>
                      <p className="text-2xl font-black text-foreground">{hijriData.hijri.day} {hijriData.hijri.month_name}</p>
                      <p className="text-base font-bold text-primary">{hijriData.hijri.year} AH</p>
                      <p className="text-lg font-bold text-muted-foreground mt-1" dir="rtl">{hijriData.hijri.month_name_arabic}</p>
                    </div>
                    <div className="text-xs text-muted-foreground font-bold">{hijriData.gregorian.formatted}</div>
                  </CardContent>
                </Card>
              )}

              {/* Moon phase */}
              {moonData && (
                <Card className="rounded-[2rem] border-none shadow-sm">
                  <CardContent className="p-5 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Moon Phase</p>
                    <p className="text-lg font-black text-foreground">{moonData.moon.phase}</p>
                    <p className="text-sm text-muted-foreground">{moonData.moon.illumination_pct}% illuminated</p>
                    {moonData.hijri.is_sacred_month && (
                      <Badge variant="secondary" className="text-[10px]">Sacred Month</Badge>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Night times */}
              {nightTimes && (
                <Card className="rounded-[2rem] border-none shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Night Times</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-foreground">Islamic Midnight</span>
                      <span className="font-mono font-bold text-primary">{formatClock(nightTimes.midnight, settings.timeFormat, prayerData?.timezone)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-foreground">Last Third of Night</span>
                      <span className="font-mono font-bold text-primary">{formatClock(nightTimes.lastThird, settings.timeFormat, prayerData?.timezone)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Daily dua */}
              {dailyDua && (
                <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Daily Dua</p>
                      <button onClick={() => toggleFavorite(dailyDua)} className="shrink-0">
                        <Heart className={cn("h-4 w-4", isFavorite(dailyDua.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
                      </button>
                    </div>
                    <p className="text-right text-lg leading-loose font-bold text-foreground" dir="rtl">{dailyDua.arabic}</p>
                    <p className="text-xs italic text-muted-foreground">{dailyDua.translation}</p>
                    <p className="text-[10px] font-bold text-muted-foreground">{dailyDua.source}</p>
                  </CardContent>
                </Card>
              )}

              {/* Hadith of the day */}
              {hadithOfDay && (
                <Card className="rounded-[2rem] border-none shadow-sm bg-amber-500/5">
                  <CardContent className="p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Hadith of the Day</p>
                    <p className="text-sm text-foreground leading-relaxed">&ldquo;{hadithOfDay.english}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">{hadithOfDay.collection_name} #{hadithOfDay.hadithnumber}</p>
                      {hadithOfDay.grade && <Badge variant="secondary" className="text-[9px]">{hadithOfDay.grade}</Badge>}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next event */}
              {eventsData?.next_event && (
                <Card className="rounded-[2rem] border-none shadow-sm">
                  <CardContent className="p-5 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Upcoming Event</p>
                    <p className="text-base font-black text-foreground">{eventsData.next_event.name}</p>
                    <p className="text-xs font-bold text-primary">{eventsData.next_event.hijri_date}</p>
                  </CardContent>
                </Card>
              )}

              {/* Spiritual tools (migrated from V1) */}
              <Card className="rounded-[2rem] border-none shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Spiritual Tools</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Tasbeeh", href: "/prayer/tasbeeh" },
                      { label: "Jummah", href: "/prayer/jummah" },
                      { label: "Ask Imam", href: "/prayer/ask-imam" },
                      { label: "Appointments", href: "/prayer/appointments" },
                      { label: "Hajj Hub", href: "/prayer/hajj" },
                      { label: "Shahadah", href: "/prayer/shahadah" },
                      { label: "Donate", href: "/prayer/donation" },
                      { label: "Quran", href: "/quran" },
                    ].map((t) => (
                      <Link key={t.href} href={t.href} className="press text-center text-xs font-bold text-foreground bg-muted/60 hover:bg-primary/10 hover:text-primary rounded-xl px-3 py-2.5 transition-colors duration-200">
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ─── SPIRITUAL TOOLS TAB ─── */}
        <TabsContent value="tools" className="mt-6 space-y-8">

          {/* Hero banner */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-emerald-400 text-white p-7 shadow-soft-lg">
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute top-5 right-6 opacity-[0.08]">
              <Moon className="h-28 w-28" />
            </div>
            <div className="relative space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-75">Your Faith Companion</p>
              <h2 className="text-2xl font-black leading-tight">Spiritual Tools &amp; Resources</h2>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Everything you need for daily ibadah, Quran, giving, and Islamic guidance — all in one place.
              </p>
            </div>
          </div>

          {/* ── SALAH & IBADAH ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Salah &amp; Ibadah</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Tasbeeh Counter",
                  desc: "Digital dhikr beads",
                  href: "/prayer/tasbeeh",
                  icon: Hash,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 dark:bg-emerald-950/30",
                  accent: "border-emerald-200/60 dark:border-emerald-800/40",
                },
                {
                  label: "Jummah Guide",
                  desc: "Friday prayer times & sunnah",
                  href: "/prayer/jummah",
                  icon: Moon,
                  color: "text-indigo-600",
                  bg: "bg-indigo-50 dark:bg-indigo-950/30",
                  accent: "border-indigo-200/60 dark:border-indigo-800/40",
                },
                {
                  label: "Book Appointment",
                  desc: "Schedule with local imams",
                  href: "/prayer/appointments",
                  icon: CalendarCheck,
                  color: "text-sky-600",
                  bg: "bg-sky-50 dark:bg-sky-950/30",
                  accent: "border-sky-200/60 dark:border-sky-800/40",
                },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <div className={cn(
                    "rounded-2xl border p-4 space-y-3 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 bg-card",
                    tool.accent
                  )}>
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", tool.bg)}>
                      <tool.icon className={cn("h-5 w-5", tool.color)} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-foreground leading-tight">{tool.label}</p>
                      <p className="text-[10px] font-medium text-muted-foreground leading-snug">{tool.desc}</p>
                    </div>
                    <div className={cn("flex items-center gap-1 text-[10px] font-black", tool.color)}>
                      Open <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── QURAN & KNOWLEDGE ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quran &amp; Knowledge</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Quran",
                  desc: "Read, listen & search the Quran",
                  href: "/quran",
                  icon: BookOpen,
                  color: "text-amber-600",
                  bg: "bg-amber-50 dark:bg-amber-950/30",
                  accent: "border-amber-200/60 dark:border-amber-800/40",
                  featured: true,
                },
                {
                  label: "Duas Library",
                  desc: "Morning, evening & occasion duas",
                  href: "/prayer-times#duas",
                  icon: Heart,
                  color: "text-rose-600",
                  bg: "bg-rose-50 dark:bg-rose-950/30",
                  accent: "border-rose-200/60 dark:border-rose-800/40",
                },
                {
                  label: "Ask an Imam",
                  desc: "Get answers to Islamic questions",
                  href: "/prayer/ask-imam",
                  icon: MessageCircle,
                  color: "text-purple-600",
                  bg: "bg-purple-50 dark:bg-purple-950/30",
                  accent: "border-purple-200/60 dark:border-purple-800/40",
                },
                {
                  label: "Choose an Imam",
                  desc: "Browse local Islamic scholars",
                  href: "/prayer/choose-imam",
                  icon: Users,
                  color: "text-teal-600",
                  bg: "bg-teal-50 dark:bg-teal-950/30",
                  accent: "border-teal-200/60 dark:border-teal-800/40",
                },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <div className={cn(
                    "rounded-2xl border p-4 space-y-3 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 bg-card",
                    tool.accent,
                    (tool as { featured?: boolean }).featured && "sm:col-span-1 ring-1 ring-amber-300/40 dark:ring-amber-700/30"
                  )}>
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", tool.bg)}>
                      <tool.icon className={cn("h-5 w-5", tool.color)} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-foreground leading-tight">{tool.label}</p>
                      <p className="text-[10px] font-medium text-muted-foreground leading-snug">{tool.desc}</p>
                    </div>
                    <div className={cn("flex items-center gap-1 text-[10px] font-black", tool.color)}>
                      Open <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── ZAKAT & GIVING ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-rose-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Zakat &amp; Giving</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Zakat Calculator",
                  desc: "Calculate your annual obligation",
                  href: "/zakat",
                  icon: Calculator,
                  color: "text-orange-600",
                  bg: "bg-orange-50 dark:bg-orange-950/30",
                  accent: "border-orange-200/60 dark:border-orange-800/40",
                },
                {
                  label: "Charity",
                  desc: "Donate to verified causes",
                  href: "/charity",
                  icon: Heart,
                  color: "text-red-600",
                  bg: "bg-red-50 dark:bg-red-950/30",
                  accent: "border-red-200/60 dark:border-red-800/40",
                },
                {
                  label: "Volunteer",
                  desc: "Give your time to the ummah",
                  href: "/volunteer",
                  icon: HandHelping,
                  color: "text-green-600",
                  bg: "bg-green-50 dark:bg-green-950/30",
                  accent: "border-green-200/60 dark:border-green-800/40",
                },
                {
                  label: "Sadaqah Jariyah",
                  desc: "Ongoing charity & mosque donations",
                  href: "/prayer/donation",
                  icon: Gift,
                  color: "text-pink-600",
                  bg: "bg-pink-50 dark:bg-pink-950/30",
                  accent: "border-pink-200/60 dark:border-pink-800/40",
                },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <div className={cn(
                    "rounded-2xl border p-4 space-y-3 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 bg-card",
                    tool.accent
                  )}>
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", tool.bg)}>
                      <tool.icon className={cn("h-5 w-5", tool.color)} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-foreground leading-tight">{tool.label}</p>
                      <p className="text-[10px] font-medium text-muted-foreground leading-snug">{tool.desc}</p>
                    </div>
                    <div className={cn("flex items-center gap-1 text-[10px] font-black", tool.color)}>
                      Open <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── HAJJ & SACRED JOURNEY ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-indigo-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hajj &amp; Sacred Journey</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                {
                  label: "Hajj Hub",
                  desc: "Guides, packages & preparation",
                  href: "/prayer/hajj",
                  icon: Compass,
                  color: "text-indigo-600",
                  bg: "bg-indigo-50 dark:bg-indigo-950/30",
                  accent: "border-indigo-200/60 dark:border-indigo-800/40",
                },
                {
                  label: "Hajj Certification",
                  desc: "Apply for official certification",
                  href: "/prayer/hajj-certification",
                  icon: Award,
                  color: "text-yellow-600",
                  bg: "bg-yellow-50 dark:bg-yellow-950/30",
                  accent: "border-yellow-200/60 dark:border-yellow-800/40",
                },
                {
                  label: "Shahadah",
                  desc: "Support & witness new Muslims",
                  href: "/prayer/shahadah",
                  icon: Shield,
                  color: "text-primary",
                  bg: "bg-primary/10",
                  accent: "border-primary/20",
                },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className="group">
                  <div className={cn(
                    "rounded-2xl border p-4 space-y-3 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 bg-card",
                    tool.accent
                  )}>
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", tool.bg)}>
                      <tool.icon className={cn("h-5 w-5", tool.color)} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-foreground leading-tight">{tool.label}</p>
                      <p className="text-[10px] font-medium text-muted-foreground leading-snug">{tool.desc}</p>
                    </div>
                    <div className={cn("flex items-center gap-1 text-[10px] font-black", tool.color)}>
                      Open <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── QIBLA DIRECTION ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-sky-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Qibla Direction</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center space-y-6">
                {qiblaData && (
                  <>
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                      <div className="absolute inset-0 rounded-full border-[6px] border-primary/10" />
                      <div className="absolute inset-3 rounded-full border border-dashed border-muted-foreground/20" />
                      {["N", "E", "S", "W"].map((dir, i) => {
                        const angle = i * 90
                        const rad = (angle * Math.PI) / 180
                        const r = 46
                        const x = 50 + r * Math.sin(rad)
                        const y = 50 - r * Math.cos(rad)
                        return (
                          <div key={dir} className="absolute text-xs font-black text-muted-foreground" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                            {dir}
                          </div>
                        )
                      })}
                      <div className="absolute inset-0 flex items-start justify-center transition-transform duration-700 ease-out" style={{ transform: `rotate(${qiblaData.qibla_direction}deg)` }}>
                        <div className="flex flex-col items-center -mt-3">
                          <Navigation className="h-7 w-7 text-primary fill-primary" />
                          <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-0.5">QIBLA</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-black text-primary">{qiblaData.qibla_direction}°</div>
                          <div className="text-xs font-bold text-muted-foreground">{qiblaData.compass_bearing}</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-muted/50 p-4 rounded-2xl text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Distance to Kaaba</p>
                        <p className="text-base font-black text-foreground">{qiblaData.distance_km.toLocaleString()} km</p>
                        <p className="text-xs text-muted-foreground">{qiblaData.distance_miles.toLocaleString()} mi</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-2xl text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Your Location</p>
                        <p className="text-sm font-bold text-foreground">{settings.locationName}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </section>

          {/* ── MONTHLY PRAYER TIMES ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-violet-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monthly Prayer Times</p>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCalendarMonth((p) => { const d = new Date(p.year, p.month - 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-base font-black text-foreground">
                {new Date(calendarMonth.year, calendarMonth.month).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </h3>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCalendarMonth((p) => { const d = new Date(p.year, p.month + 1, 1); return { year: d.getFullYear(), month: d.getMonth() } })}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={loadCalendar} disabled={calendarLoading}>
              {calendarLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <RefreshCw className="h-4 w-4 mr-1" />}
              Load Times
            </Button>
            {calendarLoading && (
              <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
            )}
            {!calendarLoading && calendarDays.length > 0 && (
              <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-black text-xs text-muted-foreground uppercase">Date</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase">Fajr</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase hidden sm:table-cell">Sunrise</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase">Dhuhr</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase">Asr</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase">Maghrib</th>
                        <th className="p-3 font-black text-xs text-muted-foreground uppercase">Isha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calendarDays.map((day, i) => {
                        const isToday = day.date === new Date().toISOString().split("T")[0]
                        return (
                          <tr key={i} className={cn("border-t border-border/50 hover:bg-muted/30", isToday && "bg-primary/5")}>
                            <td className="p-3 font-bold text-foreground whitespace-nowrap">
                              {new Date(day.date + "T12:00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
                              {isToday && <Badge variant="default" className="ml-1 text-[8px] px-1 py-0 bg-primary">TODAY</Badge>}
                            </td>
                            <td className="p-3 text-center font-mono text-xs text-foreground">{formatTime(day.prayer_times.fajr, settings.timeFormat)}</td>
                            <td className="p-3 text-center font-mono text-xs text-muted-foreground hidden sm:table-cell">{formatTime(day.prayer_times.sunrise, settings.timeFormat)}</td>
                            <td className="p-3 text-center font-mono text-xs text-foreground">{formatTime(day.prayer_times.dhuhr, settings.timeFormat)}</td>
                            <td className="p-3 text-center font-mono text-xs text-foreground">{formatTime(day.prayer_times.asr, settings.timeFormat)}</td>
                            <td className="p-3 text-center font-mono text-xs text-foreground">{formatTime(day.prayer_times.maghrib, settings.timeFormat)}</td>
                            <td className="p-3 text-center font-mono text-xs text-foreground">{formatTime(day.prayer_times.isha, settings.timeFormat)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </section>

          {/* ── HIJRI CALENDAR ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-teal-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hijri Calendar</p>
            </div>
            {hijriData && (
              <Card className="relative overflow-hidden rounded-[2rem] border-none shadow-soft-md bg-gradient-to-br from-primary to-emerald-400 text-white">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
                <CardContent className="relative p-6 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Current Islamic Date</p>
                  <p className="text-3xl font-black">{hijriData.hijri.day} {hijriData.hijri.month_name} {hijriData.hijri.year} AH</p>
                  <p className="text-lg font-bold opacity-80 mt-1" dir="rtl">{hijriData.hijri.month_name_arabic}</p>
                </CardContent>
              </Card>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {islamicMonths.map((month) => {
                const isCurrent = hijriData?.hijri.month === month.number
                const monthEvents = eventsData?.events.filter((e) => e.month === month.number) || []
                return (
                  <Card key={month.number} className={cn("rounded-[2rem] border-none shadow-soft transition-all duration-250 hover:shadow-soft-md hover:-translate-y-0.5", isCurrent && "ring-2 ring-primary bg-primary/5")}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase">Month {month.number}</p>
                          <p className="text-sm font-black text-foreground">{month.name_english}</p>
                        </div>
                        <span className="text-base font-bold text-primary" dir="rtl">{month.name_arabic}</span>
                      </div>
                      {isCurrent && <Badge variant="default" className="bg-primary text-[9px]">CURRENT</Badge>}
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{month.significance}</p>
                      {monthEvents.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {monthEvents.map((e, i) => <Badge key={i} variant="secondary" className="text-[9px]">{e.day}: {e.name}</Badge>)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* ── ISLAMIC EVENTS ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-amber-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Islamic Events</p>
            </div>
            {eventsData && (
              <>
                <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                  <CardContent className="p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">Next Event</p>
                    <h3 className="text-xl font-black text-foreground">{eventsData.next_event.name}</h3>
                    <p className="text-sm font-bold text-muted-foreground mt-1">{eventsData.next_event.hijri_date}</p>
                  </CardContent>
                </Card>
                <Card className="rounded-[2rem] border-none shadow-sm">
                  <CardHeader className="pb-2"><CardTitle className="text-base font-black">Full Calendar</CardTitle></CardHeader>
                  <CardContent className="p-4 space-y-1">
                    {eventsData.events.map((event, i) => {
                      const monthNames = ["", "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"]
                      return (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-muted/30 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                            <span className="text-xs font-black text-primary leading-none">{event.day}</span>
                            <span className="text-[8px] font-bold text-primary/70 uppercase leading-none mt-0.5">{(monthNames[event.month] || "").substring(0, 3)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground">{event.name}</p>
                            <p className="text-xs text-muted-foreground">{event.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </>
            )}
          </section>

          {/* ── FASTING & RAMADAN ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-orange-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fasting &amp; Ramadan</p>
            </div>
            {!ramadanData && !ramadanLoading && !ramadanError && (
              <Button variant="outline" className="rounded-full" onClick={loadRamadan}>
                <RefreshCw className="h-4 w-4 mr-2" />Load Ramadan Calendar
              </Button>
            )}
            {ramadanLoading && (
              <div className="space-y-3"><Skeleton className="h-32" /><Skeleton className="h-48" /></div>
            )}
            {ramadanError && (
              <Card className="border-destructive/50">
                <CardContent className="p-6 text-center space-y-3">
                  <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
                  <p className="text-sm text-muted-foreground">{ramadanError}</p>
                  <Button onClick={loadRamadan} variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Try Again</Button>
                </CardContent>
              </Card>
            )}
            {!ramadanLoading && ramadanData && (() => {
              const today = new Date().toISOString().split("T")[0]
              const todayEntry = ramadanData.days.find((d) => d.date === today)
              const isRamadanNow = !!todayEntry
              const ramadanStart = new Date(ramadanData.ramadan_start)
              const isUpcoming = ramadanStart.getTime() > Date.now()
              const daysUntil = Math.ceil((ramadanStart.getTime() - Date.now()) / 86400000)
              return (
                <>
                  <Card className="relative overflow-hidden border-none rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-2xl shadow-amber-500/20">
                    <div className="absolute top-0 right-0 p-6 opacity-15"><Utensils className="h-28 w-28" /></div>
                    <CardContent className="p-7 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest opacity-80">
                        <Sparkles className="h-4 w-4" />
                        {isRamadanNow ? `Ramadan Day ${todayEntry!.day} of ${ramadanData.ramadan_days}` : isUpcoming ? "Upcoming Ramadan" : "Most Recent Ramadan"}
                      </div>
                      {isRamadanNow ? (
                        <>
                          <p className="text-2xl font-black">{todayEntry!.hijri_date}</p>
                          <div className="flex flex-wrap gap-3 pt-1">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
                              <p className="text-[10px] font-black uppercase opacity-80">Suhoor Ends</p>
                              <p className="text-lg font-black">{formatTime(todayEntry!.suhoor_ends, settings.timeFormat)}</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
                              <p className="text-[10px] font-black uppercase opacity-80">Iftar</p>
                              <p className="text-lg font-black">{formatTime(todayEntry!.iftar, settings.timeFormat)}</p>
                            </div>
                          </div>
                        </>
                      ) : isUpcoming ? (
                        <p className="text-4xl font-black">{daysUntil} days to go</p>
                      ) : (
                        <p className="text-lg font-bold opacity-90">{ramadanData.ramadan_start} – {ramadanData.ramadan_end} ({ramadanData.hijri_year} AH)</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                    <CardHeader className="pb-2"><CardTitle className="text-base font-black">Ramadan Calendar</CardTitle></CardHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3 font-black text-xs text-muted-foreground uppercase">Day</th>
                            <th className="p-3 font-black text-xs text-muted-foreground uppercase">Suhoor Ends</th>
                            <th className="p-3 font-black text-xs text-muted-foreground uppercase">Iftar</th>
                            <th className="p-3 font-black text-xs text-muted-foreground uppercase hidden sm:table-cell">Third</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ramadanData.days.map((day) => {
                            const isToday = day.date === today
                            return (
                              <tr key={day.day} className={cn("border-t border-border/50 hover:bg-muted/30", isToday && "bg-primary/5")}>
                                <td className="p-3 font-bold text-foreground whitespace-nowrap">
                                  {day.day}{isToday && <Badge variant="default" className="ml-1 text-[8px] px-1 py-0 bg-primary">TODAY</Badge>}
                                </td>
                                <td className="p-3 text-center font-mono text-xs">{formatTime(day.suhoor_ends, settings.timeFormat)}</td>
                                <td className="p-3 text-center font-mono text-xs">{formatTime(day.iftar, settings.timeFormat)}</td>
                                <td className="p-3 text-center text-xs text-muted-foreground hidden sm:table-cell">{day.third}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </>
              )
            })()}
          </section>

          {/* ── DUAS LIBRARY ── */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <div className="h-4 w-1 rounded-full bg-rose-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duas Library</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant={showFavorites ? "default" : "outline"} size="sm" className="rounded-full text-xs" onClick={() => setShowFavorites((v) => !v)}>
                <Heart className={cn("h-3.5 w-3.5 mr-1", showFavorites && "fill-current")} />Favorites
                <Badge variant="secondary" className="ml-1 text-[9px] px-1 py-0">{favorites.length}</Badge>
              </Button>
              {!showFavorites && duaCategories.slice(0, 12).map((cat) => (
                <Button key={cat.id} variant={selectedDuaCategory === cat.id ? "default" : "outline"} size="sm" className="rounded-full text-xs" onClick={() => setSelectedDuaCategory(cat.id)}>
                  {cat.name}
                  <Badge variant="secondary" className="ml-1 text-[9px] px-1 py-0">{cat.count}</Badge>
                </Button>
              ))}
              {!showFavorites && duaCategories.length > 12 && (
                <Select value={selectedDuaCategory} onValueChange={setSelectedDuaCategory}>
                  <SelectTrigger className="w-36 rounded-full h-8 text-xs"><SelectValue placeholder="More..." /></SelectTrigger>
                  <SelectContent>
                    {duaCategories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name} ({cat.count})</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-4">
              {(showFavorites ? favorites : duas).map((dua) => (
                <Card key={dua.id} className="rounded-[2rem] border-none shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-black text-foreground">{dua.title}</h4>
                      <div className="flex items-center gap-2 shrink-0">
                        {dua.repeat > 1 && <Badge variant="secondary" className="text-[10px]">×{dua.repeat}</Badge>}
                        <button onClick={() => toggleFavorite(dua)}>
                          <Heart className={cn("h-4 w-4", isFavorite(dua.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
                        </button>
                      </div>
                    </div>
                    <p className="text-right text-xl leading-[2.5] font-bold text-foreground" dir="rtl">{dua.arabic}</p>
                    <p className="text-sm text-primary/80 italic">{dua.transliteration}</p>
                    <p className="text-sm text-muted-foreground">{dua.translation}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{dua.source}</p>
                  </CardContent>
                </Card>
              ))}
              {!showFavorites && duas.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-50" />
                  <p className="font-bold">Select a category to view duas</p>
                </div>
              )}
              {showFavorites && favorites.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <BookMarked className="h-10 w-10 mx-auto mb-3 opacity-50" />
                  <p className="font-bold">No favourite duas yet — tap the heart to save one.</p>
                </div>
              )}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
