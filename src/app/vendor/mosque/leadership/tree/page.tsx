
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const leadershipData = {
  name: "Jama Masjid Committee",
  isCommittee: true,
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  children: [
    {
      name: "Syed Ahmed Bukhari",
      role: "Shahi Imam",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      children: [
        {
          name: "Syed Shaban Bukhari",
          role: "Naib Shahi Imam",
          avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        },
      ],
    },
    {
      name: "Management Staff",
      role: "Operations",
      isGroup: true,
      avatar: "https://randomuser.me/api/portraits/men/30.jpg",
      children: [
        { name: "Yusuf Khan", role: "Administrator", avatar: "https://randomuser.me/api/portraits/men/31.jpg" },
        { name: "Omar Farooq", role: "Treasurer", avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
      ],
    },
  ],
};

const TreeNode = ({ node }: { node: any }) => (
    <div className="flex flex-col items-center text-center">
        <Card className={cn(
            "w-36 p-3",
            node.isCommittee ? "bg-primary/20 border-primary" : "bg-card"
        )}>
            <Avatar className="w-16 h-16 mx-auto mb-2 border-2 border-primary/50">
                <AvatarImage src={node.avatar} />
                <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-sm">{node.name}</p>
            {node.role && <p className="text-xs text-muted-foreground">{node.role}</p>}
        </Card>
    </div>
);

const ConnectionLine = () => (
  <div className="w-0.5 h-8 bg-muted-foreground/30" />
);

const LeadershipTree = ({ node }: { node: any }) => {
  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      <TreeNode node={node} />
      {node.children && node.children.length > 0 && (
        <>
          <ConnectionLine />
          <div className="flex gap-8 md:gap-16 items-start relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-full bg-muted-foreground/30"></div>
            {node.children.map((child: any, index: number) => (
               <div key={index} className="relative flex flex-col items-center">
                 <div className="absolute top-0 w-0.5 h-8 bg-muted-foreground/30"></div>
                 <LeadershipTree node={child} />
               </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default function LeadershipTreePage() {
  return (
    <div className="bg-background rounded-lg p-4 md:p-8">
        <div className="overflow-x-auto pb-8">
            <div className="flex justify-center min-w-max">
                <LeadershipTree node={leadershipData} />
            </div>
        </div>
    </div>
  );
}
