"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Settings, Users, Clock, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"

// Mock exam data
const examDetail = {
  id: 1,
  title: "JLPT N5 - Đề thi tháng 7/2023",
  level: "N5",
  year: "2023",
  duration: 105,
  difficulty: "easy",
  questions: 103,
  participants: 1250,
  description:
    "Đề thi JLPT N5 chính thức được tổ chức vào tháng 7/2023. Đề thi bao gồm 3 phần: Văn tự - Từ vựng, Ngữ pháp - Đọc hiểu, và Nghe hiểu.",
  sections: [
    {
      name: "Văn tự - Từ vựng",
      questions: 25,
      timeLimit: 25,
      description: "Kiểm tra khả năng đọc Hiragana, Katakana, Kanji cơ bản và từ vựng",
    },
    {
      name: "Ngữ pháp - Đọc hiểu",
      questions: 46,
      timeLimit: 50,
      description: "Kiểm tra ngữ pháp cơ bản và khả năng đọc hiểu văn bản ngắn",
    },
    {
      name: "Nghe hiểu",
      questions: 32,
      timeLimit: 30,
      description: "Kiểm tra khả năng nghe hiểu hội thoại và thông tin cơ bản",
    },
  ],
  stats: {
    averageScore: 78,
    passRate: 65,
    completionRate: 92,
    totalAttempts: 1250,
  },
  createdAt: "10/11/2024",
  updatedAt: "15/11/2024",
}

export default function ExamDetail({ params }: { params: { id: string } }) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "N5":
        return "bg-green-100 text-green-800"
      case "N4":
        return "bg-blue-100 text-blue-800"
      case "N3":
        return "bg-yellow-100 text-yellow-800"
      case "N2":
        return "bg-orange-100 text-orange-800"
      case "N1":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ"
      case "medium":
        return "Trung bình"
      case "hard":
        return "Khó"
      case "very_hard":
        return "Rất khó"
      default:
        return difficulty
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild className="rounded-lg">
            <Link href="/admin/exams">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chi tiết đề thi</h1>
            <p className="text-gray-600">Thông tin chi tiết và thống kê đề thi</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl" asChild>
            <Link href={`/admin/exams/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Link>
          </Button>
          <Button className="bg-jlpt-red hover:bg-red-800 rounded-xl" asChild>
            <Link href={`/admin/exams/${params.id}/questions`}>
              <Settings className="h-4 w-4 mr-2" />
              Quản lý câu hỏi
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{examDetail.title}</CardTitle>
                  <CardDescription className="mt-2">{examDetail.description}</CardDescription>
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge className={`${getLevelColor(examDetail.level)} rounded-full`}>{examDetail.level}</Badge>
                  <Badge variant="outline" className="rounded-full">
                    {examDetail.year}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{examDetail.duration}</div>
                  <div className="text-sm text-gray-600">Phút</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <BookOpen className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{examDetail.questions}</div>
                  <div className="text-sm text-gray-600">Câu hỏi</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Users className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{examDetail.participants.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Lượt làm</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <BarChart3 className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{getDifficultyText(examDetail.difficulty)}</div>
                  <div className="text-sm text-gray-600">Độ khó</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Sections */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Cấu trúc đề thi</CardTitle>
              <CardDescription>Chi tiết các phần thi và thời gian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examDetail.sections.map((section, index) => (
                  <div key={index} className="border rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{section.name}</h3>
                      <div className="text-right text-sm text-gray-600">
                        <div>{section.questions} câu</div>
                        <div>{section.timeLimit} phút</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-jlpt-red" />
                Thống kê
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Điểm trung bình</span>
                  <span className="font-semibold">{examDetail.stats.averageScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-jlpt-red h-2 rounded-full"
                    style={{ width: `${examDetail.stats.averageScore}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tỷ lệ đậu</span>
                  <span className="font-semibold">{examDetail.stats.passRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${examDetail.stats.passRate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tỷ lệ hoàn thành</span>
                  <span className="font-semibold">{examDetail.stats.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${examDetail.stats.completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-jlpt-red">
                    {examDetail.stats.totalAttempts.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Tổng lượt làm</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta Info */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ngày tạo:</span>
                <span className="font-medium">{examDetail.createdAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cập nhật cuối:</span>
                <span className="font-medium">{examDetail.updatedAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ID đề thi:</span>
                <span className="font-medium">#{params.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
