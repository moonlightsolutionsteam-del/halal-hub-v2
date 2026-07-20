import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendOrderConfirmationEmail } from "@/lib/email/send"
import type { OrderItem } from "@/lib/email/templates/order-confirmation"

// Called server-side after a marketplace order is created.
// Body: { orderId: string }
// Looks up the order from DB, resolves customer email, sends confirmation.
export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 })

    const supabase = await createClient()

    // Verify caller is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Fetch order with items and business name
    const { data: order, error: orderErr } = await (supabase as any)
      .from("business_orders")
      .select(`
        id,
        total_amount,
        delivery_fee,
        delivery_address,
        created_at,
        buyer:profiles!business_orders_buyer_id_fkey(name, email),
        business:businesses!business_orders_business_id_fkey(name),
        items:business_order_items(name, quantity, unit_price)
      `)
      .eq("id", orderId)
      .single()

    if (orderErr || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const customerEmail = order.buyer?.email ?? user.email
    if (!customerEmail) {
      return NextResponse.json({ error: "No customer email" }, { status: 400 })
    }

    const items: OrderItem[] = (order.items ?? []).map((i: any) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.unit_price,
    }))

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const deliveryFee = order.delivery_fee ?? 0

    const result = await sendOrderConfirmationEmail(customerEmail, {
      orderId: order.id,
      customerName: order.buyer?.name,
      businessName: order.business?.name ?? "the vendor",
      items,
      subtotal,
      deliveryFee,
      total: order.total_amount ?? subtotal + deliveryFee,
      deliveryAddress: order.delivery_address,
      orderDate: new Date(order.created_at).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      }),
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error("[api/email/order-confirmation]", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
