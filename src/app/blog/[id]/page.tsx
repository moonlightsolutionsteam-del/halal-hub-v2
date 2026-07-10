import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, Heart } from "lucide-react"
import type { Metadata } from "next"

const ALL_POSTS = [
  {
    id: "f1",
    title: "The Future of Halal Lifestyle: Beyond Food",
    excerpt: "Discover how the global Muslim community is redefining ethical travel, finance, and wellness in the 21st century. Join us as we explore the deeper connections between faith and modern living.",
    content: `The concept of halal has evolved far beyond its traditional boundaries of food certification. Today, Muslims around the world are seeking halal-compliant options in travel, finance, fashion, cosmetics, and wellness.

**Halal Travel**

The global halal tourism market is projected to exceed $225 billion by 2026. Travelers seek hotels with prayer facilities, restaurants serving halal food, and destinations that respect Islamic values. Countries like Malaysia, UAE, and Turkey have become pioneers in catering to this growing demographic.

**Islamic Finance**

Sharia-compliant banking has grown to manage over $3 trillion in assets worldwide. Products like sukuk (Islamic bonds), murabaha (cost-plus financing), and ijara (leasing) provide interest-free alternatives that align with Islamic principles while remaining competitive in global markets.

**Modest Fashion**

The modesty market is a billion-dollar industry, with designers from Paris to Jakarta creating collections that blend contemporary style with Islamic values. Major fashion weeks now feature modest collections, and platforms dedicated to modest wear are thriving.

**The Path Forward**

As the global Muslim population approaches 2 billion, the demand for halal-certified products and services across all lifestyle categories will only grow. Halal Hub is at the forefront of connecting this community with verified, trustworthy businesses.`,
    author: "Shaykh Hamza",
    date: "Oct 24, 2024",
    readTime: "12 min",
    category: "Insight",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "1",
    title: "Sunnah Foods for Immunity",
    excerpt: "Discover how the Prophet's (PBUH) dietary guidance aligns with modern nutritional science to boost your immune system naturally.",
    content: `The Prophet Muhammad (PBUH) recommended several foods that modern science has confirmed possess remarkable immune-boosting properties.

**Black Seed (Nigella Sativa)**

"Use the black seed, for it contains a cure for every disease except death." (Bukhari). Modern research has confirmed that black seed contains thymoquinone, a compound with powerful anti-inflammatory, antioxidant, and antimicrobial properties.

**Honey**

The Quran mentions honey as a healing for mankind (16:69). Research shows raw honey contains hydrogen peroxide, bee defensin-1, and other antimicrobial compounds that help fight infections.

**Dates**

Dates are one of the most frequently mentioned foods in Islamic tradition. Rich in potassium, magnesium, vitamin B6, and iron, they provide sustained energy and support immune function.

**Olive Oil**

Mentioned in the Quran (24:35), olive oil contains oleocanthal, which has anti-inflammatory effects similar to ibuprofen, and polyphenols that support a healthy immune system.

Incorporating these foods into your daily diet is not just an act of following sunnah—it is scientifically sound nutrition.`,
    author: "Amina K.",
    date: "Jul 9, 2026",
    readTime: "5 min",
    category: "Health",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "2",
    title: "Exploring Andalusia's Heritage",
    excerpt: "A journey through the heart of Islamic Spain — from the Alhambra's geometric grandeur to the streets of old Córdoba.",
    content: `Andalusia, the southern region of Spain, was once the jewel of Islamic civilization in Europe. For nearly 800 years, it was home to a Muslim culture that produced groundbreaking advances in science, philosophy, medicine, and architecture.

**The Alhambra Palace**

The Alhambra in Granada is one of the world's most extraordinary examples of Islamic architecture. Its intricate geometric patterns, muqarnas (stalactite vaulting), and calligraphic inscriptions represent the pinnacle of Nasrid artistry.

**The Great Mosque of Córdoba**

The Mezquita-Catedral of Córdoba began construction in 785 CE and was expanded several times. Its forest of striped arches and elaborate mihrab have influenced Islamic architecture worldwide.

**Legacy of Knowledge**

Scholars like Ibn Rushd (Averroes), Ibn Tufayl, and al-Zahrawi transformed medicine, philosophy, and surgery. Al-Andalus was a center where Muslim, Jewish, and Christian scholars exchanged ideas freely.

Visiting Andalusia today is a profound reminder of Islam's contributions to human civilization and a powerful source of inspiration for Muslim travelers.`,
    author: "Zaid Ali",
    date: "Jul 9, 2026",
    readTime: "8 min",
    category: "Travel",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "3",
    title: "Ethics in Islamic Finance",
    excerpt: "Understanding how Sharia-compliant financial products work and why they're gaining traction among non-Muslim investors too.",
    content: `Islamic finance operates on principles derived from Sharia law, primarily prohibiting riba (interest/usury) and gharar (excessive uncertainty). These restrictions have led to the development of innovative financial instruments.

**Key Principles**

1. **Prohibition of Riba**: Money cannot generate money on its own. Returns must come from real economic activity.
2. **Risk Sharing**: Both parties in a transaction must share in the risk and reward.
3. **Asset-Backed Financing**: All transactions must be tied to tangible assets or services.
4. **Ethical Screening**: Investment in industries like alcohol, gambling, weapons, and pork products is prohibited.

**Popular Instruments**

- **Murabaha**: Cost-plus financing where the bank buys an asset and sells it to the customer at a profit
- **Musharaka**: Partnership where profits and losses are shared
- **Sukuk**: Islamic bonds backed by real assets
- **Takaful**: Cooperative Islamic insurance

**Growing Appeal**

Interestingly, the ethical constraints of Islamic finance have attracted non-Muslim ESG investors. The alignment with environmental, social, and governance principles makes sukuk and Islamic equity funds attractive to impact investors worldwide.

The global Islamic finance industry now manages over $3 trillion in assets and is projected to reach $5.9 trillion by 2026.`,
    author: "Dr. Ibrahim",
    date: "Jul 8, 2026",
    readTime: "15 min",
    category: "Finance",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "4",
    title: "Modest Fashion Trends 2025",
    excerpt: "How modest fashion has moved from niche to mainstream, and the designers leading the global movement.",
    content: `Modest fashion has transcended its religious roots to become a global style movement. The market is now valued at over $277 billion and growing rapidly.

**The Rise of Modest Luxury**

Luxury brands like Dolce & Gabbana, DKNY, and Oscar de la Renta have all launched modest collections. The Ramadan collections from top fashion houses have become highly anticipated annual events.

**Key Trends for 2025**

1. **Oversized silhouettes** — wide-leg trousers, balloon sleeves, and cocoon coats are having a major moment
2. **Textured neutrals** — ivory, camel, sage, and dusty rose in premium fabrics
3. **Layering mastery** — sophisticated coordination of base layers with statement outerwear
4. **Statement headscarves** — bold prints and luxe materials elevated to hero accessories

**Muslim Women Designers**

Designers like Anniesa Hasibuan (Indonesia), Hana Tajima (UK/Japan), and Rani Zakaria are shaping the global aesthetic of modest fashion, earning recognition from New York to Paris fashion weeks.

**Sustainability**

The modest fashion community is increasingly focused on sustainable and ethical production, supporting small artisan workshops and using organic materials. Faith-driven fashion is becoming conscience-driven fashion.`,
    author: "Sarah S.",
    date: "Jul 7, 2026",
    readTime: "6 min",
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=1200&h=600&fit=crop&auto=format&q=80",
  },
]

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = ALL_POSTS.find(p => p.id === id)
  if (!post) return { title: "Post Not Found | Halal Hub" }
  return {
    title: `${post.title} | Halal Hub Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.img] },
  }
}

export function generateStaticParams() {
  return ALL_POSTS.map(p => ({ id: p.id }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = ALL_POSTS.find(p => p.id === id)
  if (!post) notFound()

  const related = ALL_POSTS.filter(p => p.id !== id).slice(0, 3)

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl pb-32 space-y-10 text-foreground">
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="rounded-2xl bg-card shadow-sm border gap-2 mb-2">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Button>
      </Link>

      <div className="space-y-4">
        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 font-black uppercase text-[10px] tracking-[0.2em]">
          {post.category}
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tighter leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground font-medium italic">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
          <span className="font-black text-foreground">{post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime} read</span>
        </div>
      </div>

      <div className="relative w-full h-72 sm:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <Image src={post.img} alt={post.title} fill className="object-cover" priority />
      </div>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n\n').map((para, i) => {
          if (para.startsWith('**') && para.endsWith('**') && !para.slice(2).includes('**')) {
            return <h2 key={i} className="text-2xl font-black mt-8 mb-3">{para.slice(2, -2)}</h2>
          }
          if (para.startsWith('- ') || para.startsWith('1. ')) {
            const items = para.split('\n')
            return (
              <ul key={i} className="space-y-2 my-4 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="text-base font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d.] /, '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </ul>
            )
          }
          return (
            <p key={i} className="text-base font-medium leading-relaxed my-4"
              dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
            />
          )
        })}
      </article>

      {related.length > 0 && (
        <section className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-black">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map(r => (
              <Link key={r.id} href={`/blog/${r.id}`} className="group">
                <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                  <Image src={r.img} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <Badge variant="outline" className="text-[10px] font-black uppercase mb-1">{r.category}</Badge>
                <p className="text-sm font-black leading-tight group-hover:text-primary transition-colors">{r.title}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{r.readTime} read</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
