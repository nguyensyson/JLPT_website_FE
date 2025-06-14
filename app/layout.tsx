import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "JLPT Practice - Luyện thi JLPT Online",
  description: "Nền tảng luyện thi JLPT trực tuyến với đề thi thực tế và hệ thống chấm điểm tự động",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'