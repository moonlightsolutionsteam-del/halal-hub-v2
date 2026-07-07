
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MessageCircle,
  Users,
  MapPin,
  Calendar as CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const upcomingAppointments = [
  {
    title: "Marriage Counseling Session",
    imam: "Imam Ahmad Rahman",
    date: "Tomorrow at 2:00 PM",
    location: "Al-Noor Islamic Center",
    status: "Confirmed",
  },
  {
    title: "Quran Study Session",
    imam: "Imam Abdullah Al-Faisal",
    date: "Friday at 4:30 PM",
    location: "Islamic Society Center",
    status: "Confirmed",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="bg-background min-h-full">
      <div className="p-4 md:p-8">
        <header className="text-center mb-8">
          <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary">
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/50.jpg"
              alt="Ask Your Imam"
            />
            <AvatarFallback>AYI</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-headline font-bold">Ask Your Imam</h1>
          <p className="text-muted-foreground">
            Get Islamic guidance and answers to your questions from qualified
            local imams
          </p>
        </header>

        <div className="max-w-2xl lg:max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center justify-center space-x-2 mb-6 p-1 bg-secondary rounded-full">
            <Button
              className="flex-1 rounded-full"
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/prayer/ask-imam">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Link>
            </Button>
            <Button
              className="flex-1 rounded-full"
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/prayer/choose-imam">
                <Users className="mr-2 h-4 w-4" />
                Choose Imam
              </Link>
            </Button>
            <Button
              className="flex-1 rounded-full bg-background text-foreground hover:bg-background/90"
              size="sm"
              asChild
            >
              <Link href="/prayer/appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </Link>
            </Button>
          </div>

          {/* Upcoming Appointments Section */}
          <div className="space-y-4">
            <h2 className="font-bold font-headline text-xl">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.map((appt, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{appt.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        with {appt.imam}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {appt.status}
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{appt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{appt.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Schedule New Appointment Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  Schedule New Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Imam</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Imam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmad-rahman">
                        Imam Ahmad Rahman - Al-Noor Islamic Center
                      </SelectItem>
                      <SelectItem value="abdullah-al-faisal">
                        Imam Abdullah Al-Faisal - Islamic Society Center
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Purpose</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guidance">
                        Islamic Guidance
                      </SelectItem>
                      <SelectItem value="counseling">
                        Marriage Counseling
                      </SelectItem>
                       <SelectItem value="study">
                        Quran Study
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input id="time" type="time" />
                 </div>
                 <Button className="w-full">Request Appointment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
