
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const orgData = {
  name: "Super Admin",
  role: "Platform Owner",
  avatar: "https://picsum.photos/seed/superadmin/100",
  children: [
    {
      name: "Vinayak kainthla",
      role: "Sales Head",
      avatar: "https://picsum.photos/seed/vinayak/100",
      children: [
        { name: "Yasar Khan", role: "Sales Executive", avatar: "https://picsum.photos/seed/yasar/100", children: [] },
        { name: "MOHAMMED HUZAIFA", role: "Sales Executive", avatar: "https://picsum.photos/seed/huzaifa/100", children: [] },
        { name: "Sheikh", role: "Content Creator", avatar: "https://picsum.photos/seed/sheikh/100", children: [] },
      ],
    },
    {
      name: "Ovais",
      role: "Lead Developer",
      avatar: "https://picsum.photos/seed/ovais/100",
      children: [],
    },
  ],
};

const TreeNode = ({ node, isRoot = false }: { node: any, isRoot?: boolean }) => (
  <div className={cn(
    "flex items-center",
    !isRoot && "pl-8 border-l border-muted-foreground ml-7"
  )}>
    {!isRoot && <div className="h-px w-8 bg-muted-foreground" />}
    <Card className="w-64 p-3 bg-card shadow-md shrink-0">
       <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
                <AvatarImage src={node.avatar} />
                <AvatarFallback>{node.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-sm">{node.name}</p>
                <p className="text-xs text-muted-foreground">{node.role}</p>
            </div>
       </div>
    </Card>
  </div>
);

const OrgTree = ({ node, isRoot = false }: { node: any, isRoot?: boolean }) => {
  if (!node) return null;

  return (
    <div className={cn("space-y-4", !isRoot && "mt-4")}>
      <TreeNode node={node} isRoot={isRoot} />
      {node.children && node.children.length > 0 && (
        <div className={cn("space-y-4", !isRoot && "ml-4")}>
          {node.children.map((child: any, index: number) => (
            <OrgTree key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function OrgChartPage() {
  return (
    <div className="bg-background rounded-lg p-4 md:p-8">
        <div className="overflow-x-auto pb-8">
            <div className="inline-block min-w-full">
                <OrgTree node={orgData} isRoot />
            </div>
        </div>
    </div>
  );
}
    