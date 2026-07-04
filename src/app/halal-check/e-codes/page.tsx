
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Info, CheckCircle, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const eCodes = [
    { code: 'E100', name: 'Curcumin', status: 'Halal', source: 'Plant-based' },
    { code: 'E120', name: 'Cochineal, Carminic acid', status: 'Haram', source: 'Insect-derived' },
    { code: 'E422', name: 'Glycerol', status: 'Mushbooh', source: 'Can be from animal or plant fat' },
    { code: 'E441', name: 'Gelatine', status: 'Haram', source: 'Animal-derived (if not from Halal source)' },
    { code: 'E471', name: 'Mono- and diglycerides of fatty acids', status: 'Mushbooh', source: 'Can be from animal or plant fat' },
    { code: 'E904', name: 'Shellac', status: 'Haram', source: 'Insect-derived' },
    { code: 'E920', name: 'L-cysteine', status: 'Mushbooh', source: 'Can be derived from human hair, feathers, or synthetically' },
];

const statusStyles: { [key: string]: string } = {
    'Halal': 'bg-green-100 text-green-800 border-green-200',
    'Haram': 'bg-red-100 text-red-800 border-red-200',
    'Mushbooh': 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const statusIcons: { [key: string]: React.ReactNode } = {
    'Halal': <CheckCircle className="h-5 w-5" />,
    'Haram': <XCircle className="h-5 w-5" />,
    'Mushbooh': <AlertTriangle className="h-5 w-5" />
};

export default function ECodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredECodes = eCodes.filter((e) => {
    const matchesSearch =
      e.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              E-Code Directory
            </CardTitle>
            <CardDescription>
              Search for E-Numbers to check their Halal status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search E-Code or name..."
                className="pl-10 h-11 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Halal">Halal</SelectItem>
                    <SelectItem value="Haram">Haram</SelectItem>
                    <SelectItem value="Mushbooh">Mushbooh</SelectItem>
                </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/30 border-secondary">
          <CardContent className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-1"/>
              <div>
                <p className="font-semibold text-sm">Disclaimer</p>
                <p className="text-xs text-muted-foreground">The information provided is for guidance only. Halal status can vary based on the source. Always verify with the product manufacturer if in doubt.</p>
              </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredECodes.map((eCode) => (
            <Card key={eCode.code}>
              <CardContent className="p-4 flex items-start gap-4">
                 <div className={cn("p-2 rounded-lg", statusStyles[eCode.status])}>
                    {statusIcons[eCode.status]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{eCode.code} - {eCode.name}</h3>
                    <Badge className={cn("text-xs", statusStyles[eCode.status])}>{eCode.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Source: {eCode.source}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredECodes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No E-Codes match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
