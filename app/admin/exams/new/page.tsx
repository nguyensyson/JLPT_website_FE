"use client"

import type React from "react"

import { useState } from "react"
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

export default function NewExam() {
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

  const [sectionConfigs, setSectionConfigs] = useState({
    vocabulary: null,
    grammar: null,
    listening: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Đề thi mới đã được tạo thành công!")
      router.push("/admin/exams")

      // Reset form after successful creation
      setFormData({
        title: "",
        level: "",
        year: "",
        duration: "",
        difficulty: "",
        description: "",
      })
      setSectionConfigs({
        vocabulary: null,
        grammar: null,
        listening: null,
      })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSectionConfigSave = (sectionType: string, config: any) => {
    setSectionConfigs((prev) => ({
      ...prev,
      [sectionType]: config,
    }))
    console.log(`${sectionType} config saved:`, config)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="rounded-lg">
          <Link href="/admin/exams">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tạo đề thi mới</h1>
          <p className="text-gray-600">Tạo đề thi JLPT mới cho hệ thống</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Nhập thông tin chính của đề thi JLPT</CardDescription>
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
                  <Input type="number" placeholder="Số câu hỏi" className="mt-2 rounded-lg" />
                  {sectionConfigs.vocabulary && (
                    <p className="text-xs text-green-600 mt-1">
                      Đã cấu hình {sectionConfigs.vocabulary.questionCount} câu hỏi
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="25" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Văn tự - Từ vựng"
                    sectionType="vocabulary"
                    questionCount={0}
                    timeLimit={25}
                    onSave={(config) => handleSectionConfigSave("vocabulary", config)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl">
                <div>
                  <Label className="text-sm font-medium">Phần 2: Ngữ pháp - Đọc hiểu</Label>
                  <Input type="number" placeholder="Số câu hỏi" className="mt-2 rounded-lg" />
                  {sectionConfigs.grammar && (
                    <p className="text-xs text-green-600 mt-1">
                      Đã cấu hình {sectionConfigs.grammar.questionCount} câu hỏi
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="50" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Ngữ pháp - Đọc hiểu"
                    sectionType="grammar"
                    questionCount={0}
                    timeLimit={50}
                    onSave={(config) => handleSectionConfigSave("grammar", config)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-xl">
                <div>
                  <Label className="text-sm font-medium">Phần 3: Nghe hiểu</Label>
                  <Input type="number" placeholder="Số câu hỏi" className="mt-2 rounded-lg" />
                  {sectionConfigs.listening && (
                    <p className="text-xs text-green-600 mt-1">
                      Đã cấu hình {sectionConfigs.listening.questionCount} câu hỏi
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian (phút)</Label>
                  <Input type="number" placeholder="30" className="mt-2 rounded-lg" />
                </div>
                <div className="flex items-end">
                  <ExamSectionConfig
                    sectionName="Nghe hiểu"
                    sectionType="listening"
                    questionCount={0}
                    timeLimit={30}
                    onSave={(config) => handleSectionConfigSave("listening", config)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button variant="outline" type="button" className="rounded-xl" asChild>
            <Link href="/admin/exams">Hủy bỏ</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-jlpt-red hover:bg-red-800 rounded-xl">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang tạo...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Tạo đề thi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
