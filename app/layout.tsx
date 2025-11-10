import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Link from "next/link"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <nav className="fixed top-0 left-0 right-0 bg-black border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-white font-bold flex items-center gap-2">
              <img src="/v0-logo.png" alt="Logo" className="w-8 h-8" />
              JobFolio
            </Link>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/profile" className="text-white/80 hover:text-white transition-colors text-sm">
                Profile
              </Link>
              <Link href="/resume" className="text-white/80 hover:text-white transition-colors text-sm">
                Resume
              </Link>
              <Link href="/analyzer" className="text-white/80 hover:text-white transition-colors text-sm">
                Analyzer
              </Link>
              <Link href="/portfolio" className="text-white/80 hover:text-white transition-colors text-sm">
                Portfolio
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
