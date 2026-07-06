
"use client";

import Link from "next/link";
import { 
    Building,
    CalendarDays, 
    Megaphone, 
    BarChart, 
    Clock,
    Users2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ManagementOptionCard = ({ title, icon, href }: { title: string, icon: React.ReactNode, href: string }) => (
    <Link href={href} passHref>
        <Card className="hover:bg-card/80 transition-colors h-full bg-white shadow-md">
            <CardContent className="flex flex-col items-center justify-center text-center p-4 gap-2 aspect-square">
                <div className="text-green-700">{icon}</div>
                <p className="text-xs font-semibold text-green-900">{title}</p>
            </CardContent>
        </Card>
    </Link>
);

export default function MusalliDashboardPage() {

    const musalliOptions = [
        { title: "About Masjid", icon: <Building size={28} />, href: "#" },
        { title: "Salah Timings", icon: <Clock size={28} />, href: "/vendor/mosque/salat" },
        { title: "Announcements", icon: <Megaphone size={28} />, href: "/vendor/mosque/announcements" },
        { title: "Events", icon: <CalendarDays size={28} />, href: "#" },
        { title: "Programs", icon: <BarChart size={28} />, href: "#" },
        { title: "Leadership", icon: <Users2 size={28} />, href: "#" },
    ];

    return (
        <div className="bg-[#F0F5F1] min-h-screen p-4 md:p-6 space-y-6">
            <header className="flex flex-col gap-4 p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Musalli Portal</h1>
                        <h2 className="text-lg font-semibold">Rizwan Masjid</h2>
                    </div>
                    <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarImage src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" alt="Jama Masjid" />
                        <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                </div>
                 <p className="text-sm text-white/80">You have limited access to manage community updates.</p>
            </header>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {musalliOptions.map((item) => (
                    <ManagementOptionCard key={item.title} title={item.title} icon={item.icon} href={item.href} />
                ))}
            </div>

             <Card className="bg-white shadow-md">
                <CardContent className="p-4 flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-600">Terms and Conditions</p>
                </CardContent>
            </Card>
        </div>
    );
}
