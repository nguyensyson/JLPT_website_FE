"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, BookOpen, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock exam data (same as exam page)
const examData = {
  id: 1,
  title: "JLPT N5 - Đề thi tháng 7/2023",
  level: "N5",
  totalQuestions: 20,
  timeLimit: 30 * 60,
  passingScore: 60,
  questions: [
    {
      id: 1,
      section: "Văn tự - Từ vựng",
      question: "Từ nào dưới đây có nghĩa là 'học sinh'?",
      options: ["がくせい", "せんせい", "かいしゃいん", "いしゃ"],
      correctAnswer: 0,
      explanation:
        "がくせい (gakusei) có nghĩa là học sinh. せんせい là giáo viên, かいしゃいん là nhân viên công ty, いしゃ là bác sĩ.",
    },
    {
      id: 2,
      section: "Văn tự - Từ vựng",
      question: "Kanji nào đọc là 'やま'?",
      options: ["川", "山", "海", "空"],
      correctAnswer: 1,
      explanation: "山 đọc là 'やま' có nghĩa là núi. 川 là sông, 海 là biển, 空 là bầu trời.",
    },
    {
      id: 3,
      section: "Ngữ pháp",
      question: "Điền vào chỗ trống: わたし___にほんじんです。",
      options: ["は", "が", "を", "に"],
      correctAnswer: 0,
      explanation: "は là trợ từ chỉ chủ đề trong câu. わたしはにほんじんです có nghĩa là 'Tôi là người Nhật'.",
    },
    // Add more questions with explanations...
    ...Array.from({ length: 17 }, (_, i) => ({
      id: i + 4,
      section: i % 3 === 0 ? "Văn tự - Từ vựng" : i % 3 === 1 ? "Ngữ pháp" : "Đọc hiểu",
      question: `Câu hỏi số ${i + 4}: Đây là câu hỏi mẫu để demo giao diện kết quả.`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `Giải thích cho câu ${i + 4}: Đây là phần giải thích chi tiết đáp án đúng.`,
    })),
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({})
  const [showDetails, setShowDetails] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Parse answers from URL params only once
  useEffect(() => {
    if (!isLoaded) {
      const answersParam = searchParams.get("answers")
      if (answersParam) {
        try {
          const answers = JSON.parse(decodeURIComponent(answersParam))
          setUserAnswers(answers)
        } catch (error) {
          console.error("Error parsing answers:", error)
          // Set some demo answers if parsing fails
          setUserAnswers({
            1: 0,
            2: 1,
            3: 0,
            4: 0,
            5: 1,
            6: 2,
            7: 1,
            8: 3,
            9: 0,
            10: 2,
            11: 1,
            12: 3,
            13: 0,
            14: 2,
            15: 1,
          })
        }
      } else {
        // Set demo answers if no URL param
        setUserAnswers({
          1: 0,
          2: 1,
          3: 0,
          4: 0,
          5: 1,
          6: 2,
          7: 1,
          8: 3,
          9: 0,
          10: 2,
          11: 1,
          12: 3,
          13: 0,
          14: 2,
          15: 1,
        })
      }
      setIsLoaded(true)
    }
  }, [searchParams, isLoaded])

  // Don't render until data is loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jlpt-red mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải kết quả...</p>
        </div>
      </div>
    )
  }

  // Calculate results
  const correctAnswers = examData.questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length
  const score = Math.round((correctAnswers / examData.totalQuestions) * 100)
  const passed = score >= examData.passingScore
  const answeredQuestions = Object.keys(userAnswers).length

  const sectionStats = examData.questions.reduce(
    (acc, question) => {
      if (!acc[question.section]) {
        acc[question.section] = { total: 0, correct: 0 }
      }
      acc[question.section].total++
      if (userAnswers[question.id] === question.correctAnswer) {
        acc[question.section].correct++
      }
      return acc
    },
    {} as { [key: string]: { total: number; correct: number } },
  )

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {passed ? "Chúc mừng! Bạn đã đậu!" : "Chưa đạt yêu cầu"}
          </h1>
          <p className="text-lg text-gray-600">{examData.title}</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-jlpt-red mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">{score}</div>
              <div className="text-sm text-gray-600">Điểm số</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Câu đúng</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">{answeredQuestions}</div>
              <div className="text-sm text-gray-600">Câu đã làm</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">
                {Math.round((correctAnswers / examData.totalQuestions) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Tỷ lệ đúng</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Performance */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Kết quả theo từng phần</CardTitle>
                <CardDescription>Phân tích chi tiết điểm số theo từng kỹ năng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(sectionStats).map(([section, stats]) => {
                  const percentage = Math.round((stats.correct / stats.total) * 100)
                  return (
                    <div key={section} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{section}</span>
                        <span className="text-sm text-gray-600">
                          {stats.correct}/{stats.total} ({percentage}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Chi tiết từng câu hỏi</CardTitle>
                    <CardDescription>Xem lại đáp án và giải thích chi tiết</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setShowDetails(!showDetails)} className="rounded-lg">
                    {showDetails ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </Button>
                </div>
              </CardHeader>
              {showDetails && (
                <CardContent className="space-y-4">
                  {examData.questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer
                    const wasAnswered = userAnswer !== undefined

                    return (
                      <div key={question.id} className="border rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-600">Câu {index + 1}</span>
                            <Badge variant="outline" className="text-xs">
                              {question.section}
                            </Badge>
                            {wasAnswered ? (
                              isCorrect ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Đúng
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Sai
                                </Badge>
                              )
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">Không trả lời</Badge>
                            )}
                          </div>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-3 whitespace-pre-line">{question.question}</h4>

                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-50 border-green-200"
                                  : userAnswer === optionIndex && !isCorrect
                                    ? "bg-red-50 border-red-200"
                                    : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                <span>{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                )}
                                {userAnswer === optionIndex && !isCorrect && (
                                  <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <h5 className="font-medium text-blue-900 mb-1">Giải thích:</h5>
                          <p className="text-sm text-blue-800">{question.explanation}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Hành động tiếp theo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-jlpt-red hover:bg-red-800 text-white rounded-xl" asChild>
                  <Link href={`/practice/${params.id}`}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Làm lại đề này
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href="/practice">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Chọn đề khác
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Về trang chủ
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Tóm tắt kết quả</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>{score}/100</div>
                  <div className="text-sm text-gray-600 mt-1">Điểm cần đạt: {examData.passingScore}/100</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tổng số câu:</span>
                    <span className="font-medium">{examData.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Câu đã làm:</span>
                    <span className="font-medium">{answeredQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Câu đúng:</span>
                    <span className="font-medium text-green-600">{correctAnswers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Câu sai:</span>
                    <span className="font-medium text-red-600">{answeredQuestions - correctAnswers}</span>
                  </div>
                </div>

                {!passed && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Lời khuyên:</strong> Hãy ôn tập thêm các phần còn yếu và thử lại!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
