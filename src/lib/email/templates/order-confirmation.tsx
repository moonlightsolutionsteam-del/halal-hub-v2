import {
  Body, Button, Container, Head, Heading, Html,
  Preview, Section, Text, Tailwind, Hr, Row, Column,
} from "@react-email/components"

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface OrderConfirmationProps {
  orderId: string
  customerName?: string
  businessName: string
  items: OrderItem[]
  subtotal: number
  deliveryFee?: number
  total: number
  deliveryAddress?: string
  estimatedTime?: string
  orderDate?: string
}

export function OrderConfirmationEmail({
  orderId,
  customerName,
  businessName,
  items,
  subtotal,
  deliveryFee = 0,
  total,
  deliveryAddress,
  estimatedTime,
  orderDate,
}: OrderConfirmationProps) {
  const displayName = customerName ?? "there"
  const shortId = orderId.slice(0, 8).toUpperCase()

  return (
    <Html>
      <Head />
      <Preview>Order #{shortId} confirmed — {businessName} is preparing your order 🎉</Preview>
      <Tailwind>
        <Body className="bg-[#f8f7f4] font-sans">
          <Container className="mx-auto max-w-[560px] py-10">

            {/* Header */}
            <Section className="bg-[#1a6b3c] rounded-t-2xl px-10 py-8 text-center">
              <Heading className="text-white text-3xl font-black m-0 tracking-tight">
                HalalHub
              </Heading>
              <Text className="text-[#a8dbc0] text-sm m-0 mt-1">Order Confirmation</Text>
            </Section>

            {/* Success banner */}
            <Section className="bg-[#ecfdf5] px-10 py-6 text-center border-b border-[#d1fae5]">
              <Text className="text-3xl m-0">✅</Text>
              <Heading className="text-[#065f46] text-xl font-black m-0 mt-2">
                Order Confirmed!
              </Heading>
              <Text className="text-[#047857] text-sm m-0 mt-1">
                Order #{shortId} · {orderDate ?? new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </Text>
            </Section>

            {/* Body */}
            <Section className="bg-white px-10 py-8">
              <Text className="text-[#333] text-base m-0">
                Assalamu Alaikum <strong>{displayName}</strong>, your order from{" "}
                <strong>{businessName}</strong> has been received and is being prepared.
              </Text>

              {estimatedTime && (
                <Section className="bg-[#f0f9f4] rounded-xl px-6 py-4 my-6">
                  <Text className="text-[#1a6b3c] text-sm font-bold m-0">
                    🕐 Estimated delivery time
                  </Text>
                  <Text className="text-[#1a1a1a] text-xl font-black m-0 mt-1">
                    {estimatedTime}
                  </Text>
                </Section>
              )}

              {/* Order items */}
              <Heading className="text-[#1a1a1a] text-sm font-black uppercase tracking-widest m-0 mt-6 mb-4">
                Your Order
              </Heading>

              {items.map((item, i) => (
                <Row key={i} className="mb-3">
                  <Column className="w-3/4">
                    <Text className="text-[#333] text-sm font-bold m-0">{item.name}</Text>
                    <Text className="text-[#888] text-xs m-0">Qty: {item.quantity}</Text>
                  </Column>
                  <Column className="w-1/4 text-right">
                    <Text className="text-[#333] text-sm font-bold m-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </Text>
                  </Column>
                </Row>
              ))}

              <Hr className="border-[#eee] my-4" />

              {/* Totals */}
              <Row className="mb-2">
                <Column><Text className="text-[#888] text-sm m-0">Subtotal</Text></Column>
                <Column className="text-right"><Text className="text-[#888] text-sm m-0">₹{subtotal.toLocaleString("en-IN")}</Text></Column>
              </Row>
              {deliveryFee > 0 && (
                <Row className="mb-2">
                  <Column><Text className="text-[#888] text-sm m-0">Delivery fee</Text></Column>
                  <Column className="text-right"><Text className="text-[#888] text-sm m-0">₹{deliveryFee.toLocaleString("en-IN")}</Text></Column>
                </Row>
              )}
              <Row className="mt-2">
                <Column><Text className="text-[#1a1a1a] text-base font-black m-0">Total</Text></Column>
                <Column className="text-right"><Text className="text-[#1a6b3c] text-base font-black m-0">₹{total.toLocaleString("en-IN")}</Text></Column>
              </Row>

              {deliveryAddress && (
                <>
                  <Hr className="border-[#eee] my-6" />
                  <Text className="text-[#888] text-xs font-black uppercase tracking-widest m-0 mb-2">
                    Delivery Address
                  </Text>
                  <Text className="text-[#333] text-sm m-0">{deliveryAddress}</Text>
                </>
              )}

              <Hr className="border-[#eee] my-6" />

              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://halalhub.app"}/seller/orders`}
                className="bg-[#1a6b3c] text-white font-black text-sm px-8 py-4 rounded-full no-underline block text-center"
              >
                Track Your Order →
              </Button>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f0ede8] rounded-b-2xl px-10 py-6 text-center">
              <Text className="text-[#aaa] text-xs m-0">
                Questions? Reply to this email or contact us at support@halalhub.app
              </Text>
              <Text className="text-[#aaa] text-xs m-0 mt-1">
                HalalHub · Mumbai, India
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default OrderConfirmationEmail
