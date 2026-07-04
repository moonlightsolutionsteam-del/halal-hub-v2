
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Shield,
  User,
  Building,
  Landmark,
  UserCheck,
  Briefcase,
  Code,
  DollarSign,
  Megaphone,
  Activity,
  HeartHandshake,
  LogIn,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link";

const departments = [
  { 
    name: "Platform Administration", 
    icon: <Shield className="h-6 w-6 text-destructive" />,
    roles: [
      { name: "Super Admin", description: "Full access to all platform features and settings." },
      { name: "Admin", description: "Privileged access to moderate content and manage users." },
    ],
    href: "/admin/dashboard"
  },
  { 
    name: "Sales",
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    roles: [
        { name: "Sales Head", description: "Manages the sales team and targets." },
        { name: "Sales Executive", description: "On-field sales and business onboarding." },
    ],
    href: "/admin/sales"
  },
  { 
    name: "Marketing",
    icon: <Megaphone className="h-6 w-6 text-primary" />,
    roles: [
        { name: "Marketing Head", description: "Manages marketing campaigns and branding." },
        { name: "Social Media Manager", description: "Handles social media presence." },
    ],
    href: "/admin/marketing"
  },
   { 
    name: "Operations",
    icon: <Activity className="h-6 w-6 text-primary" />,
    roles: [
        { name: "Operations Head", description: "Oversees business verifications and support." },
        { name: "Support Executive", description: "Handles customer and business support tickets." },
    ],
    href: "/admin/operations"
  },
  { 
    name: "Engineering",
    icon: <Code className="h-6 w-6 text-primary" />,
    roles: [
        { name: "Lead Developer", description: "Manages the development team and sprints." },
        { name: "Software Developer", description: "Works on platform features and bug fixes." },
    ],
    href: "/admin/engineering"
  },
  { 
    name: "HR",
    icon: <HeartHandshake className="h-6 w-6 text-primary" />,
    roles: [
        { name: "HR Manager", description: "Manages recruitment, attendance, and employee relations." },
    ],
    href: "/admin/hr"
  },
];


const platformRoles = [
  {
    name: "Business Owner",
    description: "Manages their own business profile, listings, and posts.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    name: "Mosque Admin",
    description: "Manages a specific mosque's profile and announcements.",
    icon: <Landmark className="h-6 w-6 text-primary" />,
  },
  {
    name: "Creator",
    description: "Content creators with special privileges for posting.",
    icon: <UserCheck className="h-6 w-6 text-primary" />,
  },
  {
    name: "Consumer",
    description: "Standard user with access to all public features.",
    icon: <User className="h-6 w-6 text-muted-foreground" />,
  },
];

export default function SuperAdminRolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Roles & Permissions</h1>
        <p className="text-muted-foreground">Define what different user types can see and do on the platform.</p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Internal Team Roles</CardTitle>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Role
                </Button>
            </div>
            <CardDescription>Roles for employees and administrators of Halal Hub.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {departments.map((dept) => (
                <Card key={dept.name} className="bg-secondary/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {dept.icon}
                                <CardTitle className="font-headline text-xl">{dept.name}</CardTitle>
                            </div>
                            <Button asChild>
                                <Link href={dept.href}>
                                    <LogIn className="mr-2 h-4 w-4"/>
                                    Login as {dept.name}
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pl-10">
                        {dept.roles.map(role => (
                            <div key={role.name}>
                                <h4 className="font-semibold">{role.name}</h4>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Platform User Roles</CardTitle>
            </div>
             <CardDescription>Roles for the users and partners on the Halal Hub platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {platformRoles.map((role) => (
                <Card key={role.name}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                {role.icon}
                                <div>
                                    <CardTitle className="font-headline text-xl">{role.name}</CardTitle>
                                    <CardDescription>{role.description}</CardDescription>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Edit Permissions</Button>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
