"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const mockExams = [
  {
    id: 1,
    title: "JLPT N5 - Đề thi tháng 7/2023",
    level: "N5",
    year: "2023",
    duration: "105 phút",
    questions: 103,
    participants: 1250,
    difficulty: "easy",
  },
  {
    id: 2,
    title: "JLPT N4 - Đề thi tháng 12/2023",
    level: "N4",
    year: "2023",
    duration: "125 phút",
    questions: 123,
    participants: 980,
    difficulty: "medium",
  },
  {
    id: 3,
    title: "JLPT N3 - Đề thi tháng 7/2023",
    level: "N3",
    year: "2023",
    duration: "140 phút",
    questions: 146,
    participants: 756,
    difficulty: "medium",
  },
  {
    id: 4,
    title: "JLPT N2 - Đề thi tháng 12/2023",
    level: "N2",
    year: "2023",
    duration: "155 phút",
    questions: 161,
    participants: 432,
    difficulty: "hard",
  },
  {
    id: 5,
    title: "JLPT N1 - Đề thi tháng 7/2023",
    level: "N1",
    year: "2023",
    duration: "170 phút",
    questions: 178,
    participants: 289,
    difficulty: "very_hard",
  },
]

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

export default function PracticePage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return t("practice.difficulty.easy")
      case "medium":
        return t("practice.difficulty.medium")
      case "hard":
        return t("practice.difficulty.hard")
      case "very_hard":
        return t("practice.difficulty.very_hard")
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

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || exam.level === selectedLevel
    const matchesYear = selectedYear === "all" || exam.year === selectedYear
    const matchesDifficulty = selectedDifficulty === "all" || exam.difficulty === selectedDifficulty
    return matchesSearch && matchesLevel && matchesYear && matchesDifficulty
  })

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("practice.title")}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{t("practice.description")}</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-jlpt-red" />
              {t("practice.search.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("practice.search.level")}</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t("practice.search.level")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("practice.all_levels")}</SelectItem>
                    <SelectItem value="N5">N5</SelectItem>
                    <SelectItem value="N4">N4</SelectItem>
                    <SelectItem value="N3">N3</SelectItem>
                    <SelectItem value="N2">N2</SelectItem>
                    <SelectItem value="N1">N1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("practice.search.year")}</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t("practice.search.year")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("practice.all_years")}</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("practice.search.difficulty")}</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder={t("practice.search.difficulty")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("practice.all_difficulties")}</SelectItem>
                    <SelectItem value="easy">{t("practice.difficulty.easy")}</SelectItem>
                    <SelectItem value="medium">{t("practice.difficulty.medium")}</SelectItem>
                    <SelectItem value="hard">{t("practice.difficulty.hard")}</SelectItem>
                    <SelectItem value="very_hard">{t("practice.difficulty.very_hard")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t("practice.search.keyword")}</label>
                <Input
                  placeholder={t("practice.search.placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card
              key={exam.id}
              className="shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge className={`${getLevelColor(exam.level)} rounded-full px-3 py-1`}>{exam.level}</Badge>
                    <Badge className={`${getDifficultyColor(exam.difficulty)} rounded-full px-3 py-1`}>
                      {getDifficultyText(exam.difficulty)}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="rounded-full">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exam.year}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{exam.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-jlpt-red" />
                    {exam.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-jlpt-red" />
                    {exam.questions} {t("common.questions")}
                  </div>
                  <div className="flex items-center col-span-2">
                    <Users className="h-4 w-4 mr-2 text-jlpt-red" />
                    {exam.participants.toLocaleString()} {t("common.participants")}
                  </div>
                </div>
                <Button className="w-full bg-jlpt-red hover:bg-red-800 text-white rounded-xl" asChild>
                  <Link href={`/practice/${exam.id}`}>{t("practice.view_detail")}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("practice.no_results")}</h3>
            <p className="text-gray-600">{t("practice.no_results_desc")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
