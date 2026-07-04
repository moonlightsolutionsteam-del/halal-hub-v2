
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

export default function ShahadahPage() {

    const playAudio = () => {
        // In a real app, you would implement audio playback here
        console.log("Playing Shahadah audio...");
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 flex items-center justify-center min-h-full">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">The Shahadah</CardTitle>
                    <CardDescription>The Declaration of Faith</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-8">
                    <div className="space-y-2">
                        <p className="text-4xl md:text-5xl font-['Alegreya'] leading-relaxed">
                            أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ
                        </p>
                        <p className="text-lg text-muted-foreground italic">
                            Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadan Rasulu-llah.
                        </p>
                    </div>

                    <div className="space-y-2">
                         <p className="text-lg font-semibold">
                            "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah."
                        </p>
                    </div>

                    <Button onClick={playAudio} size="lg" className="w-full">
                        <Volume2 className="mr-2 h-5 w-5" />
                        Listen to Pronunciation
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
