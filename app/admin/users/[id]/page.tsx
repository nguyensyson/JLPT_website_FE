"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Calendar, CreditCard, Activity, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

// Mock user data
const userDetail = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  phone: "+84 123 456 789",
  plan: "Premium",
  joinDate: "15/03/2024",
  lastActive: "2 giờ trước",
  status: "active",
  avatar: "/placeholder.svg?height=100&width=100",
  stats: {
    totalExams: 25,
    averageScore: 85,
    bestScore: 95,
    studyTime: "48 giờ",
    currentStreak: 7,
  },
  recentExams: [
    { id: 1, title: "JLPT N5 - Đề thi tháng 7/2023", score: 85, date: "20/12/2024", status: "Đậu" },
    { id: 2, title: "JLPT N4 - Đề thi tháng 12/2023", score: 72, date: "18/12/2024", status: "Đậu" },
    { id: 3, title: "JLPT N5 - Đề thi tháng 7/2022", score: 95, date: "15/12/2024", status: "Đậu" },
  ],
  planHistory: [
    { plan: "Premium", startDate: "01/11/2024", endDate: "01/11/2025", status: "active" },
    { plan: "Basic", startDate: "15/03/2024", endDate: "01/11/2024", status: "expired" },
  ],
}

export default function UserDetail({ params }: { params: { id: string } }) {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-yellow-100 text-yellow-800"
      case "Basic":
        return "bg-blue-100 text-blue-800"
      case "Free":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild className="rounded-lg">
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Chi tiết tài khoản</h1>
          <p className="text-gray-600">Thông tin chi tiết và hoạt động của người dùng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={userDetail.avatar || "/placeholder.svg"} alt={userDetail.name} />
                <AvatarFallback className="bg-jlpt-red text-white text-2xl">{userDetail.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{userDetail.name}</CardTitle>
              <div className="flex justify-center space-x-2">
                <Badge className={`${getPlanColor(userDetail.plan)} rounded-full`}>{userDetail.plan}</Badge>
                <Badge className={`${getStatusColor(userDetail.status)} rounded-full`}>
                  {userDetail.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{userDetail.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Tham gia: {userDetail.joinDate}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Hoạt động cuối: {userDetail.lastActive}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-jlpt-red">{userDetail.stats.totalExams}</div>
                  <div className="text-xs text-gray-600">Đề đã làm</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-jlpt-red">{userDetail.stats.averageScore}</div>
                  <div className="text-xs text-gray-600">Điểm TB</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-jlpt-red">{userDetail.stats.bestScore}</div>
                  <div className="text-xs text-gray-600">Điểm cao nhất</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-jlpt-red">{userDetail.stats.currentStreak}</div>
                  <div className="text-xs text-gray-600">Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Exams */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-jlpt-red" />
                Đề thi gần đây
              </CardTitle>
              <CardDescription>Các đề thi người dùng đã hoàn thành gần đây</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDetail.recentExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{exam.title}</h4>
                      <p className="text-sm text-gray-600">{exam.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-jlpt-red" />
                        <span className="font-semibold">{exam.score} điểm</span>
                      </div>
                      <Badge
                        className={exam.status === "Đậu" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {exam.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan History */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-jlpt-red" />
                Lịch sử gói dịch vụ
              </CardTitle>
              <CardDescription>Các gói dịch vụ người dùng đã sử dụng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userDetail.planHistory.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <Badge className={`${getPlanColor(plan.plan)} rounded-full mr-2`}>{plan.plan}</Badge>
                      <span className="text-sm text-gray-600">
                        {plan.startDate} - {plan.endDate}
                      </span>
                    </div>
                    <Badge
                      className={plan.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {plan.status === "active" ? "Đang sử dụng" : "Đã hết hạn"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
