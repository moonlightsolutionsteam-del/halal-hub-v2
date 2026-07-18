"use client"

import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

type Employee = { id: string; name: string; initials: string | null; role: string | null; department: string | null; manager: string | null; status: string | null }

type OrgNode = Employee & { children: OrgNode[] }

function buildTree(employees: Employee[]): OrgNode[] {
  const nameMap: Record<string, OrgNode> = {}
  employees.forEach(e => { nameMap[e.name] = { ...e, children: [] } })

  const roots: OrgNode[] = []
  employees.forEach(e => {
    const node = nameMap[e.name]
    if (!e.manager || !nameMap[e.manager]) {
      roots.push(node)
    } else {
      nameMap[e.manager].children.push(node)
    }
  })
  return roots
}

function TreeNode({ node, isRoot = false }: { node: OrgNode; isRoot?: boolean }) {
  return (
    <div className={cn("flex items-start", !isRoot && "pl-8 border-l border-border ml-7")}>
      {!isRoot && <div className="h-px w-8 mt-6 bg-border shrink-0" />}
      <div className="w-64 shrink-0">
        <Card className="p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-sm">{node.initials ?? node.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{node.name}</p>
              <p className="text-xs text-muted-foreground truncate">{node.role ?? "—"}</p>
              {node.department && <p className="text-xs text-muted-foreground truncate">{node.department}</p>}
            </div>
          </div>
          {node.status && node.status !== "Active" && (
            <Badge variant="outline" className="mt-2 text-xs">{node.status}</Badge>
          )}
        </Card>
        {node.children.length > 0 && (
          <div className="mt-4 space-y-4">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrgChartPage() {
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_employees")
      .select("id, name, initials, role, department, manager, status")
      .eq("status", "Active")
      .order("name")
      .then(({ data }) => { setEmployees(data ?? []); setLoading(false) })
  }, [])

  const tree = React.useMemo(() => buildTree(employees), [employees])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Organisation Chart</h1>
        <p className="text-muted-foreground">Team structure and reporting hierarchy.</p>
      </div>

      <div className="bg-background rounded-lg p-4 md:p-8 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : tree.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">No employee data available.</p>
        ) : (
          <div className="inline-block min-w-full space-y-6 pb-8">
            {tree.map(root => <TreeNode key={root.id} node={root} isRoot />)}
          </div>
        )}
      </div>
    </div>
  )
}
