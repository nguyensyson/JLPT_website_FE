"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Users, Play, BarChart3, Target, Award } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for exam detail
const examDetail = {
  id: 1,
  title: "JLPT N5 - Đề thi tháng 7/2023",
  level: "N5",
  year: "2023",
  duration: "105 phút",
  questions: 103,
  participants: 1250,
  difficulty: "Dễ",
  description:
    "Đề thi JLPT N5 chính thức được tổ chức vào tháng 7/2023. Đề thi bao gồm 3 phần: Văn tự - Từ vựng, Ngữ pháp - Đọc hiểu, và Nghe hiểu.",
  sections: [
    {
      name: "Văn tự - Từ vựng",
      questions: 25,
      timeLimit: "25 phút",
      description: "Kiểm tra khả năng đọc Hiragana, Katakana, Kanji cơ bản và từ vựng",
    },
    {
      name: "Ngữ pháp - Đọc hiểu",
      questions: 46,
      timeLimit: "50 phút",
      description: "Kiểm tra ngữ pháp cơ bản và khả năng đọc hiểu văn bản ngắn",
    },
    {
      name: "Nghe hiểu",
      questions: 32,
      timeLimit: "30 phút",
      description: "Kiểm tra khả năng nghe hiểu hội thoại và thông tin cơ bản",
    },
  ],
  stats: {
    averageScore: 78,
    passRate: 65,
    completionRate: 92,
  },
}

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

export default function ExamDetailPage({ params }: { params: { id: string } }) {
  const [isStarting, setIsStarting] = useState(false)
  const router = useRouter()

  const handleStartExam = () => {
    setIsStarting(true)
    // Navigate to exam page
    setTimeout(() => {
      setIsStarting(false)
      router.push(`/practice/${params.id}/exam`)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge className={`${getLevelColor(examDetail.level)} rounded-full px-4 py-2 text-lg font-semibold`}>
              {examDetail.level}
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-2">
              {examDetail.year}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">{examDetail.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{examDetail.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Info */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-jlpt-red" />
                  Thông tin đề thi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{examDetail.duration}</div>
                    <div className="text-sm text-gray-600">Thời gian</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <BookOpen className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{examDetail.questions}</div>
                    <div className="text-sm text-gray-600">Câu hỏi</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Users className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{examDetail.participants.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Người làm</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Target className="h-8 w-8 text-jlpt-red mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{examDetail.difficulty}</div>
                    <div className="text-sm text-gray-600">Độ khó</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sections */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Cấu trúc đề thi</CardTitle>
                <CardDescription>Đề thi được chia thành 3 phần chính với thời gian làm bài riêng biệt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {examDetail.sections.map((section, index) => (
                  <div key={index} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{section.name}</h3>
                      <div className="text-right text-sm text-gray-600">
                        <div>{section.questions} câu</div>
                        <div>{section.timeLimit}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Start Exam */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-center">Bắt đầu làm bài</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleStartExam}
                  disabled={isStarting}
                  className="w-full bg-jlpt-red hover:bg-red-800 text-white rounded-xl py-4 text-lg font-semibold"
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang chuẩn bị...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Bắt đầu làm bài
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  Bạn sẽ có {examDetail.duration} để hoàn thành {examDetail.questions} câu hỏi
                </p>
              </CardContent>
            </Card>

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
                  <Progress value={examDetail.stats.averageScore} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tỷ lệ đậu</span>
                    <span className="font-semibold">{examDetail.stats.passRate}%</span>
                  </div>
                  <Progress value={examDetail.stats.passRate} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tỷ lệ hoàn thành</span>
                    <span className="font-semibold">{examDetail.stats.completionRate}%</span>
                  </div>
                  <Progress value={examDetail.stats.completionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-jlpt-red" />
                  Lời khuyên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Đọc kỹ đề bài trước khi trả lời</li>
                  <li>• Quản lý thời gian hợp lý cho từng phần</li>
                  <li>• Làm những câu dễ trước</li>
                  <li>• Kiểm tra lại đáp án trước khi nộp</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
