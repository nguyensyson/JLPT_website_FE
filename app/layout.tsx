import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JLPT Practice - Luyện thi năng lực tiếng Nhật",
  description: "Nền tảng luyện thi JLPT hiện đại và hiệu quả",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
