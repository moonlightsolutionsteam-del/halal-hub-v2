"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, Building2, Info, AlertCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Business types per category ─────────────────────────────────────────────
const BUSINESS_TYPES: Record<string, string[]> = {
  food:      ["Casual Dining", "Fine Dining", "Cafe & Coffee", "Cloud Kitchen", "Street Food", "Buffet", "Fast Food / QSR", "Bakery & Desserts", "Food Truck / Kiosk"],
  meat:      ["Butcher Shop", "Wholesale Supplier", "Online Delivery", "Processing Unit"],
  grocery:   ["Mini Market", "Supermarket", "Organic Store", "Hypermarket", "Online Grocery"],
  catering:  ["Wedding Catering", "Corporate Catering", "Home Delivery Meals", "Event Catering", "Tiffin Service"],
  events:    ["Event Venue", "Event Planning", "Decoration Services", "Photography & Video", "Sound & Lighting"],
  hotels:    ["Hotel", "Homestay / B&B", "Guest House", "Resort", "Serviced Apartment"],
  travel:    ["Travel Agency", "Hajj & Umrah", "Tour Operator", "Car Rental"],
  fashion:   ["Clothing Store", "Online Store", "Tailor / Bespoke", "Hijab & Abaya Specialist", "Kids & Family Wear"],
  cosmetics: ["Beauty Store", "Pharmacy", "Online Store", "Salon & Spa", "Herbal & Natural"],
  finance:   ["Islamic Bank", "Investment Fund", "Insurance (Takaful)", "Money Exchange", "Microfinance"],
  healthcare:["Clinic", "Hospital", "Pharmacy", "Hijama Centre", "Dental Clinic", "Optical Centre"],
  education: ["Madrasa", "School", "Training Centre", "Online Academy", "Tuition Centre"],
  media:     ["Bookstore", "Islamic Media", "Publishing House", "Online Store", "Digital Content"],
  certifier: ["Halal Certification Body", "Audit Agency", "Government Body", "Standards Authority"],
}

// ── Subcategories: category → business type → options ───────────────────────
const SUBCATEGORIES: Record<string, Record<string, string[]>> = {
  food: {
    "Casual Dining":    ["Multi-Cuisine", "North Indian", "South Indian", "Mughlai / Tandoor", "Middle Eastern / Arabic", "Asian (Chinese / Thai / Korean)", "Family Restaurant", "Thali Restaurant", "Regional Cuisine"],
    "Fine Dining":      ["Multi-Cuisine Fine Dining", "Mughlai Fine Dining", "Fusion Fine Dining", "Continental Fine Dining", "Luxury Hotel Restaurant"],
    "Cafe & Coffee":    ["All-day Café", "Coffee House", "Chai Café", "Tea Room & Bubble Tea", "Work / Study Café"],
    "Cloud Kitchen":    ["Multi-brand Cloud Kitchen", "Biryani Focused", "Pizza Focused", "Healthy Meals", "Desserts Only"],
    "Street Food":      ["Chaat & Snacks", "Kebab Stall", "Momos & Dumplings", "Rolls & Frankie", "Pav Bhaji / Vada Pav"],
    "Buffet":           ["Premium Buffet", "Lunch Buffet", "Iftar Buffet", "Mandi & Arabic Buffet"],
    "Fast Food / QSR":  ["Shawarma & Middle Eastern", "Fried Chicken", "Pizza", "Burgers & Fries", "Multi-Cuisine QSR"],
    "Bakery & Desserts":["Cakes & Pastries", "Artisan Breads", "Custom Cakes", "Ice Cream & Gelato", "Dessert Parlour"],
    "Food Truck / Kiosk":["Multi-Cuisine Food Truck", "Shawarma Truck", "Dessert Truck", "Chai / Juice Kiosk", "Mall Food Kiosk"],
  },
  meat: {
    "Butcher Shop":      ["Retail Only", "Retail + Wholesale", "Online Delivery", "Premium / Organic / Free-range"],
    "Wholesale Supplier":["Local Distribution", "Export & Import", "Processing Unit"],
    "Online Delivery":   ["App-based Delivery", "WhatsApp Orders", "Subscription Meat Box"],
    "Processing Unit":   ["Halal Slaughterhouse", "Packaging & Distribution", "Cold Chain"],
  },
  grocery: {
    "Mini Market":    ["Neighbourhood Market", "Convenience Store", "Petrol Station Forecourt"],
    "Supermarket":    ["General Supermarket", "Halal-focused Supermarket", "Ethnic / Specialty Supermarket"],
    "Organic Store":  ["100% Organic", "Mixed Organic & Conventional", "Farm-to-table"],
    "Hypermarket":    ["Large Format Hypermarket", "Cash & Carry"],
    "Online Grocery": ["App / Website Delivery", "Subscription Box", "Dark Store"],
  },
  hotels: {
    "Hotel":            ["Budget Hotel (1–2 Star)", "Mid-range Hotel (3 Star)", "Business Hotel (4 Star)", "Luxury Hotel (5 Star)", "Boutique Hotel"],
    "Homestay / B&B":   ["Private Room", "Entire Property", "Heritage Haveli"],
    "Guest House":      ["Family Guest House", "Budget Guest House", "Traveller's Lodge"],
    "Resort":           ["Beach Resort", "Hill Station Resort", "Eco Resort"],
    "Serviced Apartment":["Studio Apartment", "1 BHK", "2 BHK +"],
  },
  travel: {
    "Travel Agency":    ["Leisure Travel", "Corporate Travel", "Honeymoon Specialists"],
    "Hajj & Umrah":     ["Hajj Packages Only", "Umrah Packages Only", "Both Hajj & Umrah"],
    "Tour Operator":    ["Domestic Tours", "International Tours", "Muslim-friendly Tours", "Adventure / Eco Tours"],
    "Car Rental":       ["Self-drive", "Chauffeur-driven", "Airport Transfers", "Tour Vehicles"],
  },
  healthcare: {
    "Clinic":       ["General Practice (GP)", "Multi-specialty Clinic", "Ladies Only Clinic", "Paediatric Clinic"],
    "Hospital":     ["Multi-specialty Hospital", "Day Care Hospital", "Maternity Hospital"],
    "Pharmacy":     ["Retail Pharmacy", "Online Pharmacy", "Hospital Pharmacy", "Herbal / Unani Pharmacy"],
    "Hijama Centre":["Traditional Wet Cupping", "Medical Hijama", "Ladies Only Centre"],
    "Dental Clinic":["General Dentistry", "Orthodontics", "Cosmetic Dentistry"],
  },
  education: {
    "Madrasa":        ["Full-time (Residential)", "Part-time / Weekend", "Girls Only", "Boys Only", "Online Madrasa"],
    "School":         ["Pre-school / Nursery", "Primary School", "Secondary School", "Islamic Integrated School"],
    "Training Centre":["Professional & Career Skills", "Islamic Studies", "Arabic & Quran", "Vocational / Technical"],
    "Online Academy": ["Live Classes", "Recorded Self-paced Courses", "Hybrid (Live + Recorded)"],
    "Tuition Centre": ["School Subject Tuition", "Entrance Exam Prep", "Language Classes"],
  },
  catering: {
    "Wedding Catering":     ["South Asian Weddings", "Arabic / Middle Eastern Weddings", "Multi-cuisine Weddings"],
    "Corporate Catering":   ["Office Lunches", "Conference & Events", "Executive Dining"],
    "Home Delivery Meals":  ["Daily Tiffin", "Weekly Meal Plans", "Festival / Occasion Meals"],
    "Event Catering":       ["Birthday & Anniversary", "Aqiqah & Walima", "Ramadan Iftar & Suhoor"],
    "Tiffin Service":       ["Office Tiffin", "Student Tiffin", "Family Meal Plans"],
  },
}

// ── Category-specific spec configuration ────────────────────────────────────
interface SpecField {
  key: string
  label: string
  type: "chips" | "chips-search" | "radio" | "price-range"
  options: string[]
  multi?: boolean
  placeholder?: string
}

const CATEGORY_SPEC_FIELDS: Record<string, SpecField[]> = {
  food: [
    {
      key: "cuisines",
      label: "Cuisine Types",
      type: "chips-search",
      multi: true,
      options: ["Biryani", "Mughlai", "North Indian", "South Indian", "Middle Eastern / Arabic", "Shawarma", "BBQ & Grills", "Chinese", "Asian Fusion", "Turkish", "Italian / Pizza", "Burgers", "Kebab", "Mandi", "Lebanese", "Malaysian", "Indo-Chinese", "Thai", "Korean", "Japanese", "Mediterranean", "Pakistani", "Afghani", "Moroccan", "West African", "Bengali", "Kerala / Malabar", "Chettinad", "Hyderabadi", "Lucknowi / Awadhi", "Rajasthani", "Gujarati", "Bakery & Desserts", "Ice Cream & Gelato", "Bubble Tea", "Vegan / Plant-based"],
      placeholder: "Search cuisines…",
    },
    {
      key: "diningOptions",
      label: "Dining & Service Modes",
      type: "chips",
      multi: true,
      options: ["Dine-In", "Takeaway", "Delivery", "Drive-Thru", "Outdoor Seating", "Rooftop Seating", "Private Dining Room", "Buffet Available", "Pre-Order", "WhatsApp Ordering"],
    },
    {
      key: "meatTypes",
      label: "Meat Types Served",
      type: "chips",
      multi: true,
      options: ["Chicken", "Mutton (Goat)", "Beef", "Lamb", "Buffalo", "Fish & Seafood", "Duck / Turkey", "Eggs", "Vegetarian Only", "Vegan Only"],
    },
    {
      key: "facilities",
      label: "Facilities & Features",
      type: "chips",
      multi: true,
      options: ["Air Conditioned", "Parking Available", "Prayer Space / Musalla", "Wi-Fi", "Kids Friendly", "Wheelchair Accessible", "Family Seating", "Outdoor Shisha-free Zone", "CCTV", "Waiting Area"],
    },
    {
      key: "priceRange",
      label: "Price Range",
      type: "price-range",
      options: ["₹ Budget Friendly", "₹₹ Moderate", "₹₹₹ Premium", "₹₹₹₹ Luxury"],
    },
  ],
  meat: [
    {
      key: "meatTypes",
      label: "Meat Types Stocked",
      type: "chips",
      multi: true,
      options: ["Chicken", "Mutton (Goat)", "Lamb", "Beef", "Buffalo", "Veal", "Fish & Seafood", "Duck", "Turkey", "Eggs"],
    },
    {
      key: "supplyType",
      label: "Supply Type",
      type: "radio",
      options: ["Retail Only", "Wholesale Only", "Both Retail & Wholesale"],
    },
    {
      key: "processingType",
      label: "Processing & Delivery",
      type: "chips",
      multi: true,
      options: ["Fresh / Daily Slaughter", "Frozen", "Marinated / Ready-to-cook", "Home Delivery", "Bulk / Pre-order"],
    },
  ],
  grocery: [
    {
      key: "storeServices",
      label: "Store Specialities",
      type: "chips",
      multi: true,
      options: ["Fresh Produce", "Imported Goods", "Organic Section", "Halal Meat Counter", "Bakery In-store", "Frozen Foods", "Ready Meals", "Spices & Condiments", "Ethnic / Asian Products"],
    },
    {
      key: "deliveryOptions",
      label: "Shopping & Delivery",
      type: "chips",
      multi: true,
      options: ["In-store Only", "Home Delivery", "Click & Collect", "WhatsApp Orders", "Subscription / Weekly Box"],
    },
  ],
  catering: [
    {
      key: "eventTypes",
      label: "Events Specialised In",
      type: "chips",
      multi: true,
      options: ["Weddings (Nikah / Walima)", "Aqiqah", "Birthday & Anniversary", "Corporate Dinners", "Office Lunches", "Conferences", "Ramadan Iftar", "Suhoor Events", "Funeral / Condolence", "School Events"],
    },
    {
      key: "cuisineSpecialties",
      label: "Cuisine Specialties",
      type: "chips",
      multi: true,
      options: ["Mughlai / North Indian", "South Indian", "Middle Eastern / Mandi", "Biryani Specialist", "BBQ & Grills", "Continental", "Multi-cuisine", "Bespoke / Custom Menu"],
    },
    {
      key: "serviceStyle",
      label: "Service Style",
      type: "chips",
      multi: true,
      options: ["Live Cooking Station", "Buffet Setup", "Plated Service", "Food Truck Style", "Box Meals / Packed Lunches"],
    },
  ],
  events: [
    {
      key: "venueTypes",
      label: "Venue / Service Type",
      type: "chips",
      multi: true,
      options: ["Indoor Banquet Hall", "Outdoor Lawn / Garden", "Rooftop Venue", "Conference Hall", "Community Hall", "Event Planning", "Photography & Videography", "Stage & Sound Setup", "Floral & Decoration"],
    },
    {
      key: "capacity",
      label: "Capacity / Team Size",
      type: "radio",
      options: ["Up to 50 guests", "50 – 150 guests", "150 – 300 guests", "300 – 500 guests", "500+ guests"],
    },
  ],
  hotels: [
    {
      key: "starRating",
      label: "Star Rating / Category",
      type: "radio",
      options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars", "Unrated / Boutique"],
    },
    {
      key: "halalAmenities",
      label: "Halal & Muslim-friendly Amenities",
      type: "chips",
      multi: true,
      options: ["Halal Kitchen / Restaurant", "Prayer Mats in Room", "Qibla Direction Indicator", "No Alcohol Policy", "Female-only Floor / Section", "In-room Quran", "Wudhu Facilities", "Halal Breakfast", "Family Rooms"],
    },
    {
      key: "roomTypes",
      label: "Room Types Offered",
      type: "chips",
      multi: true,
      options: ["Standard Rooms", "Deluxe Rooms", "Suites", "Family Rooms", "Accessible Rooms", "Serviced Apartments"],
    },
  ],
  travel: [
    {
      key: "specialisations",
      label: "Travel Specialisations",
      type: "chips",
      multi: true,
      options: ["Hajj Packages", "Umrah Packages", "Family Leisure Travel", "Honeymoon Packages", "Corporate Travel", "School / Group Tours", "Adventure Travel", "Medical Tourism", "Visa Assistance"],
    },
    {
      key: "destinations",
      label: "Key Destinations Covered",
      type: "chips",
      multi: true,
      options: ["Saudi Arabia (Makkah / Madinah)", "UAE & GCC", "Turkey", "Malaysia", "Indonesia", "Morocco", "Egypt", "Jordan", "Europe", "UK & Ireland", "South / Southeast Asia", "Africa", "Americas"],
    },
  ],
  fashion: [
    {
      key: "productCategories",
      label: "Product Categories",
      type: "chips",
      multi: true,
      options: ["Abaya", "Hijab & Scarf", "Niqab", "Modest Dresses", "Kurta & Shalwar", "Modest Swimwear", "Boys & Girls Clothing", "Menswear", "Accessories & Jewellery", "Footwear"],
    },
    {
      key: "genderFocus",
      label: "Primary Customer",
      type: "chips",
      multi: true,
      options: ["Women", "Men", "Kids", "All Genders"],
    },
    {
      key: "serviceType",
      label: "Shopping Options",
      type: "chips",
      multi: true,
      options: ["In-store", "Online Store", "Custom / Bespoke Tailoring", "Home Delivery", "Rental / Hire"],
    },
  ],
  cosmetics: [
    {
      key: "productTypes",
      label: "Product Categories",
      type: "chips",
      multi: true,
      options: ["Skincare", "Makeup / Colour Cosmetics", "Haircare", "Fragrance / Attar", "Nail Care (Breathable)", "Men's Grooming", "Baby & Kids Care", "Herbal & Organic", "Supplements & Vitamins"],
    },
    {
      key: "features",
      label: "Key Features",
      type: "chips",
      multi: true,
      options: ["Halal Certified", "Cruelty-free", "Vegan", "Alcohol-free", "Paraben-free", "Fragrance-free", "Natural & Organic"],
    },
  ],
  finance: [
    {
      key: "services",
      label: "Financial Services Offered",
      type: "chips",
      multi: true,
      options: ["Savings Account", "Current Account", "Home Finance (Murabaha)", "Car Finance", "Personal Finance", "Business Finance", "Investment (Mudarabah)", "Takaful (Insurance)", "Zakat Management", "Sukuk / Islamic Bonds", "Money Transfer", "Currency Exchange"],
    },
    {
      key: "compliance",
      label: "Compliance & Certifications",
      type: "chips",
      multi: true,
      options: ["Central Bank Licensed", "Shariah Board Certified", "AAOIFI Compliant", "Listed Entity / Public Company"],
    },
  ],
  healthcare: [
    {
      key: "specialties",
      label: "Medical Specialties",
      type: "chips",
      multi: true,
      options: ["General Practice", "Obstetrics & Gynaecology", "Paediatrics", "Cardiology", "Orthopaedics", "Dermatology & Aesthetics", "Dentistry", "Ophthalmology", "Psychiatry & Counselling", "Hijama / Cupping", "Physiotherapy", "Nutrition & Dietetics", "Unani & Herbal"],
    },
    {
      key: "genderPolicy",
      label: "Gender Policy",
      type: "radio",
      options: ["Mixed (All Genders)", "Ladies Only", "Men Only", "Separate Male & Female Sections"],
    },
    {
      key: "serviceFeatures",
      label: "Service Features",
      type: "chips",
      multi: true,
      options: ["Telemedicine / Online Consultation", "Home Visits", "24/7 Emergency", "Ambulance Service", "Pharmacy On-site", "Lab & Diagnostics"],
    },
  ],
  education: [
    {
      key: "subjects",
      label: "Subjects / Programmes Offered",
      type: "chips",
      multi: true,
      options: ["Quran (Hifz / Tajweed)", "Arabic Language", "Islamic Studies (Fiqh / Aqeedah)", "Seerah & History", "Modern Sciences", "Mathematics", "English Language", "IT & Computer Skills", "Business & Finance", "Early Childhood / Nursery"],
    },
    {
      key: "serviceMode",
      label: "Mode of Learning",
      type: "radio",
      options: ["In-person Only", "Online Only", "Hybrid (Both)"],
    },
    {
      key: "ageGroups",
      label: "Age Groups Served",
      type: "chips",
      multi: true,
      options: ["Toddlers (2–5 yrs)", "Primary (6–11 yrs)", "Secondary (12–17 yrs)", "Adults (18+)", "Senior Learners"],
    },
  ],
  media: [
    {
      key: "contentTypes",
      label: "Products & Content Types",
      type: "chips",
      multi: true,
      options: ["Islamic Books", "Children's Books", "Academic & Educational", "Quran & Tafsir", "Audio / Nasheed", "Video & Documentaries", "Magazines & Journals", "Digital Downloads", "Stationery & Gifts"],
    },
    {
      key: "languages",
      label: "Languages Available",
      type: "chips",
      multi: true,
      options: ["Arabic", "English", "Urdu", "Hindi", "Malay / Bahasa", "Indonesian", "Turkish", "French", "Bengali", "Tamil", "Swahili"],
    },
  ],
  certifier: [
    {
      key: "standardsFollowed",
      label: "Halal Standards Followed",
      type: "chips",
      multi: true,
      options: ["MS 1500:2019 (Malaysia)", "GSO 2055-1 (GCC)", "OIC/SMIIC 1", "JAKIM", "MUI (Indonesia)", "HFA (UK)", "IFANCA (USA)", "ESMA (UAE)", "BPJPH (Indonesia)", "HDC Approved"],
    },
    {
      key: "sectorsCertified",
      label: "Sectors / Industries Certified",
      type: "chips",
      multi: true,
      options: ["Food & Beverages", "Meat & Poultry", "Cosmetics & Personal Care", "Pharmaceuticals", "Logistics & Cold Chain", "Finance & Banking", "Healthcare", "Fashion & Textiles", "Feed & Agriculture", "Food Ingredients"],
    },
    {
      key: "accreditationBody",
      label: "Accredited By",
      type: "chips",
      multi: true,
      options: ["JAKIM", "MUI", "ESMA", "National Accreditation Board", "IAF Member", "ISO 17065 Certified"],
    },
  ],
}

// ── Small helpers ────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all",
        active
          ? "bg-primary text-white border-primary"
          : "bg-muted border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

function PriceChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 py-3 rounded-2xl text-sm font-black border-2 transition-all",
        active
          ? "bg-primary text-white border-primary"
          : "bg-muted border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

// ── Main form ────────────────────────────────────────────────────────────────
function DetailsForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { draft, update } = useOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cuisineSearch, setCuisineSearch] = useState("")

  const category = searchParams.get("category") || draft.category

  useEffect(() => {
    if (category && !draft.category) update({ category })
  }, [category, draft.category, update])

  const types = BUSINESS_TYPES[category] || BUSINESS_TYPES.food
  const subcats = (SUBCATEGORIES[category] || {})[draft.businessType] || []
  const specFields = CATEGORY_SPEC_FIELDS[category] || []

  // ── Spec helpers ────────────────────────────────────────────────────────
  function getSpec(key: string): string | string[] {
    return draft.categorySpecs?.[key] ?? (key === "priceRange" || key === "starRating" || key === "supplyType" || key === "capacity" || key === "genderPolicy" || key === "serviceMode" ? "" : [])
  }

  function toggleChip(key: string, value: string) {
    const current = (getSpec(key) as string[])
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    update({ categorySpecs: { ...draft.categorySpecs, [key]: next } })
  }

  function setRadio(key: string, value: string) {
    update({ categorySpecs: { ...draft.categorySpecs, [key]: value } })
  }

  // ── Validation ──────────────────────────────────────────────────────────
  function validate() {
    const e: Record<string, string> = {}
    if (!draft.businessName.trim()) e.businessName = "Business name is required."
    if (draft.businessName.trim().length < 3) e.businessName = "Must be at least 3 characters."
    if (!draft.description.trim()) e.description = "Description is required."
    if (draft.description.trim().length < 30) e.description = "Please write at least 30 characters."
    if (!draft.businessType) e.businessType = "Please select a business type."
    return e
  }

  function handleNext() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    update({ currentStep: 2 })
    router.push("/partner/onboarding/business/location")
  }

  function field(name: string, label: string, el: React.ReactNode) {
    return (
      <div className="space-y-2">
        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
        {el}
        {errors[name] && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />{errors[name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 2 of 8</p>
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" /> Business Information
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Tell us about your business. This appears on your public listing.</p>
      </div>

      {/* ── Core Details ───────────────────────────────────────────────── */}
      <Card className="rounded-[2rem] border-none shadow-soft bg-card">
        <CardContent className="p-4 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs font-bold text-primary">
              Category: <span className="font-black capitalize">{draft.categoryLabel || category}</span> — go back to change.
            </p>
          </div>

          {/* Business type */}
          {field("businessType", "Business Type *", (
            <Select
              value={draft.businessType}
              onValueChange={(v) => {
                update({ businessType: v, subcategory: "" })
                setErrors(p => ({ ...p, businessType: "" }))
              }}
            >
              <SelectTrigger className={cn("h-12 rounded-2xl bg-muted border-none font-bold", errors.businessType && "ring-2 ring-red-500/50")}>
                <SelectValue placeholder="Select type…" />
              </SelectTrigger>
              <SelectContent>
                {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          ))}

          {/* Subcategory — cascades from business type */}
          {subcats.length > 0 && (
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Sub-category</Label>
              <Select value={draft.subcategory} onValueChange={(v) => update({ subcategory: v })}>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Narrow it down further…" />
                </SelectTrigger>
                <SelectContent>
                  {subcats.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  <SelectItem value="other">Other / Not listed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Business name */}
          {field("businessName", "Business Name *", (
            <Input
              value={draft.businessName}
              onChange={(e) => { update({ businessName: e.target.value }); setErrors(p => ({ ...p, businessName: "" })) }}
              placeholder="e.g., Karim's Restaurant"
              className={cn("h-12 rounded-2xl bg-muted border-none font-bold text-lg", errors.businessName && "ring-2 ring-red-500/50")}
            />
          ))}

          {field("brandName", "Alternate / Brand Name (Optional)", (
            <Input
              value={draft.brandName}
              onChange={(e) => update({ brandName: e.target.value })}
              placeholder="e.g., Karim's Hotel"
              className="h-12 rounded-2xl bg-muted border-none font-bold"
            />
          ))}

          {field("tagline", "Tagline (Optional)", (
            <Input
              value={draft.tagline}
              onChange={(e) => update({ tagline: e.target.value })}
              placeholder="e.g., The Original since 1913"
              className="h-12 rounded-2xl bg-muted border-none font-medium"
              maxLength={100}
            />
          ))}

          {field("description", "About Your Business *", (
            <div className="space-y-1">
              <Textarea
                value={draft.description}
                onChange={(e) => { update({ description: e.target.value }); setErrors(p => ({ ...p, description: "" })) }}
                placeholder="Describe your business, its history, and what sets you apart…"
                className={cn("min-h-[140px] rounded-2xl bg-muted border-none p-4 font-medium resize-none", errors.description && "ring-2 ring-red-500/50")}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">{draft.description.length}/1000</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Category Specifications ─────────────────────────────────────── */}
      {specFields.length > 0 && (
        <Card className="rounded-[2rem] border-none shadow-soft bg-card">
          <CardContent className="p-4 sm:p-8 space-y-8">
            <div className="space-y-1">
              <p className="font-black text-foreground">Category Specifications</p>
              <p className="text-xs text-muted-foreground font-medium">These details help customers find you and improve your listing quality.</p>
            </div>

            {specFields.map((sf) => {
              const value = getSpec(sf.key)

              if (sf.type === "chips-search") {
                const filtered = cuisineSearch
                  ? sf.options.filter(o => o.toLowerCase().includes(cuisineSearch.toLowerCase()))
                  : sf.options
                return (
                  <div key={sf.key} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{sf.label}</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={cuisineSearch}
                        onChange={(e) => setCuisineSearch(e.target.value)}
                        placeholder={sf.placeholder || "Search…"}
                        className="pl-9 h-10 rounded-2xl bg-muted border-none text-sm font-medium"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                      {filtered.map(o => (
                        <Chip
                          key={o}
                          label={o}
                          active={(value as string[]).includes(o)}
                          onClick={() => toggleChip(sf.key, o)}
                        />
                      ))}
                    </div>
                    {(value as string[]).length > 0 && (
                      <p className="text-xs text-primary font-bold">{(value as string[]).length} selected</p>
                    )}
                  </div>
                )
              }

              if (sf.type === "radio") {
                return (
                  <div key={sf.key} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{sf.label}</Label>
                    <div className="flex flex-wrap gap-2">
                      {sf.options.map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setRadio(sf.key, o)}
                          className={cn(
                            "px-4 py-2 rounded-2xl text-xs font-black border-2 transition-all",
                            value === o
                              ? "bg-primary text-white border-primary"
                              : "bg-muted border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }

              if (sf.type === "price-range") {
                return (
                  <div key={sf.key} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{sf.label}</Label>
                    <div className="flex gap-2">
                      {sf.options.map(o => (
                        <PriceChip
                          key={o}
                          label={o}
                          active={value === o}
                          onClick={() => setRadio(sf.key, o)}
                        />
                      ))}
                    </div>
                  </div>
                )
              }

              // chips (multi)
              return (
                <div key={sf.key} className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{sf.label}</Label>
                  <div className="flex flex-wrap gap-2">
                    {sf.options.map(o => (
                      <Chip
                        key={o}
                        label={o}
                        active={(value as string[]).includes(o)}
                        onClick={() => toggleChip(sf.key, o)}
                      />
                    ))}
                  </div>
                  {(value as string[]).length > 0 && (
                    <p className="text-xs text-primary font-bold">{(value as string[]).length} selected</p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={handleNext}>
          Continue to Location <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="p-6 sm:p-12 text-center text-muted-foreground">Loading…</div>}>
      <DetailsForm />
    </Suspense>
  )
}
