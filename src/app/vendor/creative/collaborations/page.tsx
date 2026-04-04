'use client';

import * as React from 'react';
import {
  Users2,
  Search,
  Filter,
  MessageSquare,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  UserPlus,
  ShieldCheck,
  Zap,
  HandHeart,
  Info,
  Store,
  Briefcase,
  Landmark,
  Smartphone,
  ArrowLeft,
  Star,
  Timer,
  ChevronRight,
  Target,
  BarChart3,
  Globe,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Input} from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {Progress} from '@/components/ui/progress';
import Link from 'next/link';
import Image from 'next/image';
import {cn} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

const REQUESTS = [
  {
    id: 1,
    brand: 'The Bosphorus Kitchen',
    type: 'Fine Dining Feature',
    budget: '₹15,000',
    status: 'New',
    date: '2h ago',
    match: 98,
    requirements: '1 Reel, 2 Stories',
    timeline: 'Due in 14 days',
  },
  {
    id: 2,
    brand: 'Pure Glow Beauty',
    type: 'Skincare Series',
    budget: '₹45,000',
    status: 'Priority',
    date: '5h ago',
    match: 92,
    requirements: '3 Reels, 1 Blog Post',
    timeline: 'Due in 21 days',
  },
  {
    id: 3,
    brand: 'Umrah Deluxe',
    type: 'Vlog Sponsorship',
    budget: '₹1,20,000',
    status: 'Draft',
    date: 'Yesterday',
    match: 85,
    requirements: 'Full Itinerary Feature',
    timeline: 'Jan 2025',
  },
];

export default function CollaborationsHubPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-7xl pb-24 text-slate-900">
      {/* Top Header Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link
            href="/vendor/creative/dashboard"
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />{' '}
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-[1.5rem] bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
              <Users2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-headline tracking-tight text-slate-900">
                Collaborations Hub
              </h1>
              <p className="text-muted-foreground font-medium text-lg italic">
                Strategic brand partnerships and sponsored content pipeline.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-2xl px-6 font-black border-2 h-14 bg-white shadow-sm gap-2"
          >
            <Target className="h-4 w-4 text-primary" /> Discovery Hub
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-14 text-white">
            <Zap className="mr-2 h-4 w-4" /> Find New Deals
          </Button>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Active Collabs',
            value: '4',
            trend: '+2',
            sub: 'Ongoing Projects',
            icon: HandHeart,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Pipeline Value',
            value: '₹1.2M',
            trend: 'High',
            sub: 'Potential Revenue',
            icon: Landmark,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Partner Rating',
            value: '4.9',
            trend: 'Elite',
            sub: 'Based on 12 brands',
            icon: Star,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
          },
          {
            label: 'Avg. ROI',
            value: '3.2x',
            trend: '+0.4',
            sub: 'Value for Brands',
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-sm rounded-[2.5rem] p-8 bg-white group hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
                  {stat.label}
                </span>
                <div className="text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </div>
              </div>
              <div
                className={cn(
                  'h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform',
                  stat.bg,
                  stat.color
                )}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-0.5">
              <p className={cn('text-xs font-black uppercase', stat.color)}>
                {stat.trend}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {stat.sub}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Pipeline Manager */}
        <div className="lg:col-span-8 space-y-8">
          <Tabs defaultValue="requests" className="w-full">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-2 rounded-2xl border shadow-sm mb-8 overflow-x-auto no-scrollbar">
              <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
                <TabsTrigger
                  value="requests"
                  className="rounded-xl px-8 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  New Requests
                </TabsTrigger>
                <TabsTrigger
                  value="ongoing"
                  className="rounded-xl px-8 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Ongoing
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="rounded-xl px-8 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Archive
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 pr-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    placeholder="Filter by brand..."
                    className="h-9 w-48 pl-9 rounded-xl bg-slate-50 border-none text-xs font-medium"
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border">
                  <Filter className="h-4 w-4 text-slate-400" />
                </Button>
              </div>
            </div>

            <TabsContent
              value="requests"
              className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {REQUESTS.map((req) => (
                <Card
                  key={req.id}
                  className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all duration-500 group"
                >
                  <div className="p-8 flex flex-col md:flex-row gap-10">
                    <div className="relative w-full md:w-48 aspect-square rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl group-hover:scale-[1.02] transition-transform">
                      <Image
                        src={`https://picsum.photos/seed/collab-brand-${req.id}/400/400`}
                        alt="Brand"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-md text-primary border-none font-black text-[9px] uppercase px-3 h-6 w-full flex items-center justify-center gap-1.5 shadow-xl">
                          <CheckCircle2 className="h-3 w-3" /> VERIFIED BRAND
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2 min-w-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                              {req.type}
                            </p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">
                              {req.brand}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                              Synergy Score
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-black text-emerald-600">
                                {req.match}%
                              </span>
                              <Progress
                                value={req.match}
                                className="h-1.5 w-12 bg-slate-50"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Scope of Work
                            </p>
                            <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                              <Smartphone className="h-3.5 w-3.5 text-blue-500" />{' '}
                              {req.requirements}
                            </p>
                          </div>
                          <div className="space-y-1 text-right sm:text-left">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Proposed Budget
                            </p>
                            <p className="text-sm font-black text-slate-900 flex items-center justify-end sm:justify-start gap-2">
                              <Landmark className="h-3.5 w-3.5 text-emerald-500" />{' '}
                              {req.budget}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-50 mt-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            <Clock className="h-3.5 w-3.5" /> Received {req.date}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                            <Timer className="h-3.5 w-3.5" /> {req.timeline}
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            variant="outline"
                            className="flex-1 sm:flex-none rounded-xl h-11 px-8 font-black text-[10px] uppercase tracking-widest border-2"
                          >
                            Discuss Terms
                          </Button>
                          <Button className="flex-1 sm:flex-none rounded-xl h-11 px-8 font-black text-[10px] uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
                            Accept Deal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent
              value="ongoing"
              className="m-0 py-20 text-center space-y-6 animate-in fade-in duration-500"
            >
              <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
                <BarChart3 className="h-10 w-10" />
              </div>
              <p className="text-slate-400 font-medium italic">
                No active production tasks. Start a new collaboration from the
                Requests tab.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Strategic Support Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                Market Trends
              </h3>
              <TrendingUp className="h-5 w-5 text-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-6">
              {[
                {
                  label: 'Ethical Beauty',
                  val: 95,
                  color: 'bg-rose-500',
                  trend: 'High Demand',
                },
                {
                  label: 'Heritage Travel',
                  val: 78,
                  color: 'bg-amber-500',
                  trend: 'Growing',
                },
                {
                  label: 'Sunnah Wellness',
                  val: 62,
                  color: 'bg-teal-500',
                  trend: 'Steady',
                },
              ].map((trend, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{trend.label}</span>
                    <span className="text-primary">{trend.trend}</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        trend.color
                      )}
                      style={{width: `${trend.val}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full rounded-xl h-12 font-black text-[10px] uppercase border-2 bg-white"
            >
              Full Market Insights
            </Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden shadow-2xl">
            <Sparkles className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
            <div className="relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/10 shadow-3xl group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight leading-tight">
                  Verification Power
                </h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                  Creators with a verified "Scholarly Board Audit" receive 3x
                  more premium brand requests.
                </p>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-xl">
                Start Hub Audit
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" /> Collaboration Tips
            </h3>
            <div className="space-y-4">
              <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                "Brands are looking for high-fidelity storytelling. Consider
                adding a 'Behind the Scenes' story to your proposals to increase
                win rate."
              </p>
              <div className="h-px bg-slate-50" />
              <Link
                href="#"
                className="flex items-center justify-between text-[10px] font-black uppercase text-primary tracking-widest hover:gap-2 transition-all"
              >
                Download Media Kit Template <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
