"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock questions data
const questions = [
  {
    id: 1,
    section: "Văn tự - Từ vựng",
    question: "Từ nào dưới đây có nghĩa là 'học sinh'?",
    options: ["がくせい", "せんせい", "かいしゃいん", "いしゃ"],
    correctAnswer: 0,
    difficulty: "easy",
  },
  {
    id: 2,
    section: "Văn tự - Từ vựng",
    question: "Kanji nào đọc là 'やま'?",
    options: ["川", "山", "海", "空"],
    correctAnswer: 1,
    difficulty: "easy",
  },
  {
    id: 3,
    section: "Ngữ pháp",
    question: "Điền vào chỗ trống: わたし___にほんじんです。",
    options: ["は", "が", "を", "に"],
    correctAnswer: 0,
    difficulty: "medium",
  },
]

export default function QuestionsManagement({ params }: { params: { id: string } }) {
  const [questionList, setQuestionList] = useState(questions)

  const deleteQuestion = (questionId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      setQuestionList((prev) => prev.filter((q) => q.id !== questionId))
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-orange-100 text-orange-800"
      case "very_hard":
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
            <Link href={`/admin/exams/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quản lý câu hỏi</h1>
            <p className="text-gray-600">Quản lý câu hỏi cho đề thi JLPT N5 - Đề thi tháng 7/2023</p>
          </div>
        </div>
        <Button className="bg-jlpt-red hover:bg-red-800 rounded-xl" asChild>
          <Link href={`/admin/exams/${params.id}/questions/new`}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm câu hỏi
          </Link>
        </Button>
      </div>

      {/* Questions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-jlpt-red">{questionList.length}</div>
            <div className="text-sm text-gray-600">Tổng câu hỏi</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {questionList.filter((q) => q.section === "Văn tự - Từ vựng").length}
            </div>
            <div className="text-sm text-gray-600">Văn tự - Từ vựng</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {questionList.filter((q) => q.section === "Ngữ pháp").length}
            </div>
            <div className="text-sm text-gray-600">Ngữ pháp</div>
          </CardContent>
        </Card>
      </div>

      {/* Questions Table */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Danh sách câu hỏi ({questionList.length})</CardTitle>
          <CardDescription>Quản lý tất cả câu hỏi trong đề thi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">STT</TableHead>
                  <TableHead className="font-semibold">Phần thi</TableHead>
                  <TableHead className="font-semibold">Câu hỏi</TableHead>
                  <TableHead className="font-semibold">Đáp án đúng</TableHead>
                  <TableHead className="font-semibold">Độ khó</TableHead>
                  <TableHead className="font-semibold text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questionList.map((question, index) => (
                  <TableRow key={question.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full">
                        {question.section}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate" title={question.question}>
                        {question.question}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 rounded-full">
                        {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getDifficultyColor(question.difficulty)} rounded-full`}>
                        {getDifficultyText(question.difficulty)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => deleteQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa câu hỏi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
