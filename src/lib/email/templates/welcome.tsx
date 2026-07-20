import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Img, Preview, Section, Text, Tailwind,
} from "@react-email/components"

interface WelcomeEmailProps {
  name?: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  const displayName = name ?? "there"

  return (
    <Html>
      <Head />
      <Preview>Assalamu Alaikum {displayName} — welcome to HalalHub 🌙</Preview>
      <Tailwind>
        <Body className="bg-[#f8f7f4] font-sans">
          <Container className="mx-auto max-w-[560px] py-10">

            {/* Header */}
            <Section className="bg-[#1a6b3c] rounded-t-2xl px-10 py-8 text-center">
              <Heading className="text-white text-3xl font-black m-0 tracking-tight">
                HalalHub
              </Heading>
              <Text className="text-[#a8dbc0] text-sm m-0 mt-1">
                Your Halal Life, All in One Place
              </Text>
            </Section>

            {/* Body */}
            <Section className="bg-white px-10 py-10">
              <Heading className="text-[#1a1a1a] text-2xl font-black m-0 mb-2">
                Assalamu Alaikum, {displayName}! 🌙
              </Heading>
              <Text className="text-[#555] text-base leading-relaxed mt-4">
                Welcome to HalalHub — the platform built for Muslims who want to discover
                halal restaurants, businesses, prayer tools, and more, all verified and
                trusted by the community.
              </Text>

              <Text className="text-[#555] text-base leading-relaxed">
                Here&apos;s what you can do right now:
              </Text>

              <Section className="mt-2 mb-6 space-y-2">
                {[
                  ["🍽️", "Discover halal restaurants & businesses near you"],
                  ["🕌", "Set your mosque and track your daily prayers"],
                  ["✅", "Check if a product is halal by scanning its barcode"],
                  ["🪙", "Earn Halal Coins for every action you take"],
                  ["📖", "Read Quran and bookmark your progress"],
                ].map(([icon, text]) => (
                  <Text key={text as string} className="text-[#333] text-sm m-0 py-1">
                    {icon}{"  "}{text}
                  </Text>
                ))}
              </Section>

              <Button
                href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://halalhub.app"}/explore`}
                className="bg-[#1a6b3c] text-white font-black text-sm px-8 py-4 rounded-full no-underline block text-center"
              >
                Start Exploring →
              </Button>

              <Hr className="border-[#eee] my-8" />

              <Text className="text-[#888] text-xs text-center leading-relaxed m-0">
                May Allah bless your journey. If you have any questions, reply to this email
                — we&apos;re always happy to help.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f0ede8] rounded-b-2xl px-10 py-6 text-center">
              <Text className="text-[#aaa] text-xs m-0">
                HalalHub · Mumbai, India
              </Text>
              <Text className="text-[#aaa] text-xs m-0 mt-1">
                You&apos;re receiving this because you created an account.{" "}
                <a href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://halalhub.app"}/account/settings`} className="text-[#1a6b3c] no-underline">
                  Manage preferences
                </a>
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
