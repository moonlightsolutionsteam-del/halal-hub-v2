const BASE_URL = "https://ummahapi.com/api"
const API_KEY = "umh_b81d36d6266967a7b85bb185f7884fc64ea8e33f"

const cache = new Map<string, { data: unknown; expiry: number }>()

async function fetchAPI<T>(path: string, cacheTTL = 3600000): Promise<T> {
  const key = path
  const cached = cache.get(key)
  if (cached && Date.now() < cached.expiry) return cached.data as T

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "x-api-key": API_KEY },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.message || "API request failed")

  cache.set(key, { data: json.data, expiry: Date.now() + cacheTTL })
  return json.data as T
}

export interface PrayerTimes {
  imsak: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export interface PrayerTimesResponse {
  date: string
  timezone: string
  location: { latitude: number; longitude: number }
  calculation_method: string
  madhab: string
  prayer_times: PrayerTimes
  prayer_datetimes: Record<string, string>
  current_status: {
    current_prayer: string
    next_prayer: string
    time_until_next: string
    minutes_until_next: number
  }
}

export interface HijriDate {
  gregorian: {
    date: string
    formatted: string
    day_of_week: string
    day: number
    month: number
    month_name: string
    year: number
  }
  hijri: {
    date: string
    formatted: string
    day: number
    month: number
    month_name: string
    month_name_arabic: string
    year: number
    era: string
  }
}

export interface QiblaData {
  qibla_direction: number
  compass_bearing: string
  location: { latitude: number; longitude: number }
  kaaba_coordinates: { latitude: number; longitude: number }
  distance_km: number
  distance_miles: number
}

export interface IslamicEvent {
  month: number
  day: number
  name: string
  description: string
}

export interface IslamicEventsResponse {
  current_hijri_date: HijriDate
  next_event: { name: string; hijri_date: string; month: number; day: number }
  events: IslamicEvent[]
}

export interface IslamicMonth {
  number: number
  name_english: string
  name_arabic: string
  significance: string
}

export interface MoonData {
  gregorian: { year: number; month: number; day: number; date: string }
  hijri: {
    year: number
    month: number
    day: number
    month_name: string
    month_arabic: string
    date_formatted: string
    is_sacred_month: boolean
  }
  moon: {
    age_days: number
    phase: string
    illumination_pct: string
    crescent_visibility: string
    crescent_note: string
  }
}

export interface CalculationMethod {
  name: string
  description: string
  fajr_angle: string
  isha_angle?: string
  isha_description?: string
  madhab?: string
}

export interface DuaCategory {
  id: string
  name: string
  description: string
  count: number
}

export interface Dua {
  id: number
  category: string
  title: string
  arabic: string
  transliteration: string
  translation: string
  source: string
  repeat: number
}

export async function getPrayerTimes(
  lat: number,
  lng: number,
  method?: string,
  madhab?: string,
  date?: string
): Promise<PrayerTimesResponse> {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) })
  if (method) params.set("method", method)
  if (madhab) params.set("madhab", madhab)
  if (date) params.set("date", date)
  return fetchAPI<PrayerTimesResponse>(`/prayer-times?${params}`, 600000)
}

export interface MonthlyPrayerDay {
  date: string
  day: number
  day_name: string
  prayer_times: PrayerTimes
  prayer_datetimes: Record<string, string>
}

export interface MonthlyPrayerResponse {
  location: { latitude: number; longitude: number }
  timezone: string
  month: number
  year: number
  month_name: string
  calculation_method: string
  madhab: string
  total_days: number
  days: MonthlyPrayerDay[]
}

export async function getMonthlyPrayerTimes(
  lat: number,
  lng: number,
  year: number,
  month: number,
  methodName?: string,
  madhab?: string
): Promise<MonthlyPrayerResponse> {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng), year: String(year), month: String(month) })
  if (methodName) params.set("method", methodName)
  if (madhab) params.set("madhab", madhab)
  return fetchAPI<MonthlyPrayerResponse>(`/prayer-times/month?${params}`, 3600000)
}

export interface RamadanDay {
  day: number
  date: string
  day_name: string
  hijri_date: string
  third: string
  suhoor_ends: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  iftar: string
  maghrib: string
  isha: string
}

export interface RamadanResponse {
  location: { latitude: number; longitude: number }
  timezone: string
  year: number
  hijri_year: number
  calculation_method: string
  madhab: string
  ramadan_days: number
  ramadan_start: string
  ramadan_end: string
  total_days: number
  days: RamadanDay[]
}

export async function getRamadanCalendar(
  lat: number,
  lng: number,
  methodName?: string,
  madhab?: string
): Promise<RamadanResponse> {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) })
  if (methodName) params.set("method", methodName)
  if (madhab) params.set("madhab", madhab)
  return fetchAPI<RamadanResponse>(`/ramadan?${params}`, 3600000)
}

export async function getCalculationMethods(): Promise<Record<string, CalculationMethod>> {
  const data = await fetchAPI<{ methods: Record<string, CalculationMethod> }>("/prayer-methods", 86400000)
  return data.methods
}

export async function getHijriDate(): Promise<HijriDate> {
  return fetchAPI<HijriDate>("/today-hijri", 3600000)
}

export async function getQiblaDirection(lat: number, lng: number): Promise<QiblaData> {
  return fetchAPI<QiblaData>(`/qibla?lat=${lat}&lng=${lng}`, 86400000)
}

export async function getIslamicEvents(): Promise<IslamicEventsResponse> {
  return fetchAPI<IslamicEventsResponse>("/islamic-events", 86400000)
}

export async function getIslamicMonths(): Promise<{ months: IslamicMonth[] }> {
  return fetchAPI<{ months: IslamicMonth[] }>("/islamic-months", 86400000)
}

export async function getMoonData(): Promise<MoonData> {
  return fetchAPI<MoonData>("/moon", 3600000)
}

export async function getDuaCategories(): Promise<DuaCategory[]> {
  const data = await fetchAPI<{ categories: DuaCategory[] }>("/duas/categories", 86400000)
  return data.categories
}

export async function getDuasByCategory(category: string): Promise<Dua[]> {
  const data = await fetchAPI<{ duas: Dua[] }>(`/duas/category/${category}`, 86400000)
  return data.duas
}

export async function getRandomDua(): Promise<Dua> {
  return fetchAPI<Dua>("/duas/random", 0)
}

export interface SurahMeta {
  number: number
  name_arabic: string
  name_english: string
  name_translation: string
  revelation_place: string
  revelation_order: number
  verses_count: number
  bismillah_pre: boolean
}

export interface ReciterAudio {
  reciter_id: number
  reciter: string
  style: string
  surah_audio: string
}

export interface Verse {
  verse_key: string
  ayah: number
  arabic: string
  transliteration: string
  translations: Record<string, string>
  audio: { ayah_audio: string; all_reciters: string }
}

export interface SurahResponse {
  surah: SurahMeta
  audio: ReciterAudio[]
  total_verses: number
  verses: Verse[]
}

export interface RandomVerseResponse {
  surah: { number: number; name_arabic: string; name_english: string; name_translation: string }
  verse: Verse
}

export async function getSurah(surahNumber: number): Promise<SurahResponse> {
  return fetchAPI<SurahResponse>(`/quran/surah/${surahNumber}`, 86400000)
}

export async function getAllSurahs(): Promise<{ total: number; surahs: SurahMeta[] }> {
  return fetchAPI<{ total: number; surahs: SurahMeta[] }>("/quran/surahs", 86400000)
}

export async function getRandomVerse(): Promise<RandomVerseResponse> {
  return fetchAPI<RandomVerseResponse>("/quran/random", 0)
}

export async function searchQuran(query: string): Promise<{ results: Verse[]; count: number }> {
  return fetchAPI<{ results: Verse[]; count: number }>(`/quran/search?q=${encodeURIComponent(query)}`, 3600000)
}

export interface HadithCollectionMeta {
  key: string
  name: string
  arabic_name: string
  author: string
  reliability: string
  total_hadiths: number
}

export interface Hadith {
  id: string
  collection: string
  collection_name: string
  hadithnumber: number
  arabic: string
  english: string
  grade?: string
}

export async function getHadithCollections(): Promise<{ collections: HadithCollectionMeta[]; total_hadiths: number }> {
  return fetchAPI<{ collections: HadithCollectionMeta[]; total_hadiths: number }>("/hadith/collections", 86400000)
}

export async function getHadith(collection: string, number: number): Promise<Hadith> {
  return fetchAPI<Hadith>(`/hadith/${collection}/${number}`, 86400000)
}

export async function getRandomHadith(): Promise<Hadith> {
  return fetchAPI<Hadith>("/hadith/random", 0)
}

export interface AsmaName {
  number: number
  arabic: string
  transliteration: string
  english: string
  meaning: string
}

export async function getAsmaUlHusna(): Promise<{ names: AsmaName[] }> {
  return fetchAPI<{ names: AsmaName[] }>("/asma-ul-husna", 86400000)
}

export async function getRandomAsmaName(): Promise<AsmaName> {
  return fetchAPI<AsmaName>("/asma-ul-husna/random", 0)
}

export async function searchAsmaUlHusna(query: string): Promise<{ results: AsmaName[]; count: number }> {
  return fetchAPI<{ results: AsmaName[]; count: number }>(`/asma-ul-husna/search?q=${encodeURIComponent(query)}`, 3600000)
}

export interface ZakatInfo {
  definition: string
  nisab: {
    gold: { grams: number; description: string }
    silver: { grams: number; description: string }
    note: string
  }
  rate: { general: string; agriculture_rain: string; agriculture_irrigated: string }
  conditions: string[]
  eligible_recipients: string[]
  zakatable_assets: string[]
}

export interface ZakatNisab {
  gold: { threshold_grams: number; monetary_value: number | null; note: string }
  silver: { threshold_grams: number; monetary_value: number | null; note: string }
  zakat_rate: string
}

export interface ZakatCalculationInput {
  cash?: number
  gold_grams?: number
  gold_price_per_gram?: number
  silver_grams?: number
  silver_price_per_gram?: number
  business_goods?: number
  stocks?: number
  debts?: number
}

export interface ZakatCalculationResult {
  zakat_due: number
  zakat_due_formatted: string
  above_nisab: boolean
  nisab_standard: string
  nisab_value: number
  nisab_gold_grams: number
  nisab_silver_grams: number
  rate: string
  breakdown: {
    cash: number
    gold_value: number
    silver_value: number
    stocks: number
    business_goods: number
    other_investments: number
    gross_wealth: number
    liabilities: number
    net_zakatable_wealth: number
  }
  note: string
}

export async function getZakatInfo(): Promise<ZakatInfo> {
  return fetchAPI<ZakatInfo>("/zakat/info", 86400000)
}

export async function getZakatNisab(goldPricePerGram: number, silverPricePerGram?: number): Promise<ZakatNisab> {
  const params = new URLSearchParams({ gold_price_per_gram: String(goldPricePerGram) })
  if (silverPricePerGram) params.set("silver_price_per_gram", String(silverPricePerGram))
  return fetchAPI<ZakatNisab>(`/zakat/nisab?${params}`, 3600000)
}

export async function calculateZakat(input: ZakatCalculationInput): Promise<ZakatCalculationResult> {
  const res = await fetch(`${BASE_URL}/zakat/calculate`, {
    method: "POST",
    headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.message || "API request failed")
  return json.data as ZakatCalculationResult
}

export function clearCache() {
  cache.clear()
}

export const PRAYER_NAMES: Record<string, string> = {
  imsak: "Imsak",
  fajr: "Fajr",
  sunrise: "Sunrise",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
}

export const MAIN_PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const

export function formatPrayerTime(time24: string, format: "12h" | "24h"): string {
  if (format === "24h") return time24
  const [h, m] = time24.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`
}
