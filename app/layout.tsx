import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"

const geistSans = Geist({ subsets: ["latin"] })

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
      <body className={geistSans.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
