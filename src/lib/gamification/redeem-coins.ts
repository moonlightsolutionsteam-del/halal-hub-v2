"use server"

import { createClient } from "@/lib/supabase/server"

export type RedeemCoinsResult =
  | { ok: true; coinsSpent: number; discountInr: number; newBalance: number }
  | { ok: false; reason: string }

export async function redeemCoins(
  userId: string,
  coinsToSpend: number,
  opts?: { context?: string; referenceId?: string; description?: string }
): Promise<RedeemCoinsResult> {
  const supabase = await createClient()

  // Load config
  const { data: config } = await supabase
    .from("coin_config")
    .select("coins_per_rupee, min_redeem_coins")
    .eq("id", 1)
    .single()

  const coinsPerRupee = config?.coins_per_rupee ?? 10
  const minCoins = config?.min_redeem_coins ?? 50

  if (coinsToSpend < minCoins) {
    return { ok: false, reason: `Minimum redemption is ${minCoins} HC` }
  }

  // Check current balance
  const { data: levelRow } = await supabase
    .from("user_levels")
    .select("current_balance")
    .eq("user_id", userId)
    .single()

  const currentBalance = levelRow?.current_balance ?? 0
  if (currentBalance < coinsToSpend) {
    return { ok: false, reason: `Insufficient balance (have ${currentBalance} HC, need ${coinsToSpend} HC)` }
  }

  const discountInr = parseFloat((coinsToSpend / coinsPerRupee).toFixed(2))
  const newBalance = currentBalance - coinsToSpend

  // Write debit to coin_ledger
  const { error: ledgerErr } = await supabase.from("coin_ledger").insert({
    user_id: userId,
    amount: -coinsToSpend,
    balance_after: newBalance,
    action_type: opts?.context ?? "order_discount",
    description: opts?.description ?? `Redeemed ${coinsToSpend} HC for ₹${discountInr} discount`,
    reference_id: opts?.referenceId ?? null,
  })
  if (ledgerErr) return { ok: false, reason: ledgerErr.message }

  // Write redemption record
  await supabase.from("coin_redemptions").insert({
    user_id: userId,
    coins_spent: coinsToSpend,
    discount_inr: discountInr,
    context: opts?.context ?? "order_discount",
    reference_id: opts?.referenceId ?? null,
    description: opts?.description ?? null,
  })

  // Update balances
  await supabase.from("user_levels").update({ current_balance: newBalance }).eq("user_id", userId)
  await supabase.from("profiles").update({ halal_coins_balance: newBalance }).eq("id", userId)

  return { ok: true, coinsSpent: coinsToSpend, discountInr, newBalance }
}
