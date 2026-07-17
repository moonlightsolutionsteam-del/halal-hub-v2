import { createClient } from "@/lib/supabase/client"

export async function logErpActivity(opts: {
  employeeName: string
  action: string
  module: string
  recordType?: string
  recordId?: string
  recordTitle?: string
  oldValue?: object
  newValue?: object
}) {
  const supabase = createClient()
  await supabase.from("erp_activity_logs").insert({
    employee_name: opts.employeeName,
    action: opts.action,
    module: opts.module,
    record_type: opts.recordType ?? null,
    record_id: opts.recordId ?? null,
    record_title: opts.recordTitle ?? null,
    old_value: opts.oldValue ?? null,
    new_value: opts.newValue ?? null,
  })
}
