"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExamSectionConfig } from "@/components/admin/exam-section-config"

// Mock exam data
const mockExam = {
  id: 1,
  title: "JLPT N5 - Đề thi tháng 7/2023",
  level: "N5",
  year: "2023",
  duration: "105",
  difficulty: "easy",
  description:
    "Đề thi JLPT N5 chính thức được tổ chức vào tháng 7/2023. Đề thi bao gồm 3 phần: Văn tự - Từ vựng, Ngữ pháp - Đọc hiểu, và Nghe hiểu.",
}

export default function EditExam({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    level: "",
    year: "",
    duration: "",
    difficulty: "",
    description: "",
  })

  // Load exam data when component mounts
  useEffect(() => {
    // In a real app, you would fetch the exam data from an API
    setFormData({
      title: mockExam.title,
      level: mockExam.level,
      year: mockExam.year,
      duration: mockExam.duration,
      difficulty: mockExam.difficulty,
      description: mockExam.description,
    })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Đề thi đã được cập nhật thành công!")
      router.push(`/admin/exams/${params.id}`)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="rounded-lg">
          <Link href={`/admin/exams/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chỉnh sửa đề thi</h1>
          <p className="text-gray-600">Cập nhật thông tin đề thi JLPT</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Cập nhật thông tin chính của đề thi JLPT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề đề thi *</Label>
                <Input
                  id="title"
                  placeholder="VD: JLPT N5 - Đề thi tháng 7/2024"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Cấp độ *</Label>
                <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Chọn cấp độ JLPT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N5">N5 - Sơ cấp</SelectItem>
                    <SelectItem value="N4">N4 - Sơ cấp cao</SelectItem>
                    <SelectItem value="N3">N3 - Trung cấp</SelectItem>
                    <SelectItem value="N2">N2 - Trung cấp cao</SelectItem>
                    <SelectItem value="N1">N1 - Cao cấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Năm *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Chọn năm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Thời lượng (phút) *</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="VD: 105"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  className="rounded-xl"
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="difficulty">Độ khó *</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Chọn độ khó" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Dễ</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="hard">Khó</SelectItem>
                    <SelectItem value="very_hard">Rất khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Mô tả đề thi</Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả chi tiết về đề thi..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="rounded-xl min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Structure */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Cấu trúc đề thi</CardTitle>
            <CardDescription>Thiết lập các phần thi và thời gian cho từng phần</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl">
                <div>
                  <Label className="text-sm font-medium">Phần 1: Văn tự - Từ vựng</Label>
                  <Input type="number" placeholder="25" defaultValue="25" className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="25" defaultValue="25" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Văn tự - Từ vựng"
                    sectionType="vocabulary"
                    questionCount={25}
                    timeLimit={25}
                    onSave={(config) => console.log("Vocabulary config:", config)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl">
                <div>
                  <Label className="text-sm font-medium">Phần 2: Ngữ pháp - Đọc hiểu</Label>
                  <Input type="number" placeholder="46" defaultValue="46" className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="50" defaultValue="50" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Ngữ pháp - Đọc hiểu"
                    sectionType="grammar"
                    questionCount={46}
                    timeLimit={50}
                    onSave={(config) => console.log("Grammar config:", config)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl">
                <div>
                  <Label className="text-sm font-medium">Phần 3: Nghe hiểu</Label>
                  <Input type="number" placeholder="32" defaultValue="32" className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="30" defaultValue="30" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Nghe hiểu"
                    sectionType="listening"
                    questionCount={32}
                    timeLimit={30}
                    onSave={(config) => console.log("Listening config:", config)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button variant="outline" type="button" className="rounded-xl" asChild>
            <Link href={`/admin/exams/${params.id}`}>Hủy bỏ</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-jlpt-red hover:bg-red-800 rounded-xl">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang cập nhật...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Cập nhật đề thi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
