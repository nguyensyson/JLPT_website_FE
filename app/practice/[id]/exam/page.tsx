"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, BookOpen, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock exam data
const examData = {
  id: 1,
  title: "JLPT N5 - Đề thi tháng 7/2023",
  level: "N5",
  totalQuestions: 20, // Reduced for demo
  timeLimit: 30 * 60, // 30 minutes in seconds for demo
  questions: [
    {
      id: 1,
      section: "Văn tự - Từ vựng",
      question: "Từ nào dưới đây có nghĩa là 'học sinh'?",
      options: ["がくせい", "せんせい", "かいしゃいん", "いしゃ"],
      correctAnswer: 0,
    },
    {
      id: 2,
      section: "Văn tự - Từ vựng",
      question: "Kanji nào đọc là 'やま'?",
      options: ["川", "山", "海", "空"],
      correctAnswer: 1,
    },
    {
      id: 3,
      section: "Ngữ pháp",
      question: "Điền vào chỗ trống: わたし___にほんじんです。",
      options: ["は", "が", "を", "に"],
      correctAnswer: 0,
    },
    {
      id: 4,
      section: "Ngữ pháp",
      question: "Câu nào đúng?",
      options: ["きょうは あついです。", "きょうは あつです。", "きょうは あつい。", "きょうは あつですい。"],
      correctAnswer: 0,
    },
    {
      id: 5,
      section: "Đọc hiểu",
      question:
        "Đọc đoạn văn sau và trả lời câu hỏi:\n\nたなかさんは まいにち がっこうに いきます。がっこうで にほんごを べんきょうします。\n\nTanaka-san làm gì hàng ngày?",
      options: ["Đi làm", "Đi học và học tiếng Nhật", "Ở nhà", "Đi chơi"],
      correctAnswer: 1,
    },
    // Add more questions...
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 6,
      section: i % 3 === 0 ? "Văn tự - Từ vựng" : i % 3 === 1 ? "Ngữ pháp" : "Đọc hiểu",
      question: `Câu hỏi số ${i + 6}: Đây là câu hỏi mẫu để demo giao diện làm bài.`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  ],
}

export default function ExamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(examData.timeLimit)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      // Auto submit when time is up
      handleSubmit()
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (answerIndex: number) => {
    const currentQ = examData.questions[currentQuestion]
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answerIndex,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      router.push(`/practice/${params.id}/results?answers=${encodeURIComponent(JSON.stringify(answers))}`)
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / examData.totalQuestions) * 100
  const answeredCount = Object.keys(answers).length

  const currentQ = examData.questions[currentQuestion]
  const currentAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{examData.level}</Badge>
              <h1 className="text-lg font-semibold text-gray-900">{examData.title}</h1>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-jlpt-red" />
                <span
                  className={`font-mono text-lg font-semibold ${timeLeft < 300 ? "text-red-600" : "text-gray-900"}`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-jlpt-red" />
                <span className="text-gray-900">
                  {answeredCount}/{examData.totalQuestions}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>
                Câu {currentQuestion + 1}/{examData.totalQuestions}
              </span>
              <span>{Math.round(progress)}% hoàn thành</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-full">
                    {currentQ.section}
                  </Badge>
                  <span className="text-sm text-gray-600">Câu {currentQuestion + 1}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium text-gray-900 leading-relaxed whitespace-pre-line">
                    {currentQ.question}
                  </h3>
                </div>

                <RadioGroup
                  value={currentAnswer !== undefined ? currentAnswer.toString() : ""}
                  onValueChange={(value) => handleAnswerChange(Number.parseInt(value))}
                  className="space-y-4"
                >
                  {currentQ.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${currentQ.id}-${index}`} />
                      <Label htmlFor={`option-${currentQ.id}-${index}`} className="flex-1 cursor-pointer text-base">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="rounded-xl"
                  >
                    Câu trước
                  </Button>

                  {currentQuestion === examData.totalQuestions - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-jlpt-red hover:bg-red-800 text-white rounded-xl px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Đang nộp bài...
                        </>
                      ) : (
                        "Nộp bài"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(Math.min(examData.totalQuestions - 1, currentQuestion + 1))}
                      className="bg-jlpt-red hover:bg-red-800 text-white rounded-xl"
                    >
                      Câu tiếp theo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Navigator */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Danh sách câu hỏi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {examData.questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`
                        w-10 h-10 rounded-lg text-sm font-medium transition-all
                        ${
                          currentQuestion === index
                            ? "bg-jlpt-red text-white"
                            : answers[question.id] !== undefined
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-jlpt-red rounded"></div>
                    <span>Câu hiện tại</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Đã trả lời</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span>Chưa trả lời</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            {timeLeft < 300 && (
              <Card className="shadow-lg rounded-2xl border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Sắp hết giờ!</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    Chỉ còn {Math.floor(timeLeft / 60)} phút {timeLeft % 60} giây
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Card className="shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-jlpt-red hover:bg-red-800 text-white rounded-xl py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang nộp bài...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Nộp bài ({answeredCount}/{examData.totalQuestions})
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-600 text-center mt-2">Bạn có thể nộp bài bất kỳ lúc nào</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
