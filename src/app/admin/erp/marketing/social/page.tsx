"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Users,
  Heart,
  MessageSquare,
  Repeat,
  PlusCircle,
  MoreHorizontal,
  Link2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const XIcon = (props: any) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m18.901 1.153 3.68 1.84-9.49 19.48-3.68-1.84L18.901 1.153z" />
    <path d="M8.404 1.153 4.724 2.993 14.214 22.47l3.68-1.84L8.404 1.153z" />
  </svg>
);


const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 285.9 333.3"
    {...props}
    className="h-5 w-5"
  >
    <path d="M208.2 0c-35.2 0-66.3 21.6-79.3 52.8V219c0 13.2-10.8 24-24 24s-24-10.8-24-24V52.8c0-29-23.8-52.8-52.8-52.8S0 23.8 0 52.8v163.4c0 62.3 50.7 113 113 113s113-50.7 113-113V156.4c.2-35.9 29.3-64.8 65.2-64.8h4.5c29 0 52.8 23.8 52.8 52.8s-23.8 52.8-52.8 52.8h-4.5c-13.2 0-24 10.8-24 24s10.8 24 24 24h4.5c62.3 0 113-50.7 113-113S270.5 0 208.2 0z" />
  </svg>
);


const kpiData = [
  { title: "Total Followers", value: "1.8M", change: "+50k this month", icon: <Users /> },
  { title: "Engagement Rate", value: "4.2%", change: "+0.5%", icon: <Heart /> },
  { title: "Posts This Week", value: "25", change: "", icon: <MessageSquare /> },
  { title: "Total Reach (Week)", value: "3.2M", change: "+12%", icon: <Repeat /> },
];

const socialAccounts = [
    { platform: "Instagram", handle: "@halalhub.official", icon: <Instagram />, followers: "1.2M", connected: true },
    { platform: "Facebook", handle: "/halalhub", icon: <Facebook />, followers: "500K", connected: true },
    { platform: "X (Twitter)", handle: "@halalhub", icon: <XIcon className="h-4 w-4 fill-current"/>, followers: "85K", connected: false },
    { platform: "YouTube", handle: "HalalHubTV", icon: <Youtube />, followers: "25K", connected: true },
]

const recentPosts = [
    { platform: <Instagram className="h-4 w-4"/>, content: "Post about new Halal restaurant in Bangalore...", likes: "12k", comments: "345", date: "2h ago" },
    { platform: <Facebook className="h-4 w-4"/>, content: "Shared blog post: 'The Beauty of Ramadan'", likes: "5.2k", comments: "128", date: "8h ago" },
    { platform: <Twitter className="h-4 w-4"/>, content: "Quick poll: What's your favorite Iftar snack?", likes: "1.2k", comments: "450", date: "Yesterday" },
]


export default function SocialMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Social Media Center</h1>
        <p className="text-muted-foreground">Monitor performance, schedule posts, and manage your social accounts.</p>
      </div>

       <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            {kpiData.map((item) => (
                <Card key={item.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <div className="text-muted-foreground">{item.icon}</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">{item.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Connected Accounts</CardTitle>
                     <Button asChild size="sm">
                        <Link href="/SKIP_ADMIN_ERP/marketing/social/connect">
                            <Link2 className="mr-2 h-4 w-4" />
                            Connect Account
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {socialAccounts.map(account => (
                        <Card key={account.platform} className="bg-secondary/50">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-background rounded-lg">{account.icon}</div>
                                    <h3 className="font-bold">{account.platform}</h3>
                                </div>
                                <p className="text-2xl font-bold">{account.followers}</p>
                                <p className="text-xs text-muted-foreground truncate">{account.handle}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <Badge variant={account.connected ? 'secondary' : 'destructive'}>
                                        {account.connected ? 'Connected' : 'Not Connected'}
                                    </Badge>
                                    <Button variant="ghost" size="sm">Manage</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="grid gap-4 sm:gap-6 grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                         <CardTitle>Recent Posts</CardTitle>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/SKIP_ADMIN_ERP/marketing/social/posts">View All</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Content</TableHead>
                                <TableHead>Stats</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentPosts.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="flex items-start gap-3">
                                            {post.platform}
                                            <div>
                                                <p className="font-medium truncate max-w-xs">{post.content}</p>
                                                <p className="text-xs text-muted-foreground">{post.date}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                     <TableCell>
                                        <div className="flex flex-col text-xs">
                                            <span>{post.likes} Likes</span>
                                            <span>{post.comments} Comments</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                     <div className="flex justify-between items-center">
                        <CardTitle>Content Calendar</CardTitle>
                        <Button asChild size="sm">
                            <Link href="/SKIP_ADMIN_ERP/marketing/social/schedule">Schedule Post</Link>
                        </Button>
                    </div>
                    <CardDescription>View and manage your upcoming social media posts.</CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
                    <p className="text-muted-foreground">Calendar view coming soon...</p>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
