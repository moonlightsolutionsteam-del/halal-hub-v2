import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.warn("[email] RESEND_API_KEY is not set — emails will not send")
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? "re_missing")

export const FROM_ADDRESS = process.env.EMAIL_FROM ?? "HalalHub <hello@halalhub.app>"
export const REPLY_TO = process.env.EMAIL_REPLY_TO ?? "support@halalhub.app"
