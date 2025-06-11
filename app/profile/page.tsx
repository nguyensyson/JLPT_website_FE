"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Calendar, Trophy, BookOpen, Clock, TrendingUp, Edit, Save, X } from "lucide-react"

const userProfile = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  joinDate: "15/03/2024",
  currentPlan: "Miễn phí",
  planExpiry: null,
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    totalExams: 15,
    averageScore: 78,
    bestScore: 95,
    studyTime: "24 giờ",
    streak: 7,
  },
}

const examHistory = [
  {
    id: 1,
    title: "JLPT N5 - Đề thi tháng 7/2023",
    level: "N5",
    date: "20/12/2024",
    score: 85,
    totalQuestions: 103,
    correctAnswers: 87,
    timeSpent: "95 phút",
    status: "Đậu",
  },
  {
    id: 2,
    title: "JLPT N5 - Đề thi tháng 12/2023",
    level: "N5",
    date: "18/12/2024",
    score: 72,
    totalQuestions: 103,
    correctAnswers: 74,
    timeSpent: "105 phút",
    status: "Đậu",
  },
  {
    id: 3,
    title: "JLPT N4 - Đề thi tháng 7/2023",
    level: "N4",
    date: "15/12/2024",
    score: 58,
    totalQuestions: 123,
    correctAnswers: 71,
    timeSpent: "125 phút",
    status: "Trượt",
  },
  {
    id: 4,
    title: "JLPT N5 - Đề thi tháng 7/2022",
    level: "N5",
    date: "12/12/2024",
    score: 95,
    totalQuestions: 103,
    correctAnswers: 98,
    timeSpent: "88 phút",
    status: "Đậu",
  },
  {
    id: 5,
    title: "JLPT N5 - Đề thi tháng 12/2022",
    level: "N5",
    date: "10/12/2024",
    score: 67,
    totalQuestions: 103,
    correctAnswers: 69,
    timeSpent: "102 phút",
    status: "Đậu",
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

const getStatusColor = (status: string) => {
  return status === "Đậu" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(userProfile.name)
  const [editedEmail, setEditedEmail] = useState(userProfile.email)

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
    alert("Thông tin đã được cập nhật!")
  }

  const handleCancel = () => {
    setEditedName(userProfile.name)
    setEditedEmail(userProfile.email)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-lg text-gray-600">Quản lý thông tin tài khoản và theo dõi tiến độ học tập</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="profile" className="rounded-lg">
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">
              Lịch sử luyện đề
            </TabsTrigger>
            <TabsTrigger value="stats" className="rounded-lg">
              Thống kê
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-jlpt-red" />
                        Thông tin cá nhân
                      </CardTitle>
                      {!isEditing ? (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="rounded-lg">
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={handleCancel} className="rounded-lg">
                            <X className="h-4 w-4 mr-2" />
                            Hủy
                          </Button>
                          <Button size="sm" onClick={handleSave} className="bg-jlpt-red hover:bg-red-800 rounded-lg">
                            <Save className="h-4 w-4 mr-2" />
                            Lưu
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                        <AvatarFallback className="bg-jlpt-red text-white text-xl">
                          {userProfile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {!isEditing ? (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{userProfile.name}</h3>
                            <p className="text-gray-600">{userProfile.email}</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name">Họ và tên</Label>
                              <Input
                                id="name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="rounded-lg"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-jlpt-red mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Ngày tham gia</p>
                          <p className="font-semibold">{userProfile.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-jlpt-red mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Gói hiện tại</p>
                          <Badge className="bg-gray-100 text-gray-800">{userProfile.currentPlan}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-jlpt-red" />
                      Thống kê nhanh
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-jlpt-red">{userProfile.stats.totalExams}</div>
                      <div className="text-sm text-gray-600">Đề đã làm</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-jlpt-red">{userProfile.stats.averageScore}</div>
                      <div className="text-sm text-gray-600">Điểm trung bình</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-jlpt-red">{userProfile.stats.bestScore}</div>
                      <div className="text-sm text-gray-600">Điểm cao nhất</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-jlpt-red" />
                  Lịch sử luyện đề
                </CardTitle>
                <CardDescription>Danh sách các đề thi bạn đã hoàn thành</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {examHistory.map((exam) => (
                    <div key={exam.id} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getLevelColor(exam.level)} rounded-full`}>{exam.level}</Badge>
                          <Badge className={`${getStatusColor(exam.status)} rounded-full`}>{exam.status}</Badge>
                        </div>
                        <span className="text-sm text-gray-600">{exam.date}</span>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">{exam.title}</h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 text-jlpt-red mr-2" />
                          <span>{exam.score}/100 điểm</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-jlpt-red mr-2" />
                          <span>
                            {exam.correctAnswers}/{exam.totalQuestions} câu
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-jlpt-red mr-2" />
                          <span>{exam.timeSpent}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600">
                            {Math.round((exam.correctAnswers / exam.totalQuestions) * 100)}% đúng
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-jlpt-red mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">{userProfile.stats.totalExams}</div>
                  <div className="text-sm text-gray-600">Tổng số đề đã làm</div>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 text-jlpt-red mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">{userProfile.stats.averageScore}</div>
                  <div className="text-sm text-gray-600">Điểm trung bình</div>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-jlpt-red mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">{userProfile.stats.bestScore}</div>
                  <div className="text-sm text-gray-600">Điểm cao nhất</div>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-jlpt-red mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">{userProfile.stats.studyTime}</div>
                  <div className="text-sm text-gray-600">Thời gian học</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Tiến độ học tập theo thời gian</CardTitle>
                <CardDescription>Biểu đồ thể hiện sự cải thiện điểm số qua các lần thi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Biểu đồ tiến độ sẽ được hiển thị ở đây</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
