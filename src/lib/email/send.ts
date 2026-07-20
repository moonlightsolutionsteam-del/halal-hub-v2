import { render } from "@react-email/render"
import { resend, FROM_ADDRESS, REPLY_TO } from "./client"
import { WelcomeEmail } from "./templates/welcome"
import { OtpEmail } from "./templates/otp"
import { OrderConfirmationEmail, type OrderConfirmationProps } from "./templates/order-confirmation"

// ── Welcome ────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name?: string) {
  const html = await render(WelcomeEmail({ name }))
  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    replyTo: REPLY_TO,
    subject: "Assalamu Alaikum — Welcome to HalalHub 🌙",
    html,
  })
  if (error) console.error("[email] sendWelcomeEmail failed:", error)
  return { ok: !error, data, error }
}

// ── OTP fallback ───────────────────────────────────────────────────────────

export async function sendOtpEmail(to: string, otp: string, expiresInMinutes = 10) {
  const html = await render(OtpEmail({ otp, expiresInMinutes }))
  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `${otp} is your HalalHub login code`,
    html,
  })
  if (error) console.error("[email] sendOtpEmail failed:", error)
  return { ok: !error, data, error }
}

// ── Order confirmation ──────────────────────────────────────────────────────

export async function sendOrderConfirmationEmail(
  to: string,
  props: Omit<OrderConfirmationProps, never>,
) {
  const html = await render(OrderConfirmationEmail(props))
  const shortId = props.orderId.slice(0, 8).toUpperCase()
  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    replyTo: REPLY_TO,
    subject: `Order #${shortId} confirmed — ${props.businessName} is on it! 🎉`,
    html,
  })
  if (error) console.error("[email] sendOrderConfirmationEmail failed:", error)
  return { ok: !error, data, error }
}
