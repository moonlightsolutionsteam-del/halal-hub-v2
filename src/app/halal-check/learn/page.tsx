
"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, GraduationCap, HelpCircle, List, ShieldCheck } from "lucide-react"
import { COMMON_INGREDIENTS, STATUS_CONFIG, type HalalStatus } from "../data"

interface FAQItem { q: string; a: string }

const FAQS: FAQItem[] = [
  { q: "What makes a food product Halal?", a: "A Halal product must be free from any substance forbidden under Islamic law (Haram), slaughtered according to Islamic rites if it is meat, not contaminated with Haram substances during processing, storage or transportation, and not intoxicating." },
  { q: "What is Mashbooh?", a: "Mashbooh means 'doubtful' or 'suspected'. It refers to ingredients or products whose halal status is unclear — either because the source is unknown or it could come from both halal and haram origins. Muslims are generally advised to avoid Mashbooh items as a precaution." },
  { q: "Are all E-codes Haram?", a: "No. Most E-codes are Halal. Common ones like E100 (Curcumin), E300 (Vitamin C), and E440 (Pectin) are plant-derived and permissible. Only a specific subset — mainly certain colours, emulsifiers, and gelatins — may be derived from Haram sources." },
  { q: "Is alcohol in food always Haram?", a: "Not necessarily. Many scholars permit trace amounts of alcohol that naturally occur in fermentation (e.g. in vinegar or bread) or are used as a carrier for flavourings if the final product is non-intoxicating. However, products with added alcohol or where alcohol content is significant are considered Haram by most scholars." },
  { q: "What is an INS code?", a: "INS stands for International Numbering System. It's the international equivalent of European E-codes, used widely in Asia and other regions. The same additive will often have both an INS number and an E-code (e.g. INS 100 = E100 Curcumin)." },
  { q: "What is Halal certification?", a: "Halal certification is a process carried out by an accredited Islamic body to verify that a product meets Halal standards. Certified products display a Halal logo from bodies like JAKIM (Malaysia), HMC (UK), IFANCA (USA), or similar recognised authorities." },
  { q: "Why do different certifying bodies sometimes disagree?", a: "Different scholars and schools of thought (madhabs) can have varying interpretations on borderline cases. For example, some bodies permit shellac (E904) while others don't. It's always best to check the specific certifying body and their criteria." },
]

const GLOSSARY = [
  { term: "Halal", def: "Arabic for 'permissible'. Describes what is allowed under Islamic law." },
  { term: "Haram", def: "Arabic for 'forbidden'. Describes what is strictly prohibited under Islamic law." },
  { term: "Mashbooh", def: "Arabic for 'doubtful'. Status for ingredients/products whose halal status is unclear." },
  { term: "Zabiha", def: "Islamic method of animal slaughter. The animal must be slaughtered by a Muslim while invoking the name of Allah." },
  { term: "Gelatin", def: "A protein derived from animal bones and skin. Halal only if sourced from halal-slaughtered animals (usually labeled 'bovine' or 'fish' gelatin)." },
  { term: "Carmine / E120", def: "A red dye derived from cochineal insects. Considered Haram by most scholars." },
  { term: "Rennet", def: "An enzyme used in cheese production. Halal if microbial or from halal-slaughtered animals." },
  { term: "Whey", def: "A dairy by-product. Halal if produced without Haram processing agents." },
  { term: "Natural Flavors", def: "Can be from animal or plant sources. Status depends on origin — often labeled vaguely on packaging." },
  { term: "Mono & Diglycerides (E471)", def: "Emulsifiers that can be plant or animal-derived. Mashbooh without clear sourcing." },
]

const E_NUMBER_GUIDE = [
  { range: "E100–E199", title: "Colours", summary: "Most are Halal (plant or synthetic). Watch: E120 (Carmine — Haram), E904 (Shellac — Haram)." },
  { range: "E200–E299", title: "Preservatives", summary: "Generally Halal. E211 Sodium Benzoate, E220 Sulphur Dioxide are all permissible." },
  { range: "E300–E399", title: "Antioxidants", summary: "Mostly Halal — Vitamin C (E300), E306–E309 Tocopherols. Check E322 Lecithin source." },
  { range: "E400–E499", title: "Thickeners & Emulsifiers", summary: "Most are plant/seaweed-based and Halal. Caution: E441 Gelatin (depends on source), E471 Mono & Diglycerides (may be animal-derived)." },
  { range: "E500–E599", title: "Acidity Regulators", summary: "Almost universally Halal — sodium, potassium, and calcium salts from mineral sources." },
  { range: "E600–E699", title: "Flavour Enhancers", summary: "E621 MSG is Halal. E627, E631, E635 may be from meat sources — check." },
  { range: "E700–E999", title: "Other additives", summary: "E904 Shellac (Haram — insect-derived). E920 L-cysteine (Mashbooh — may be from hair). E966 Lactitol (Halal)." },
]

function Accordion({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <button onClick={() => setOpen(p => !p)} className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors">
        <p className="text-sm font-black flex-1 leading-snug">{q}</p>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  )
}

type Section = "faq" | "glossary" | "enumbers" | "ingredients"

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState<Section>("faq")

  const sections = [
    { id: "faq" as Section, label: "FAQ", icon: HelpCircle },
    { id: "glossary" as Section, label: "Glossary", icon: BookOpen },
    { id: "enumbers" as Section, label: "E-Numbers", icon: List },
    { id: "ingredients" as Section, label: "Ingredients", icon: ShieldCheck },
  ]

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">Learn About Halal</h1>
          <p className="text-[10px] text-muted-foreground">FAQ, glossary, E-number guide & ingredient info</p>
        </div>
      </div>

      {/* Section nav */}
      <div className="flex border-b border-border/40 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "flex items-center gap-1.5 shrink-0 px-4 py-3 text-[11px] font-black uppercase tracking-wide transition-all border-b-2",
              activeSection === s.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <s.icon className="h-3.5 w-3.5" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* FAQ */}
        {activeSection === "faq" && (
          <>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Frequently Asked Questions</p>
            <div className="space-y-2">
              {FAQS.map((faq, i) => <Accordion key={i} {...faq} />)}
            </div>
          </>
        )}

        {/* Glossary */}
        {activeSection === "glossary" && (
          <>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Key Terms & Definitions</p>
            <div className="space-y-2">
              {GLOSSARY.map((g, i) => (
                <div key={i} className="rounded-2xl border border-border/50 bg-card px-4 py-3.5 space-y-1">
                  <p className="text-sm font-black">{g.term}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.def}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* E-numbers guide */}
        {activeSection === "enumbers" && (
          <>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">E-Number Range Guide</p>
            <div className="space-y-2">
              {E_NUMBER_GUIDE.map((g, i) => (
                <div key={i} className="rounded-2xl border border-border/50 bg-card px-4 py-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black">{g.title}</p>
                    <span className="text-[10px] font-mono font-black text-muted-foreground bg-muted px-2 py-0.5 rounded-lg">{g.range}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{g.summary}</p>
                </div>
              ))}
            </div>
            <Link href="/halal-check/e-codes" className="flex items-center justify-center gap-2 text-sm font-black text-primary py-2">
              View Full E-Code Directory
            </Link>
          </>
        )}

        {/* Common ingredients */}
        {activeSection === "ingredients" && (
          <>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Common Ingredients Directory ({COMMON_INGREDIENTS.length})</p>
            <div className="space-y-2">
              {COMMON_INGREDIENTS.map((ing, i) => {
                const cfg = STATUS_CONFIG[ing.status]
                return (
                  <div key={i} className={cn("rounded-2xl border px-4 py-3.5 space-y-1", cfg.bg, cfg.border)}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black">{ing.name}</p>
                      <span className={cn("text-[10px] font-black uppercase tracking-wide", cfg.color)}>{cfg.icon} {cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ing.reason}</p>
                    {ing.alternatives && ing.alternatives.length > 0 && (
                      <p className="text-[10px] text-primary">Halal alternatives: {ing.alternatives.join(", ")}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
