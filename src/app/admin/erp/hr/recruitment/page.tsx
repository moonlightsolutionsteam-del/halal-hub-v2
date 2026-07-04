
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Users, FileText, Briefcase, DollarSign } from "lucide-react"

const openPositions = [
  { title: "Lead Frontend Developer", department: "Engineering", status: "Open", candidates: 12 },
  { title: "Senior Sales Executive", department: "Sales", status: "Open", candidates: 25 },
  { title: "Marketing Intern", department: "Marketing", status: "Interviewing", candidates: 5 },
];

const recentCandidates = [
    { name: "Aisha Khan", role: "Lead Frontend Developer", stage: "Screening" },
    { name: "Yusuf Ibrahim", role: "Senior Sales Executive", stage: "Interview" },
    { name: "Fatima Al-Sayed", role: "Marketing Intern", stage: "Offer" },
];

export default function RecruitmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Recruitment</h1>
        <p className="text-muted-foreground">Manage your hiring pipeline from job creation to onboarding.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Actively hiring</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Candidates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interviews This Week</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 pending feedback</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hired This Month</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Lead Developer</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Open Positions</CardTitle>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Job Opening
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Candidates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openPositions.map((position) => (
                <TableRow key={position.title}>
                  <TableCell className="font-medium">{position.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{position.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={position.status === 'Open' ? 'secondary' : 'default'}>{position.status}</Badge>
                  </TableCell>
                  <TableCell>{position.candidates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applying for</TableHead>
                <TableHead>Stage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCandidates.map((candidate) => (
                <TableRow key={candidate.name}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.role}</TableCell>
                  <TableCell>
                    <Badge>{candidate.stage}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
