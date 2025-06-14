"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewQuestion({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    section: "",
    question: "",
    difficulty: "",
    explanation: "",
    correctAnswer: "",
  })
  const [options, setOptions] = useState(["", "", "", ""])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Câu hỏi đã được thêm thành công!")
      router.push(`/admin/exams/${params.id}/questions`)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => prev.map((option, i) => (i === index ? value : option)))
  }

  const addOption = () => {
    if (options.length < 5) {
      setOptions((prev) => [...prev, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions((prev) => prev.filter((_, i) => i !== index))
      // Reset correct answer if it was the removed option
      if (formData.correctAnswer === index.toString()) {
        setFormData((prev) => ({ ...prev, correctAnswer: "" }))
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="rounded-lg">
          <Link href={`/admin/exams/${params.id}/questions`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thêm câu hỏi mới</h1>
          <p className="text-gray-600">Tạo câu hỏi mới cho đề thi</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Info */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Thông tin câu hỏi</CardTitle>
            <CardDescription>Nhập thông tin cơ bản của câu hỏi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="section">Phần thi *</Label>
                <Select value={formData.section} onValueChange={(value) => handleInputChange("section", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Chọn phần thi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vocabulary">Văn tự - Từ vựng</SelectItem>
                    <SelectItem value="grammar">Ngữ pháp - Đọc hiểu</SelectItem>
                    <SelectItem value="listening">Nghe hiểu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">Nội dung câu hỏi *</Label>
              <Textarea
                id="question"
                placeholder="Nhập nội dung câu hỏi..."
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                className="rounded-xl min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Answer Options */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Đáp án lựa chọn</CardTitle>
                <CardDescription>Thêm các đáp án và chọn đáp án đúng</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={options.length >= 5}
                className="rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm đáp án
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label htmlFor={`option-${index}`}>Đáp án {String.fromCharCode(65 + index)}</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id={`option-${index}`}
                        placeholder={`Nhập đáp án ${String.fromCharCode(65 + index)}...`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="rounded-xl"
                        required
                      />
                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                          className="rounded-lg text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Label>Đáp án đúng *</Label>
              <RadioGroup
                value={formData.correctAnswer}
                onValueChange={(value) => handleInputChange("correctAnswer", value)}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`correct-${index}`} />
                    <Label htmlFor={`correct-${index}`} className="cursor-pointer">
                      Đáp án {String.fromCharCode(65 + index)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Giải thích đáp án</CardTitle>
            <CardDescription>Thêm giải thích chi tiết cho đáp án đúng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="explanation">Giải thích</Label>
              <Textarea
                id="explanation"
                placeholder="Nhập giải thích chi tiết cho đáp án đúng..."
                value={formData.explanation}
                onChange={(e) => handleInputChange("explanation", e.target.value)}
                className="rounded-xl min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button variant="outline" type="button" className="rounded-xl" asChild>
            <Link href={`/admin/exams/${params.id}/questions`}>Hủy bỏ</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-jlpt-red hover:bg-red-800 rounded-xl">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Lưu câu hỏi
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
