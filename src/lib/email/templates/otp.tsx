import {
  Body, Container, Head, Heading, Html,
  Preview, Section, Text, Tailwind, Hr,
} from "@react-email/components"

interface OtpEmailProps {
  otp: string
  expiresInMinutes?: number
}

export function OtpEmail({ otp, expiresInMinutes = 10 }: OtpEmailProps) {
  const digits = otp.split("")

  return (
    <Html>
      <Head />
      <Preview>Your HalalHub login code is {otp}</Preview>
      <Tailwind>
        <Body className="bg-[#f8f7f4] font-sans">
          <Container className="mx-auto max-w-[480px] py-10">

            {/* Header */}
            <Section className="bg-[#1a6b3c] rounded-t-2xl px-10 py-8 text-center">
              <Heading className="text-white text-3xl font-black m-0 tracking-tight">
                HalalHub
              </Heading>
            </Section>

            {/* Body */}
            <Section className="bg-white px-10 py-10 text-center">
              <Text className="text-4xl m-0">🔐</Text>
              <Heading className="text-[#1a1a1a] text-xl font-black m-0 mt-4">
                Your login code
              </Heading>
              <Text className="text-[#666] text-sm mt-2 mb-8">
                Enter this code to sign in to HalalHub
              </Text>

              {/* OTP digits */}
              <Section className="my-6">
                <table style={{ margin: "0 auto", borderCollapse: "separate", borderSpacing: "8px" }}>
                  <tbody>
                    <tr>
                      {digits.map((d, i) => (
                        <td
                          key={i}
                          style={{
                            width: 48,
                            height: 56,
                            background: "#f0f9f4",
                            border: "2px solid #1a6b3c",
                            borderRadius: 12,
                            textAlign: "center",
                            fontSize: 28,
                            fontWeight: 900,
                            color: "#1a6b3c",
                            letterSpacing: 0,
                          }}
                        >
                          {d}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Text className="text-[#888] text-sm mt-4">
                This code expires in{" "}
                <span style={{ color: "#1a6b3c", fontWeight: 700 }}>
                  {expiresInMinutes} minutes
                </span>
                .
              </Text>

              <Hr className="border-[#eee] my-6" />

              <Text className="text-[#aaa] text-xs leading-relaxed m-0">
                If you didn&apos;t request this code, you can safely ignore this email.
                Your account is secure.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f0ede8] rounded-b-2xl px-10 py-6 text-center">
              <Text className="text-[#aaa] text-xs m-0">
                HalalHub · Mumbai, India
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default OtpEmail
