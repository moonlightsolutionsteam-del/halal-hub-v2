
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Phone, Globe, ShieldCheck, 
  Star, Share2, Heart, Info, MessageSquare,
  CheckCircle2, AlertCircle, Calendar, ArrowLeft,
  ChevronRight, Utensils, Store, ShoppingBag, 
  Sparkles, Plane, CircleDollarSign,
  Coffee, Users, Zap, ShieldAlert,
  Beef, Truck, FileText, Download,
  ShoppingCart, Apple, Milk, CreditCard,
  CookingPot, ClipboardList, Camera, Paintbrush,
  Music, Bed, Waves, Wifi, Tv, Bath, Moon,
  Compass, Briefcase, Shirt, Ruler, Beaker,
  Droplets, FlaskConical, TrendingUp, Scale,
  Lock, Stethoscope, Microscope, Activity,
  Pill, HeartPulse, GraduationCap, School, BookOpen,
  Library, Box
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";

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
    return 'bg-primary';
  };

  const getAccentLight = () => {
    if (isCosmetics) return 'bg-rose-50 text-rose-600';
    if (isFashion) return 'bg-pink-50 text-pink-600';
    if (isTravel) return 'bg-amber-50 text-amber-600';
    if (isHotel) return 'bg-sky-50 text-sky-600';
    if (isEvents) return 'bg-purple-50 text-purple-600';
    if (isCatering) return 'bg-blue-50 text-blue-600';
    if (isGrocery) return 'bg-emerald-50 text-emerald-600';
    if (isButcher) return 'bg-red-50 text-red-600';
    if (isFinance) return 'bg-indigo-50 text-indigo-600';
    if (isHealthcare) return 'bg-teal-50 text-teal-600';
    if (isEducation) return 'bg-violet-50 text-violet-600';
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
    return "Dining Guide";
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

  const getEntityData = () => {
    if (isFinance) return financeData;
    if (isHealthcare) return healthcareData;
    if (isEducation) return educationData;
    return baseData;
  };

  const entityData = getEntityData();

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFB] pb-24 selection:bg-primary/10">
      {/* Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href={getBackLink()} className="flex items-center gap-2 text-sm font-black text-slate-600 hover:text-primary transition-all group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to {getBackLabel()}
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-rose-50 text-rose-500"><Heart className="h-5 w-5" /></Button>
            <Button className={`${getAccentColor()} rounded-2xl font-black text-xs uppercase px-6 hidden sm:flex text-white`}>
              {isEducation ? "Apply Now" : (isFinance ? "Get Consultant" : (isHealthcare ? "Book Appointment" : (isCosmetics ? "Shop Now" : (isFashion ? "Shop Online" : (isTravel ? "Request Itinerary" : (isHotel ? "Book a Room" : (isEvents ? "Check Availability" : (isCatering ? "Request Quote" : (isGrocery ? "Shop Online" : (isButcher ? "Pre-Order" : "Reserve Now")))))))))))}
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={`https://picsum.photos/seed/${id}-hero/1600/1000`}
          alt="Entity Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${getAccentColor()} text-white border-none font-black px-5 py-1.5 rounded-full text-xs shadow-2xl uppercase tracking-[0.2em]`}>{entityData.category}</Badge>
                <Badge variant="outline" className="bg-white/10 backdrop-blur-md text-emerald-400 border-emerald-500/30 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" /> Fully Verified
                </Badge>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">{entityData.name}</h1>
              <div className="flex flex-wrap items-center gap-8 text-white font-bold">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-3xl border border-white/20 shadow-2xl">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                  <span className="text-3xl tracking-tight">{entityData.rating}</span>
                  <span className="text-xs uppercase font-black opacity-60 tracking-widest">({entityData.reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-3 drop-shadow-lg">
                  <div className={`h-10 w-10 ${getAccentColor()} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl">{entityData.location.split(',').length > 1 ? entityData.location.split(',')[1]?.trim() : entityData.location}</span>
                </div>
              </div>
            </div>
            
            {/* Contextual Widget */}
            <Card className="p-8 rounded-[3rem] bg-white border-none shadow-2xl w-full md:w-96 mb-[-4rem] z-10 relative">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    {isEducation ? "School Admissions" : (isFinance ? "Open Shariah Account" : (isHealthcare ? "Schedule a Visit" : (isCosmetics ? "Shop Beauty" : (isFashion ? "Shop Latest Items" : (isTravel ? "Plan Your Trip" : (isHotel ? "Check Rates" : (isEvents ? "Plan Your Event" : (isCatering ? "Get Custom Quote" : (isGrocery ? "Quick Delivery" : (isButcher ? "Order for Pickup" : "Make a Reservation")))))))))))}
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Powered by Halal Hub</p>
                </div>
                
                {isFinance || isHealthcare || isEducation ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-2">
                        {isEducation ? <School className="h-4 w-4 text-violet-600" /> : (isFinance ? <TrendingUp className="h-4 w-4 text-indigo-600" /> : <Clock className="h-4 w-4 text-teal-600" />)}
                        <span className="text-sm font-bold">{isEducation ? "Enrolling Now" : (isFinance ? "Yield: 8.4% - 12%" : "Wait Time: < 15m")}</span>
                      </div>
                      <Badge className={`${isEducation ? "bg-violet-50 text-violet-600" : (isFinance ? "bg-indigo-50 text-indigo-600" : "bg-teal-50 text-teal-600")} border-none text-[10px]`}>
                        {isEducation ? "Vetted Ed" : (isFinance ? "99.8% Comp." : "Verified Hub")}
                      </Badge>
                    </div>
                    <Button className={`w-full h-16 rounded-[1.5rem] ${getAccentColor()} hover:opacity-90 font-black text-lg shadow-xl text-white`}>
                      {isEducation ? "Request Prospectus" : (isFinance ? "Apply Online" : "Book Online")}
                    </Button>
                  </div>
                ) : (
                  <Button className={`w-full h-16 rounded-[1.5rem] ${getAccentColor()} hover:opacity-90 font-black text-lg shadow-xl text-white`}>
                    {isCosmetics ? "Shop Collection" : "Get Started"}
                  </Button>
                )}
                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">Verified Halal Ecosystem Partner</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pt-24 pb-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-[2.5rem] bg-white border shadow-sm h-20 p-2">
                <TabsTrigger value="overview" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>Overview</TabsTrigger>
                <TabsTrigger value="items" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>
                  {isEducation ? "Curriculum" : (isFinance ? "Products" : (isHealthcare ? "Medical Services" : (isCosmetics ? "Catalog" : "Specialties")))}
                </TabsTrigger>
                <TabsTrigger value="reviews" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white data-[state=active]:${getAccentColor()}`}>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* About Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-8 rounded-full ${getAccentColor()}`} />
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">
                      {isEducation ? "The Academy Vision" : (isFinance ? "The Amanah Story" : (isHealthcare ? "Our Care Philosophy" : "About Us"))}
                    </h2>
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    {entityData.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                      <div className={`h-16 w-16 ${getAccentLight()} rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner`}>
                        <ShieldCheck className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Audited By</p>
                        <p className="text-xl font-black text-slate-900">{entityData.verifiedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                      <div className={`h-16 w-16 ${getAccentLight()} rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner`}>
                        <Calendar className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Hub Partner Since</p>
                        <p className="text-xl font-black text-slate-900">{entityData.joined}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance & Ethics */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1 bg-emerald-500 w-8 rounded-full" />
                    <h3 className="text-3xl font-black tracking-tight text-slate-900">Compliance & Ethics</h3>
                  </div>
                  <Card className="rounded-[3rem] border-none bg-emerald-50/50 p-10 overflow-hidden group hover:bg-emerald-50 transition-all border-2 border-emerald-100/50">
                    <CardContent className="p-0 flex flex-col md:flex-row items-start gap-10">
                      <div className="h-24 w-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shrink-0 shadow-2xl shadow-emerald-200 group-hover:scale-110 transition-transform">
                        {isFinance ? <Scale className="h-14 w-14" /> : <CheckCircle2 className="h-14 w-14" />}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-2xl font-black text-emerald-900">{getComplianceTitle()}</h4>
                        <p className="text-emerald-800/80 font-medium text-lg leading-relaxed">
                          {getComplianceText()}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-xs uppercase px-8 h-12 text-white">View Certificates</Button>
                          <Button variant="outline" className="border-emerald-200 bg-white text-emerald-700 rounded-2xl font-black text-xs uppercase px-8 h-12 shadow-sm">Audit Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="items" className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black tracking-tight text-slate-900">
                    {isEducation ? "Program Catalog" : (isFinance ? "Banking Products" : (isHealthcare ? "Medical Catalog" : "Specialties"))}
                  </h3>
                  <Button variant="outline" className="rounded-full font-black text-xs border-2 uppercase tracking-tighter h-10 px-6">
                    <Download className="h-3.5 w-3.5 mr-2" /> Download Details
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {entityData.items.map((item, i) => (
                    <Card key={i} className={`rounded-[2.5rem] border-none shadow-sm overflow-hidden flex items-center gap-8 p-8 hover:shadow-2xl transition-all cursor-pointer group bg-white border-2 border-transparent hover:border-primary/10`}>
                      <div className={`relative h-24 w-24 rounded-3xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-700`}>
                        {isEducation ? <BookOpen className="h-10 w-10" /> : (isFinance ? <TrendingUp className="h-10 w-10" /> : (isHealthcare ? <HeartPulse className="h-10 w-10" /> : <Box className="h-10 w-10" />))}
                      </div>
                      <div className="space-y-2.5 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors`}>{item.name}</h4>
                          <span className={`${isEducation ? 'text-violet-600' : (isHealthcare ? 'text-teal-600' : 'text-indigo-600')} font-black text-xl tracking-tighter whitespace-nowrap`}>{item.price}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 line-clamp-2 italic">{item.desc}</p>
                        {item.popular && (
                          <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${getAccentLight()} border-current px-3 py-1 rounded-full`}>Most Applied</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="text-center space-y-3 shrink-0 md:px-12 md:border-r border-slate-100">
                    <div className="text-8xl font-black text-slate-900 tracking-tighter">{entityData.rating}</div>
                    <div className="flex gap-1.5 justify-center">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{entityData.reviews} Verified Reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-6">
                        <span className="text-sm font-black text-slate-500 w-4">{star}</span>
                        <div className="h-3 bg-slate-100 rounded-full flex-1 overflow-hidden shadow-inner">
                          <div className={`h-full ${getAccentColor()} rounded-full transition-all duration-1000`} style={{ width: star === 5 ? '90%' : star === 4 ? '8%' : '2%' }} />
                        </div>
                        <span className="text-xs font-black text-slate-400 w-12 text-right">{star === 5 ? '90%' : star === 4 ? '8%' : '2%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <Card className={`rounded-[3rem] border-none shadow-sm p-10 bg-white border border-slate-100 group hover:shadow-xl transition-all hover:border-primary/10`}>
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-16 w-16 border-4 border-slate-50 shadow-md">
                          <AvatarImage src={`https://picsum.photos/seed/parent/150/150`} />
                          <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-slate-900">Dr. Sarah Khalil</p>
                          <div className="flex items-center gap-3">
                            <Badge className={`${getAccentLight()} text-[10px] font-black border-none uppercase px-3 py-1 rounded-full`}>Verified Parent</Badge>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Date: 3 weeks ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 bg-slate-50 p-2 rounded-2xl">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic text-xl">
                      "{getCategorySpecificReview()}"
                    </p>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info (Right) */}
          <div className="lg:col-span-4 space-y-10">
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white sticky top-28 border border-slate-100">
              <div className="h-64 bg-muted relative group overflow-hidden">
                <Image src={`https://placehold.co/800x600/png?text=Academy+Location`} alt="Map" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="rounded-full font-black text-xs shadow-2xl px-8 h-12 uppercase tracking-widest"><MapPin className="h-4 w-4 mr-2" /> View Campus</Button>
                </div>
              </div>
              <CardContent className="p-10 space-y-10">
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Campus HQ</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Operating Hours</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${getAccentLight()} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Registrar Office</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.contact.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-50 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className={`${getAccentColor()} hover:opacity-90 text-white rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-xl`}>
                      {isEducation ? "Enrol Now" : "Get Started"}
                    </Button>
                    <Button variant="outline" className="rounded-2xl font-black text-xs uppercase tracking-widest h-14 border-2"><Globe className="h-4 w-4 mr-2" /> Portal</Button>
                  </div>
                  <Button variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-lg transition-all">Download Prospectus</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[3rem] border-none bg-slate-900 shadow-2xl p-12 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShieldAlert className="h-32 w-32 text-white" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className={`h-20 w-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center ${getAccentLight()} mx-auto shadow-2xl border border-white/10`}>
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-black text-white tracking-tight">Academic Aid</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed px-2">
                    Need help with curriculum selection or scholarship applications? Our educational concierge is here to guide you.
                  </p>
                </div>
                <Button className="w-full rounded-2xl font-black bg-white text-slate-900 hover:bg-slate-100 h-16 shadow-2xl text-base tracking-tight transition-transform active:scale-95">
                  Chat with Ed Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
