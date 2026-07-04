
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, Search, Filter, MoreHorizontal, 
  ShieldAlert, Mail, MapPin, UserCheck 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: "Ahmed Abdullah", email: "ahmed@example.com", role: "Consumer", location: "London, UK", status: "Active" },
    { id: 2, name: "Sarah Khan", email: "sarah@halalapp.com", role: "Vendor", location: "New York, USA", status: "Active" },
    { id: 3, name: "Omar Farooq", email: "omar@creators.com", role: "Creator", location: "Dubai, UAE", status: "Suspended" },
    { id: 4, name: "Fatima Zahra", email: "fatima@example.com", role: "Consumer", location: "Paris, FR", status: "Active" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline">User Directory</h1>
          <p className="text-muted-foreground font-medium">Manage and audit all 1.2M platform participants.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">Bulk Actions</Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">Create Admin</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Users", value: "1,142,502", color: "text-primary" },
          { label: "Banned", value: "1,240", color: "text-red-500" },
          { label: "Pending Verification", value: "842", color: "text-amber-500" },
          { label: "New Today", value: "+2.4k", color: "text-blue-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <CardHeader className="p-8 border-b space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users by name, email or ID..." className="pl-9 h-12 rounded-2xl bg-muted/30 border-none" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="font-bold gap-2"><Filter className="h-4 w-4" /> Filters</Button>
              <Button variant="ghost" className="font-bold gap-2"><Mail className="h-4 w-4" /> Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="px-8 h-14 font-black text-xs uppercase text-muted-foreground">User</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Role</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Location</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-xs uppercase text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/5 border-muted/20">
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={`https://picsum.photos/seed/user${user.id}/100/100`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full px-4 font-black uppercase text-[9px] tracking-widest">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {user.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="h-5 w-5" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
