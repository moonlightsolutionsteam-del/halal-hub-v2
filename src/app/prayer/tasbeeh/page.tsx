
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  Edit,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const dhikrPresets = [
  { name: "SubhanAllah", target: 33, arabic: "سبحان الله", meaning: "Glory be to Allah" },
  { name: "Alhamdulillah", target: 33, arabic: "الحمد لله", meaning: "Praise be to Allah" },
  { name: "Allahu Akbar", target: 33, arabic: "الله أكبر", meaning: "Allah is the Greatest" },
  { name: "La ilaha illallah", target: 100, arabic: "لا إله إلا الله", meaning: "There is no god but Allah" },
];

const beadStyles = [
    { name: "Emerald", color: "bg-emerald-500" },
    { name: "Sapphire", color: "bg-blue-500" },
    { name: "Ruby", color: "bg-red-500" },
    { name: "Amethyst", color: "bg-purple-500" },
];

export default function TasbeehPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(dhikrPresets[0]);
  const [beadPosition, setBeadPosition] = useState(0);
  const [activeBeadStyle, setActiveBeadStyle] = useState(beadStyles[0]);

  const target = selectedDhikr.target;

  const handleIncrement = () => {
    let newCount = count + 1;
    if (newCount > target) {
      setRound(round + 1);
      newCount = 1;
    }
    setCount(newCount);
    setBeadPosition(beadPosition + 1);
  };

  const handleReset = () => {
    setCount(0);
    setRound(0);
    setBeadPosition(0);
  };

  const handlePresetChange = (value: string) => {
    const selected = dhikrPresets.find(p => p.name === value);
    if (selected) {
      setSelectedDhikr(selected);
      handleReset();
    }
  };

  const Bead = ({ index, total }: { index: number, total: number }) => {
    const angle = (index / total) * 360;
    const isActive = index < beadPosition % total;
    return (
      <div
        className="absolute w-full h-full"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div
          className={cn(
            "absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300",
            isActive
              ? `${activeBeadStyle.color} shadow-lg shadow-emerald-500/50`
              : "bg-white/10"
          )}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <header className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <Select onValueChange={handlePresetChange} defaultValue={selectedDhikr.name}>
          <SelectTrigger className="w-auto bg-transparent border-0 text-lg font-bold focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dhikrPresets.map((preset) => (
              <SelectItem key={preset.name} value={preset.name}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Edit />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Brightness</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Bright</DropdownMenuItem>
                        <DropdownMenuItem>Dim</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Font Size</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Small</DropdownMenuItem>
                        <DropdownMenuItem>Medium</DropdownMenuItem>
                        <DropdownMenuItem>Large</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                 <DropdownMenuItem>Sound</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Card className="bg-white/5 border-white/10 w-full max-w-sm mb-4">
            <CardContent className="p-6 text-center">
                <p className="text-4xl font-['Alegreya'] leading-relaxed">{selectedDhikr.arabic}</p>
                <p className="text-lg text-gray-400 italic">{selectedDhikr.name}</p>
                <p className="text-lg font-semibold text-gray-300">"{selectedDhikr.meaning}"</p>
            </CardContent>
        </Card>

        <div className="flex items-center gap-4 text-2xl">
            <p>Round: <span className="font-bold">{round + 1}</span></p>
            <p>Count: <span className="font-bold">{count}/{target}</span></p>
        </div>
      </div>

       <div className="relative flex items-center justify-center h-80 w-80 mx-auto my-8" onClick={handleIncrement}>
        <div className="absolute inset-0">
          {[...Array(33)].map((_, i) => <Bead key={i} index={i} total={33} />)}
        </div>
        <div className="w-48 h-48 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-6xl font-bold font-mono cursor-pointer">
          {count}
        </div>
      </div>


      <footer className="p-4 space-y-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 bg-white/5 p-2 rounded-full">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white"><ChevronLeft /></Button>
                {beadStyles.map(style => (
                    <button key={style.name} onClick={() => setActiveBeadStyle(style)}>
                        <div className={cn("w-8 h-8 rounded-full border-2", activeBeadStyle.name === style.name ? "border-white" : "border-transparent", style.color)}></div>
                    </button>
                ))}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white"><ChevronRight /></Button>
            </div>
            
            <Button variant="secondary" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" onClick={handleReset}>
                <RotateCcw className="text-white"/>
            </Button>
      </footer>
    </div>
  );
}
