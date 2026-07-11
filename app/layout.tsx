import type { Metadata } from "next"
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
})

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-pro",
})

export const metadata: Metadata = {
  title: "CommerceExample",
  description: "Votre boutique en ligne"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body
        className={`${body.variable} ${display.variable} ${mono.variable} bg-[#0E1314] text-[#EEF3EF]`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
