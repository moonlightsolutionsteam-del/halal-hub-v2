
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  TrendingUp,
  Star,
  Users,
  Target,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const performanceReviews = [
  {
    employee: "Yasar Khan",
    initials: "YK",
    type: "Quarterly Review (Q3)",
    status: "Pending Manager Review",
    dueDate: "2024-08-15",
  },
  {
    employee: "Vinayak kainthla",
    initials: "VK",
    type: "Annual Appraisal",
    status: "Completed",
    dueDate: "2024-07-20",
  },
  {
    employee: "Sheikh",
    initials: "SH",
    type: "Probation Review",
    status: "Pending Employee Self-Review",
    dueDate: "2024-08-10",
  },
];

const teamGoals = [
    { team: "Sales", progress: 80, status: "On Track" },
    { team: "Engineering", progress: 65, status: "On Track" },
    { team: "Marketing", progress: 95, status: "Exceeding" },
]

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed": return "secondary";
        case "Pending Manager Review":
        case "Pending Employee Self-Review":
            return "default";
        default: return "outline";
    }
}

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Performance Management</h1>
        <p className="text-muted-foreground">
          Track goals, manage reviews, and improve team productivity.
        </p>
      </div>

       <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Excellent</div>
                <p className="text-xs text-muted-foreground">Avg. target achievement: 92%</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-xs text-muted-foreground">Manager action required</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Vinayak K.</div>
                <p className="text-xs text-muted-foreground">110% of Q3 sales target</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Performance Improvement Plan active</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Performance Reviews</CardTitle>
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Start New Review Cycle
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Review Type</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {performanceReviews.map((review) => (
                                <TableRow key={review.employee}>
                                    <TableCell className="font-medium">{review.employee}</TableCell>
                                    <TableCell>{review.type}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(review.status)}>{review.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Team Goal Progress (Q3)</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                        {teamGoals.map(team => (
                            <div key={team.team}>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-sm">{team.team}</h4>
                                    <span className="text-xs font-bold">{team.progress}%</span>
                                </div>
                                <Progress value={team.progress} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
  )
}
