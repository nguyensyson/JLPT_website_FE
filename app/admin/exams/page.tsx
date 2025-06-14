"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Plus, Settings, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const exams = [
  {
    id: 1,
    title: "JLPT N5 - Đề thi tháng 7/2023",
    level: "N5",
    year: "2023",
    duration: 105,
    difficulty: "easy",
    questions: 103,
    participants: 1250,
  },
  {
    id: 2,
    title: "JLPT N4 - Đề thi tháng 12/2023",
    level: "N4",
    year: "2023",
    duration: 125,
    difficulty: "medium",
    questions: 123,
    participants: 980,
  },
  {
    id: 3,
    title: "JLPT N3 - Đề thi tháng 7/2023",
    level: "N3",
    year: "2023",
    duration: 140,
    difficulty: "medium",
    questions: 146,
    participants: 756,
  },
  {
    id: 4,
    title: "JLPT N2 - Đề thi tháng 12/2023",
    level: "N2",
    year: "2023",
    duration: 155,
    difficulty: "hard",
    questions: 161,
    participants: 432,
  },
  {
    id: 5,
    title: "JLPT N1 - Đề thi tháng 7/2023",
    level: "N1",
    year: "2023",
    duration: 170,
    difficulty: "very_hard",
    questions: 178,
    participants: 289,
  },
]

export default function ExamsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [examList, setExamList] = useState(exams)

  const filteredExams = examList.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || exam.level === selectedLevel
    const matchesYear = selectedYear === "all" || exam.year === selectedYear
    return matchesSearch && matchesLevel && matchesYear
  })

  const deleteExam = (examId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa đề thi này?")) {
      setExamList((prev) => prev.filter((exam) => exam.id !== examId))
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quản lý đề thi</h1>
          <p className="text-gray-600">Quản lý tất cả đề thi JLPT trong hệ thống</p>
        </div>
        <Button asChild className="bg-jlpt-red hover:bg-red-800 rounded-xl">
          <Link href="/admin/exams/new">
            <Plus className="h-4 w-4 mr-2" />
            Thêm đề thi mới
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-jlpt-red" />
            Tìm kiếm và lọc đề thi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Tìm kiếm theo tiêu đề đề thi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả cấp độ</SelectItem>
                <SelectItem value="N5">N5</SelectItem>
                <SelectItem value="N4">N4</SelectItem>
                <SelectItem value="N3">N3</SelectItem>
                <SelectItem value="N2">N2</SelectItem>
                <SelectItem value="N1">N1</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn năm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả năm</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exams Table */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Danh sách đề thi ({filteredExams.length})</CardTitle>
          <CardDescription>Quản lý thông tin và nội dung của tất cả đề thi JLPT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Tiêu đề</TableHead>
                  <TableHead className="font-semibold">Cấp độ</TableHead>
                  <TableHead className="font-semibold">Năm</TableHead>
                  <TableHead className="font-semibold">Thời lượng</TableHead>
                  <TableHead className="font-semibold">Độ khó</TableHead>
                  <TableHead className="font-semibold">Số câu hỏi</TableHead>
                  <TableHead className="font-semibold">Lượt làm</TableHead>
                  <TableHead className="font-semibold text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate" title={exam.title}>
                        {exam.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getLevelColor(exam.level)} rounded-full`}>{exam.level}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{exam.year}</TableCell>
                    <TableCell className="text-gray-600">{exam.duration} phút</TableCell>
                    <TableCell>
                      <Badge className={`${getDifficultyColor(exam.difficulty)} rounded-full`}>
                        {getDifficultyText(exam.difficulty)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{exam.questions}</TableCell>
                    <TableCell className="text-gray-600">{exam.participants.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/admin/exams/${exam.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/admin/exams/${exam.id}/questions`}>
                              <Settings className="h-4 w-4 mr-2" />
                              Quản lý câu hỏi
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/admin/exams/${exam.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => deleteExam(exam.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa đề thi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Hiển thị {filteredExams.length} trên tổng số {exams.length} đề thi
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled className="rounded-lg">
                Trước
              </Button>
              <Button variant="outline" size="sm" className="bg-jlpt-red text-white rounded-lg">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                2
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                3
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
