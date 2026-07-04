
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Phone, Globe, ShieldCheck, 
  Star, Share2, Heart, MessageSquare,
  CheckCircle2, Calendar, ArrowLeft,
  Utensils, Store, ShoppingBag, 
  Sparkles, Plane, CircleDollarSign,
  Users, Zap, ShieldAlert,
  Beef, Truck, Download,
  CookingPot, Bed,
  Compass, Shirt, Beaker,
  Scale, Stethoscope, GraduationCap,
  BookOpen, Library, Box, TrendingUp, HeartPulse,
  Mic, Video, Newspaper, School
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { useSavedBusinesses } from "@/lib/saved-businesses-context";
import { useToast } from "@/hooks/use-toast";

export default function EntityProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const isButcher = id === "1" || id === "meat-1"; 
  const isGrocery = String(id).startsWith("g");
  const isCatering = String(id).startsWith("c");
  const isEvents = String(id).startsWith("e");
  const isHotel = String(id).startsWith("h") && !String(id).startsWith("hW");
  const isTravel = String(id).startsWith("t");
  const isFashion = String(id).startsWith("f");
  const isCosmetics = String(id).startsWith("co");
  const isFinance = String(id).startsWith("fin");
  const isHealthcare = String(id).startsWith("hW");
  const isEducation = String(id).startsWith("edu");
  const isMedia = String(id).startsWith("med");

  const getAccentColor = () => {
    if (isCosmetics) return 'bg-rose-600';
    if (isFashion) return 'bg-pink-600';
    if (isTravel) return 'bg-amber-600';
    if (isHotel) return 'bg-sky-600';
    if (isEvents) return 'bg-purple-600';
    if (isCatering) return 'bg-blue-600';
    if (isGrocery) return 'bg-emerald-600';
    if (isButcher) return 'bg-red-600';
    if (isFinance) return 'bg-indigo-600';
    if (isHealthcare) return 'bg-teal-600';
    if (isEducation) return 'bg-violet-600';
    if (isMedia) return 'bg-muted-foreground';
    return 'bg-primary';
  };

  const getAccentLight = () => {
    if (isCosmetics) return 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400';
    if (isFashion) return 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400';
    if (isTravel) return 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400';
    if (isHotel) return 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400';
    if (isEvents) return 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400';
    if (isCatering) return 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400';
    if (isGrocery) return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400';
    if (isButcher) return 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400';
    if (isFinance) return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400';
    if (isHealthcare) return 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400';
    if (isEducation) return 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400';
    if (isMedia) return 'bg-muted text-muted-foreground';
    return 'bg-primary/5 text-primary';
  };

  const getBackLink = () => {
    if (isCosmetics) return "/categories/cosmetics";
    if (isFashion) return "/categories/fashion";
    if (isTravel) return "/categories/travel";
    if (isHotel) return "/categories/hotels";
    if (isEvents) return "/categories/events";
    if (isCatering) return "/categories/catering";
    if (isGrocery) return "/categories/grocery";
    if (isButcher) return "/categories/meat";
    if (isFinance) return "/categories/finance";
    if (isHealthcare) return "/categories/healthcare";
    if (isEducation) return "/categories/education";
    if (isMedia) return "/categories/media";
    return "/categories/food";
  };

  const getBackLabel = () => {
    if (isCosmetics) return "Cosmetics & Beauty";
    if (isFashion) return "Fashion & Design";
    if (isTravel) return "Travel & Tourism";
    if (isHotel) return "Hotels & Homestays";
    if (isEvents) return "Event Services";
    if (isCatering) return "Catering Guide";
    if (isGrocery) return "Grocery Guide";
    if (isButcher) return "Meat & Butchers";
    if (isFinance) return "Finance & Banking";
    if (isHealthcare) return "Healthcare & Wellness";
    if (isEducation) return "Education & Training";
    if (isMedia) return "Bookstores & Media";
    return "Dining Guide";
  };

  const getActionButtonLabel = () => {
    if (isEducation) return "Apply Now";
    if (isFinance) return "Get Consultant";
    if (isHealthcare) return "Book Appointment";
    if (isCosmetics) return "Shop Now";
    if (isFashion) return "Shop Online";
    if (isTravel) return "Request Itinerary";
    if (isHotel) return "Book a Room";
    if (isEvents) return "Check Availability";
    if (isCatering) return "Request Quote";
    if (isGrocery) return "Shop Online";
    if (isButcher) return "Pre-Order";
    if (isMedia) return "Order Now";
    return "Reserve Now";
  };

  const getWidgetTitle = () => {
    if (isEducation) return "School Admissions";
    if (isFinance) return "Open Shariah Account";
    if (isHealthcare) return "Schedule a Visit";
    if (isCosmetics) return "Shop Beauty";
    if (isFashion) return "Shop Latest Items";
    if (isTravel) return "Plan Your Trip";
    if (isHotel) return "Check Rates";
    if (isEvents) return "Plan Your Event";
    if (isCatering) return "Get Custom Quote";
    if (isGrocery) return "Quick Delivery";
    if (isButcher) return "Order for Pickup";
    if (isMedia) return "Order Literature";
    return "Make a Reservation";
  };

  const getComplianceTitle = () => {
    if (isCosmetics) return "Lab-Verified Purity Standard";
    if (isFashion) return "Ethical Modesty Standard";
    if (isTravel) return "Trusted Pilgrim Partner";
    if (isHotel) return "Halal Hospitality Standard";
    if (isEvents) return "Shariah-Compliant Hosting";
    if (isCatering) return "Off-site Halal Management";
    if (isGrocery) return "Departmental Halal Assurance";
    if (isFinance) return "Shariah Audit & AAOIFI Standard";
    if (isHealthcare) return "Ethical Medical Practice";
    if (isEducation) return "Halal Educational Standards";
    if (isButcher) return "100% Traceable Sourcing";
    if (isMedia) return "Verified Educational Content";
    return "Food Safety & Halal Quality";
  };

  const getComplianceText = () => {
    if (isCosmetics) return "Our formulations are strictly audited by independent labs to ensure 100% halal compliance. We guarantee zero animal-derived ingredients, zero non-permissible alcohols, and ethical sourcing of all active compounds.";
    if (isFashion) return "We ensure all garments meet strict modesty criteria, including fabric opacity and silhouette standards. Our entire supply chain is audited for ethical labor practices.";
    if (isTravel) return "We partner only with halal-certified hotels and tour operators. Every itinerary is pre-vetted for dietary compliance, prayer facility accessibility, and modest environment standards.";
    if (isHotel) return "Our property is strictly alcohol-free and pork-free. We provide a full-service halal breakfast and in-room amenities like prayer mats and Qibla direction indicators.";
    if (isEvents) return "We provide strict segregation protocols for weddings and events. Our premises include permanent Wudu stations and prayer halls. We enforce a zero-alcohol policy.";
    if (isCatering) return "We maintain a dedicated halal-only logistics chain. From our central kitchen to your venue, we ensure zero cross-contamination and Shariah-compliant presentation.";
    if (isGrocery) return "We conduct monthly audits on our bakery, meat counter, and hot food departments. All animal-derived enzymes and additives in our pantry section are pre-vetted.";
    if (isFinance) return "Our financial products are governed by an independent Shariah Supervisory Board. We strictly adhere to AAOIFI standards, ensuring zero-Riba (interest), zero-Gharar (uncertainty), and no investment in non-permissible industries.";
    if (isHealthcare) return "Our medical services combine modern clinical excellence with Shariah-compliant patient care. We ensure privacy protocols (Awrah), provide gender-segregated waiting areas, and offer Sunnah-based wellness treatments like Hijama performed by certified experts.";
    if (isEducation) return "Our curriculum integrates high academic standards with Islamic moral and spiritual guidance. We ensure gender-segregated learning environments where appropriate, provide on-site prayer facilities, and only serve verified halal nutrition in our canteens.";
    if (isButcher) return "Every product is meticulously verified for ethical sourcing and processing. Our supply chain is 100% free from non-permissible additives and uses traditional methods.";
    if (isMedia) return "All content is vetted by religious scholars to ensure accuracy and adherence to Islamic values. We strictly audit our digital and physical distribution networks for ethical integrity.";
    return "This establishment is fully certified by HMC Global. All ingredients are tracked and audited to ensure they meet the highest standards of halal integrity and hygiene.";
  };

  const getCategorySpecificReview = () => {
    if (isCosmetics) return "Finally, a skincare brand that I can trust implicitly! The serum is amazing and knowing it's lab-verified for wudu-friendliness makes my routine easier.";
    if (isFashion) return "The quality of the silk is unmatched. I finally found an abaya that fits perfectly and respects all my modesty requirements.";
    if (isTravel) return "Our family trip to Spain was perfectly organized. Saffron Travels ensured every meal was halal and we never missed a prayer.";
    if (isHotel) return "The most comfortable and respectful stay I've ever had. Knowing everything was halal certified meant we didn't have to check every label.";
    if (isEvents) return "The ballroom was stunning and the segregation was managed very professionally without making the halls feel cramped.";
    if (isCatering) return "Absolutely impeccable service for our Nikah. The live kebab station was the talk of the night.";
    if (isGrocery) return "The best selection of halal global imports in the city. Their fresh produce is always top quality and the loyalty points add up quickly!";
    if (isFinance) return "Transitioning my business accounts to Amanah was seamless. Their Shariah-compliant Mudarabah funds have shown consistent, ethical growth.";
    if (isHealthcare) return "A wonderful experience. The doctors were highly skilled and deeply respectful of our family values. Having female staff available for my wife was a huge relief.";
    if (isEducation) return "The holistic approach to education here is refreshing. My children are excelling academically while staying deeply connected to their faith and morals.";
    if (isButcher) return "Best quality meat in the city. The transparency about where they source their organic beef is what keeps me coming back.";
    if (isMedia) return "A treasure trove of authentic Islamic literature. The digital courses are well-produced and very easy to follow.";
    return "Absolutely incredible experience. Having full confidence in the halal status allowed our family to truly relax and enjoy.";
  };

  const baseData = {
    name: "The Bosphorus Kitchen",
    category: "Food & Dining",
    type: "Fine Dining",
    location: "123 Broadway, Manhattan, NY 10001",
    rating: 4.8,
    reviews: 124,
    verified: true,
    verifiedBy: "HMC Global",
    joined: "May 2021",
    description: "Bringing authentic flavors to the community with high-fidelity service and 100% certified halal standards.",
    contact: { phone: "+1 (212) 555-0198", website: "https://halal-hub.com", hours: "Mon - Sat: 11:00 AM - 11:00 PM" },
    items: [
      { name: "Premium Offering A", desc: "A best-selling verified item.", price: "$24.00", popular: true },
      { name: "Signature Dish B", desc: "Crafted with ethcial ingredients.", price: "$18.50", popular: true },
    ]
  };

  const educationData = {
    ...baseData,
    name: "Iman Knowledge Academy",
    category: "Education & Training",
    type: "K-12 Academy",
    location: "Educational Hub, London NW1 4RY",
    rating: 4.9,
    reviews: 215,
    verifiedBy: "Independent Education Board",
    description: "Iman Knowledge Academy is dedicated to providing a balanced education where academic excellence meets spiritual growth. Our curriculum is designed to nurture the next generation of ethical leaders.",
    items: [
      { name: "Primary Curriculum", desc: "Holistic foundation for children aged 5-11.", price: "Full Term", popular: true },
      { name: "Advanced Hifz Program", desc: "Specialized Quranic memorization track with scholar oversight.", price: "Monthly", popular: true },
      { name: "STEM & Faith Lab", desc: "Integrating science and technology with Islamic ethical frameworks.", price: "Elective", popular: false },
    ]
  };

  const financeData = {
    ...baseData,
    name: "Amanah Islamic Bank",
    category: "Finance & Banking",
    type: "Retail Banking",
    location: "Financial District, Manhattan, NY 10005",
    rating: 4.9,
    reviews: 850,
    verifiedBy: "Shariah Supervisory Board",
    description: "Amanah Islamic Bank is a leader in Shariah-compliant retail and investment banking. We provide ethical financial solutions that empower individuals and businesses while strictly adhering to Islamic principles of finance.",
    items: [
      { name: "Real Estate Sukuk", desc: "Asset-backed investment with quarterly profit distribution.", price: "From $10k", popular: true },
      { name: "SME Mudarabah Fund", desc: "Profit-sharing investment in local halal businesses.", price: "From $5k", popular: true },
      { name: "Shariah Savings Account", desc: "Zero-interest, fee-free account with competitive profit sharing.", price: "No Min.", popular: false },
    ]
  };

  const healthcareData = {
    ...baseData,
    name: "Safe Care Medical Hub",
    category: "Healthcare & Wellness",
    type: "Multi-Specialty Clinic",
    location: "Upper West Side, Manhattan, NY 10024",
    rating: 4.9,
    reviews: 450,
    verifiedBy: "Medical Ethics Board",
    description: "Safe Care Medical Hub provides high-quality clinical services with a focus on patient dignity and Shariah-compliant care. We offer general medicine, pediatrics, and specialized Sunnah-based wellness treatments.",
    items: [
      { name: "Family GP Consult", desc: "Comprehensive health check for adults and children.", price: "$120", popular: true },
      { name: "Hijama Therapy Session", desc: "Traditional wet cupping performed by certified practitioners.", price: "$85", popular: true },
      { name: "Nutrition Coaching", desc: "Sunnah-based diet plans for weight management and chronic health.", price: "$60", popular: false },
    ]
  };

  const mediaData = {
    ...baseData,
    name: "Noor Islamic Media",
    category: "Bookstores & Media",
    type: "Publisher & Bookstore",
    location: "Culture District, London E1 6QL",
    rating: 4.9,
    reviews: 320,
    verifiedBy: "Content Ethics Committee",
    description: "Noor Islamic Media is a premier destination for authentic Islamic literature and digital education. We curate a selection of classical texts and modern scholarship to inspire and educate the global Ummah.",
    items: [
      { name: "The Sealed Nectar", desc: "Classic biography of the Prophet (PBUH) - Deluxe Edition.", price: "£25.00", popular: true },
      { name: "Tajweed Masterclass", desc: "Complete digital course with interactive exercises.", price: "£45.00", popular: true },
      { name: "Kids Story Prophet Set", desc: "Engaging illustrated set for ages 5-10.", price: "£18.00", popular: false },
    ]
  };

  const getEntityData = () => {
    if (isFinance) return financeData;
    if (isHealthcare) return healthcareData;
    if (isEducation) return educationData;
    if (isMedia) return mediaData;
    return baseData;
  };

  const entityData = getEntityData();
  const { isSaved, toggleSaved } = useSavedBusinesses();
  const { toast } = useToast();
  const entityId = String(id);
  const savedHere = isSaved(entityId);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entityData.name + " " + entityData.location)}`;

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: entityData.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied", description: "Listing link copied to clipboard." });
      }
    } catch {}
  };

  const handleSave = () => {
    toggleSaved({ id: entityId, name: entityData.name, category: entityData.category, location: entityData.location });
    toast({ title: savedHere ? "Removed from Saved" : "Saved", description: savedHere ? `${entityData.name} removed from your saved places.` : `${entityData.name} added to your saved places.` });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 selection:bg-primary/10">
      <div className="bg-card/80 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href={getBackLink()} className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-all group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to {getBackLabel()}
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted" onClick={handleShare} aria-label="Share listing"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500" onClick={handleSave} aria-label="Save listing"><Heart className={savedHere ? "h-5 w-5 fill-rose-500" : "h-5 w-5"} /></Button>
            <Link href={`/entities/${id}/report`}><Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted" aria-label="Report listing"><ShieldAlert className="h-5 w-5" /></Button></Link>
            <Button className={`${getAccentColor()} rounded-2xl font-black text-xs uppercase px-6 hidden sm:flex text-white`}>
              {getActionButtonLabel()}
            </Button>
          </div>
        </div>
      </div>

      <section className="relative h-[45vh] sm:h-[55vh] min-h-[300px] sm:min-h-[500px] w-full overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${id}-hero/1600/1000`}
          alt="Entity Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-12">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-end gap-4 sm:gap-10">
            <div className="space-y-3 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className={`${getAccentColor()} text-white border-none font-black px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs shadow-2xl uppercase tracking-[0.2em]`}>{entityData.category}</Badge>
                <Badge variant="outline" className="bg-card/10 backdrop-blur-md text-emerald-400 border-emerald-500/30 font-black px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" /> Fully Verified
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">{entityData.name}</h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-8 text-white font-bold">
                <div className="flex items-center gap-2 sm:gap-3 bg-card/10 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 fill-amber-400 text-amber-400" />
                  <span className="text-xl sm:text-3xl tracking-tight">{entityData.rating}</span>
                  <span className="text-[10px] sm:text-xs uppercase font-black opacity-60 tracking-widest">({entityData.reviews})</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 drop-shadow-lg">
                  <div className={`h-8 w-8 sm:h-10 sm:w-10 ${getAccentColor()} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="text-base sm:text-xl">{entityData.location.split(',').length > 1 ? entityData.location.split(',')[1]?.trim() : entityData.location}</span>
                </div>
              </div>
            </div>

            <Card className="hidden sm:block p-8 rounded-[3rem] bg-card border-none shadow-soft-lg ring-1 ring-white/40 dark:ring-white/5 w-full md:w-96 mb-[-4rem] z-10 relative before:absolute before:inset-0 before:-z-10 before:rounded-[3rem] before:bg-primary/20 before:blur-3xl before:opacity-40 before:scale-95">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-foreground">{getWidgetTitle()}</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Powered by Halal Hub</p>
                </div>
                
                {(isFinance || isHealthcare || isEducation || isMedia) ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                      <div className="flex items-center gap-2">
                        {isEducation ? <School className="h-4 w-4 text-violet-600" /> : (isFinance ? <TrendingUp className="h-4 w-4 text-indigo-600" /> : (isMedia ? <BookOpen className="h-4 w-4 text-muted-foreground" /> : <Clock className="h-4 w-4 text-teal-600" />))}
                        <span className="text-sm font-bold">
                          {isEducation ? "Enrolling Now" : (isFinance ? "Yield: 8.4% - 12%" : (isMedia ? "Stock Available" : "Wait Time: < 15m"))}
                        </span>
                      </div>
                      <Badge className={`${isEducation ? "bg-violet-50 text-violet-600" : (isFinance ? "bg-indigo-50 text-indigo-600" : (isMedia ? "bg-muted text-muted-foreground" : "bg-teal-50 text-teal-600"))} border-none text-[10px]`}>
                        {isEducation ? "Vetted Ed" : (isFinance ? "99.8% Comp." : (isMedia ? "Verified Content" : "Verified Hub"))}
                      </Badge>
                    </div>
                    <Button className={`w-full h-16 rounded-[1.5rem] ${getAccentColor()} hover:opacity-90 font-black text-lg shadow-xl text-white`}>
                      {isEducation ? "Request Prospectus" : (isFinance ? "Apply Online" : (isMedia ? "Shop Collection" : "Book Online"))}
                    </Button>
                  </div>
                ) : (
                  <Link href={`/entities/${id}/reserve`} className="block">
                    <Button className={`w-full h-16 rounded-[1.5rem] ${getAccentColor()} hover:opacity-90 font-black text-lg shadow-xl text-white`}>
                      {getActionButtonLabel()}
                    </Button>
                  </Link>
                )}
                <p className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-tighter">Verified Halal Ecosystem Partner</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 pt-4 sm:pt-24 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16">
          <div className="lg:col-span-8 space-y-8 sm:space-y-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-2xl sm:rounded-[2.5rem] bg-card border shadow-sm h-14 sm:h-20 p-1.5 sm:p-2">
                <TabsTrigger value="overview" className={`rounded-xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>Overview</TabsTrigger>
                <TabsTrigger value="items" className={`rounded-xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>
                  {isEducation ? "Courses" : (isFinance ? "Products" : (isHealthcare ? "Services" : (isCosmetics ? "Catalog" : (isMedia ? "Library" : "Menu"))))}
                </TabsTrigger>
                <TabsTrigger value="gallery" className={`rounded-xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>Gallery</TabsTrigger>
                <TabsTrigger value="reviews" className={`rounded-xl sm:rounded-[2rem] font-black text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 sm:mt-12 space-y-8 sm:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-8 rounded-full ${getAccentColor()}`} />
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                      {isEducation ? "The Academy Vision" : (isFinance ? "The Amanah Story" : (isHealthcare ? "Our Care Philosophy" : (isMedia ? "Our Mission" : "About Us")))}
                    </h2>
                  </div>
                  <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-medium">
                    {entityData.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-8">
                    <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-8 bg-card rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm border border-border group hover:shadow-xl transition-all">
                      <div className={`h-12 w-12 sm:h-16 sm:w-16 ${getAccentLight()} rounded-xl sm:rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner shrink-0`}>
                        <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Audited By</p>
                        <p className="text-base sm:text-xl font-black text-foreground">{entityData.verifiedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-8 bg-card rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm border border-border group hover:shadow-xl transition-all">
                      <div className={`h-12 w-12 sm:h-16 sm:w-16 ${getAccentLight()} rounded-xl sm:rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner shrink-0`}>
                        <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Hub Partner Since</p>
                        <p className="text-base sm:text-xl font-black text-foreground">{entityData.joined}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1 bg-primary w-8 rounded-full" />
                    <h3 className="text-xl sm:text-3xl font-black tracking-tight text-foreground">Compliance & Ethics</h3>
                  </div>
                  <Card className="rounded-2xl sm:rounded-[3rem] border-none bg-primary/5 p-5 sm:p-10 overflow-hidden group hover:bg-primary/[0.08] transition-all duration-250 border-2 border-primary/10 shadow-soft-md">
                    <CardContent className="p-0 flex flex-col md:flex-row items-start gap-5 sm:gap-10">
                      <div className="h-16 w-16 sm:h-24 sm:w-24 bg-primary rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center text-primary-foreground shrink-0 shadow-glow-primary group-hover:scale-110 transition-transform duration-250">
                        {isFinance ? <Scale className="h-8 w-8 sm:h-14 sm:w-14" /> : <CheckCircle2 className="h-8 w-8 sm:h-14 sm:w-14" />}
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-lg sm:text-2xl font-black text-foreground">{getComplianceTitle()}</h4>
                        <p className="text-foreground/70 font-medium text-sm sm:text-lg leading-relaxed">
                          {getComplianceText()}
                        </p>
                        <div className="pt-2 sm:pt-4 flex flex-wrap gap-3 sm:gap-4">
                          <Link href={`/entities/${id}/verify`}><Button className="rounded-2xl font-black text-xs uppercase px-5 sm:px-8 h-10 sm:h-12">View Certificates</Button></Link>
                          <Button variant="outline" className="rounded-2xl font-black text-xs uppercase px-5 sm:px-8 h-10 sm:h-12">Audit Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="items" className="mt-6 sm:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 sm:space-y-10">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight text-foreground">
                    {isEducation ? "Program Catalog" : (isFinance ? "Banking Products" : (isHealthcare ? "Medical Catalog" : (isMedia ? "Latest Releases" : "Specialties")))}
                  </h3>
                  <Button variant="outline" className="rounded-full font-black text-xs border-2 uppercase tracking-tighter h-10 px-4 sm:px-6 shrink-0">
                    <Download className="h-3.5 w-3.5 sm:mr-2" /> <span className="hidden sm:inline">Download Details</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  {entityData.items.map((item, i) => (
                    <Card key={i} className={`rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm overflow-hidden flex items-center gap-4 sm:gap-8 p-4 sm:p-8 hover:shadow-2xl transition-all cursor-pointer group bg-card border-2 border-transparent hover:border-primary/10`}>
                      <div className={`relative h-16 w-16 sm:h-24 sm:w-24 rounded-2xl sm:rounded-3xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-700`}>
                        {isEducation ? <BookOpen className="h-10 w-10" /> : (isFinance ? <TrendingUp className="h-10 w-10" /> : (isHealthcare ? <HeartPulse className="h-10 w-10" /> : (isMedia ? <Newspaper className="h-10 w-10" /> : <Box className="h-10 w-10" />)))}
                      </div>
                      <div className="space-y-2.5 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors`}>{item.name}</h4>
                          <span className={`${isEducation ? 'text-violet-600' : (isHealthcare ? 'text-teal-600' : 'text-indigo-600')} font-black text-xl tracking-tighter whitespace-nowrap`}>{item.price}</span>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground line-clamp-2 italic">{item.desc}</p>
                        {item.popular && (
                          <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${getAccentLight()} border-current px-3 py-1 rounded-full`}>Most Applied</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6 sm:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 sm:space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight text-foreground">Photos & Videos</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`relative rounded-[2rem] overflow-hidden bg-muted ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"} group cursor-pointer hover:shadow-xl transition-all`}>
                      <Image
                        src={`https://picsum.photos/seed/${id}-gallery-${i}/800/600`}
                        alt={`Gallery image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {i === 3 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`h-14 w-14 ${getAccentColor()} rounded-full flex items-center justify-center shadow-2xl`}>
                            <Zap className="h-6 w-6 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground font-bold uppercase tracking-widest pt-4">All photos are property of the listed business</p>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 sm:mt-12 space-y-6 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-12 items-center bg-card p-5 sm:p-12 rounded-2xl sm:rounded-[3rem] border border-border shadow-sm">
                  <div className="text-center space-y-3 shrink-0 md:px-12 md:border-r border-border">
                    <div className="text-6xl sm:text-8xl font-black text-foreground tracking-tighter">{entityData.rating}</div>
                    <div className="flex gap-1.5 justify-center">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{entityData.reviews} Verified Reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-6">
                        <span className="text-sm font-black text-muted-foreground w-4">{star}</span>
                        <div className="h-3 bg-muted rounded-full flex-1 overflow-hidden shadow-inner">
                          <div className={`h-full ${getAccentColor()} rounded-full transition-all duration-1000`} style={{ width: star === 5 ? '90%' : star === 4 ? '8%' : '2%' }} />
                        </div>
                        <span className="text-xs font-black text-muted-foreground w-12 text-right">{star === 5 ? '90%' : star === 4 ? '8%' : '2%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <Card className={`rounded-2xl sm:rounded-[3rem] border-none shadow-sm p-5 sm:p-10 bg-card border border-border group hover:shadow-xl transition-all hover:border-primary/10`}>
                    <div className="flex justify-between items-start mb-5 sm:mb-8 gap-3">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-4 border-border shadow-md shrink-0">
                          <AvatarImage src={`https://picsum.photos/seed/reviewer/150/150`} />
                          <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-base sm:text-xl font-black text-foreground">Dr. Sarah Khalil</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <Badge className={`${getAccentLight()} text-[10px] font-black border-none uppercase px-3 py-1 rounded-full`}>Verified Member</Badge>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">3 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 sm:gap-1 bg-muted p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shrink-0">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed italic text-base sm:text-xl">
                      "{getCategorySpecificReview()}"
                    </p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-4 space-y-6 sm:space-y-10">
            <Card className="rounded-2xl sm:rounded-[3rem] border-none shadow-2xl overflow-hidden bg-card sticky top-28 border border-border">
              <div className="h-48 sm:h-64 bg-muted relative group overflow-hidden">
                <Image src={`https://placehold.co/800x600/png?text=Entity+Location`} alt="Map" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-zinc-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><Button variant="secondary" className="rounded-full font-black text-xs shadow-2xl px-8 h-12 uppercase tracking-widest"><MapPin className="h-4 w-4 mr-2" /> Get Directions</Button></a>
                </div>
              </div>
              <CardContent className="p-5 sm:p-10 space-y-6 sm:space-y-10">
                <div className="space-y-5 sm:space-y-8">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-foreground leading-snug hover:text-primary transition-colors">{entityData.location}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Operating Hours</p>
                      <p className="text-base font-bold text-foreground leading-snug">{entityData.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Contact Office</p>
                      <a href={`tel:${entityData.contact.phone.replace(/[^+\d]/g, "")}`} className="text-base font-bold text-foreground leading-snug hover:text-primary transition-colors">{entityData.contact.phone}</a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className={`${getAccentColor()} hover:opacity-90 text-white rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-xl`}>
                      {getActionButtonLabel()}
                    </Button>
                    <Button variant="outline" className="rounded-2xl font-black text-xs uppercase tracking-widest h-14 border-2"><Globe className="h-4 w-4 mr-2" /> Portal</Button>
                  </div>
                  <Button variant="secondary" className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-lg transition-all">Download Info</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl sm:rounded-[3rem] border-none bg-zinc-900 shadow-2xl p-6 sm:p-12 text-center space-y-6 sm:space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShieldAlert className="h-32 w-32 text-white" />
              </div>
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className={`h-16 w-16 sm:h-20 sm:w-20 bg-card/10 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] flex items-center justify-center ${getAccentLight()} mx-auto shadow-2xl border border-white/10`}>
                  {isMedia ? <Library className="h-8 w-8 sm:h-10 sm:w-10 text-white" /> : <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-white" />}
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="text-xl sm:text-3xl font-black text-white tracking-tight">{isMedia ? "Resource Aid" : "Verification Aid"}</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed px-2">
                    {isMedia ? "Need help with finding specific literature or digital courses? Our concierge is here to guide you." : "Need help with audits or certification selection? Our trust support team is here to guide you."}
                  </p>
                </div>
                <Button className="w-full rounded-2xl font-black bg-card text-foreground hover:bg-muted h-12 sm:h-16 shadow-2xl text-sm sm:text-base tracking-tight transition-transform active:scale-95">
                  Chat with Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="sm:hidden fixed bottom-20 left-4 right-4 z-30">
        <div className="glass-strong rounded-2xl shadow-soft-lg ring-1 ring-white/40 dark:ring-white/5 p-3">
          <Button className={`w-full ${getAccentColor()} hover:opacity-90 text-white rounded-xl font-black text-sm uppercase tracking-widest h-14`}>
            {getActionButtonLabel()}
          </Button>
        </div>
      </div>
    </div>
  );
}
