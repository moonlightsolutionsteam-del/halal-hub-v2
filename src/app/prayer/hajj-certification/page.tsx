
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HajjCertificationPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSwear = () => {
        toast({
            title: "Hajj Badge Awarded!",
            description: "Congratulations! The Hajj badge has been added to your profile.",
        });
        router.push('/profile');
    }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-8 h-full">
      <div className="w-48 h-48 relative">
        <Image
          src="https://i.imgur.com/gYw5uks.png"
          alt="Hajj Badge"
          width={192}
          height={192}
          className="object-contain"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-headline">Complete the Hajj</h1>
        <p className="text-muted-foreground max-w-sm">
          I swear to Allah that I pilgrimaged to Mecca and completed the sacred Hajj
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Button onClick={handleSwear} size="lg" className="w-full h-12 text-lg bg-green-600 hover:bg-green-700">
          I swear to Allah
        </Button>
        <p className="text-xs text-muted-foreground">
          After completing the Hajj, you can obtain the badge of 'Hajj', one of
          the five pillars of Islam, and it will be displayed on your profile
          page.
        </p>
      </div>
    </div>
  );
}
