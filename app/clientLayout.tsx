"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="vi">
      <body className={inter.className}>
        <LanguageProvider>
          {/* Don't show header on admin pages */}
          {!pathname?.startsWith("/admin") && <Header />}
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
