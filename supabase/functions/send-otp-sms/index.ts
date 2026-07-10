import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const AUTHKEY_URL = "https://api.authkey.io/request"

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  let payload: { user?: { phone?: string }; sms?: { otp?: string } }
  try {
    payload = await req.json()
  } catch {
    return json({ error: "Invalid JSON body" }, 400)
  }

  const phone = payload.user?.phone ?? ""
  const otp = payload.sms?.otp ?? ""

  if (!phone || !otp) {
    return json({ error: "Missing phone or otp in hook payload" }, 400)
  }

  const authkey = Deno.env.get("AUTHKEY_API_KEY")
  if (!authkey) {
    console.error("AUTHKEY_API_KEY secret not set")
    return json({ error: "SMS provider not configured" }, 500)
  }

  // Parse E.164 → country_code + mobile
  const digits = phone.replace(/^\+/, "")
  let country_code = "91"
  let mobile = digits

  if (digits.startsWith("91") && digits.length === 12) {
    country_code = "91"; mobile = digits.slice(2)
  } else if (digits.startsWith("1") && digits.length === 11) {
    country_code = "1"; mobile = digits.slice(1)
  } else if (digits.startsWith("44") && digits.length === 12) {
    country_code = "44"; mobile = digits.slice(2)
  } else if (digits.startsWith("971") && digits.length === 12) {
    country_code = "971"; mobile = digits.slice(3)
  }

  const message = `Your Halal Hub verification code is ${otp}. Valid for 10 minutes. Do not share this code.`

  const params = new URLSearchParams({ authkey, mobile, country_code, message })

  try {
    const res = await fetch(`${AUTHKEY_URL}?${params}`)
    const body = await res.text()

    let parsed: Record<string, unknown> = {}
    try { parsed = JSON.parse(body) } catch { /* not json */ }

    if (parsed.type === "error" || (!res.ok && parsed.type !== "success")) {
      console.error("authkey.io error:", body)
      return json({ error: `SMS delivery failed: ${body}` }, 502)
    }

    console.log(`OTP sent to ${phone} via authkey.io`)
    return json({})
  } catch (err) {
    console.error("Fetch error:", err)
    return json({ error: String(err) }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}
