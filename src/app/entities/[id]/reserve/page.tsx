
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckSquare,
  Clock,
  Minus,
  Plus,
  Users,
  QrCode,
  Camera,
  X,
  Keyboard,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

const lunchSlots = ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"];
const dinnerSlots = ["07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"];

export default function ReservePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { user } = useAuth();

  const [guestCount, setGuestCount] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date().toISOString().split('T')[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


   useEffect(() => {
    let stream: MediaStream | null = null;
    if (isScanning) {
      const getCameraPermission = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
          setIsScanning(false);
        }
      };
      getCameraPermission();
    }
    
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isScanning, toast]);


  const doCheckIn = async () => {
    if (!user) {
      toast({ variant: "destructive", title: "Sign in required", description: "Please sign in to check in." });
      return false;
    }
    const supabase = createClient()
    const { error } = await (supabase as any).from("check_ins").insert({
      business_id: id,
      user_id: user.uid,
    })
    if (error) {
      toast({
        variant: "destructive",
        title: "Couldn't check in",
        description: error.code === "23505" ? "You've already checked in here today." : error.message,
      });
      return false;
    }
    return true;
  };

  const handleGpsCheckIn = async () => {
    if (!(await doCheckIn())) return;
    toast({
      title: "Checked In!",
      description: "You've successfully checked in and earned loyalty coins.",
    });
    router.back();
  };

  const handleCodeCheckIn = async () => {
    if (!(await doCheckIn())) return;
    toast({
      title: "Checked In!",
      description: "You've successfully checked in via code and earned loyalty coins.",
    });
    setIsCodeDialogOpen(false);
    router.back();
  };

  const findTable = async () => {
     if (!selectedTime) {
      toast({
        variant: "destructive",
        title: "No Time Selected",
        description: "Please select a time slot for your reservation.",
      });
      return;
    }
    if (!user) {
      toast({ variant: "destructive", title: "Sign in required", description: "Please sign in to reserve a table." });
      return;
    }
    setIsSubmitting(true);
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_reservations").insert({
      business_id: id,
      user_id: user.uid,
      guest_count: guestCount,
      reservation_date: reservationDate,
      time_slot: selectedTime,
    })
    setIsSubmitting(false);
    if (error) {
      toast({ variant: "destructive", title: "Couldn't reserve table", description: error.message });
      return;
    }
    toast({
      title: "Table Reserved!",
      description: `Your table for ${guestCount} at ${selectedTime} has been booked.`,
    });
    router.back();
  };
  
  if (isScanning) {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <header className="flex items-center justify-between p-4 bg-black/50">
                 <h2 className="text-lg font-semibold text-white">Scan QR Code</h2>
                 <Button variant="ghost" size="icon" onClick={() => setIsScanning(false)}>
                    <X className="h-6 w-6 text-white"/>
                </Button>
            </header>
            <div className="relative flex-1 flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                 <div className="absolute inset-0 flex items-center justify-center p-8">
                     <div className="w-full max-w-xs aspect-square border-4 border-dashed border-white/50 rounded-2xl animate-pulse" />
                 </div>
                 <div className="absolute bottom-10 left-0 right-0 p-4 text-center">
                     {hasCameraPermission === false && (
                         <Alert variant="destructive">
                              <AlertTitle>Camera Access Required</AlertTitle>
                              <AlertDescription>
                                Please allow camera access in your browser settings to scan QR codes.
                              </AlertDescription>
                        </Alert>
                     )}
                     <p className="text-white/80 mt-4">Point your camera at the QR code</p>
                 </div>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Check-in Options</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary"/>
            Let the business know you're here to earn <strong>10 coins!</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <Button onClick={handleGpsCheckIn} className="h-auto flex-col gap-2 p-4" variant="outline">
            <CheckSquare className="h-8 w-8 text-primary" />
            <span className="text-center">GPS Check-in</span>
          </Button>
           <Button onClick={() => setIsScanning(true)} className="h-auto flex-col gap-2 p-4" variant="outline">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-center">Scan QR Code</span>
          </Button>
           <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
            <DialogTrigger asChild>
                <Button className="h-auto flex-col gap-2 p-4" variant="outline">
                    <Keyboard className="h-8 w-8 text-primary" />
                    <span className="text-center">Enter Code</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Check-in Code</DialogTitle>
                    <DialogDescription>
                        Ask the staff for the 4-digit code to check in.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Input placeholder="1234" maxLength={4} className="text-center text-2xl h-14 font-bold tracking-[1em]" />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCodeDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCodeCheckIn}>Submit</Button>
                </DialogFooter>
            </DialogContent>
           </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Make a Reservation</CardTitle>
          <CardDescription>Book a table in advance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Number of Guests
            </Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-bold w-12 text-center">
                {guestCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuestCount((c) => c + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Select Date
            </Label>
            <Input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
          </div>

          <div className="space-y-2">
             <Label className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Select Time
            </Label>
            <Tabs defaultValue="lunch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lunch">Lunch</TabsTrigger>
                <TabsTrigger value="dinner">Dinner</TabsTrigger>
              </TabsList>
              <TabsContent value="lunch" className="mt-4">
                <div className="grid grid-cols-3 gap-2">
                    {lunchSlots.map((time) => (
                        <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </Button>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="dinner" className="mt-4">
                 <div className="grid grid-cols-3 gap-2">
                    {dinnerSlots.map((time) => (
                        <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </Button>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <Button size="lg" className="w-full h-12" onClick={findTable} disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Find a Table"}
      </Button>
    </div>
  );
}
