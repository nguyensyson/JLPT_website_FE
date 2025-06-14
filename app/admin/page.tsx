"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, Activity } from "lucide-react"

// Mock data
const stats = {
  totalUsers: 12543,
  totalExams: 156,
  practiceAttempts: 8924,
  activeUsers: 3421,
}

const topUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", attempts: 45, avgScore: 85 },
  { id: 2, name: "Trần Thị B", email: "tranthib@email.com", attempts: 38, avgScore: 92 },
  { id: 3, name: "Lê Văn C", email: "levanc@email.com", attempts: 35, avgScore: 78 },
  { id: 4, name: "Phạm Thị D", email: "phamthid@email.com", attempts: 32, avgScore: 88 },
  { id: 5, name: "Hoàng Văn E", email: "hoangvane@email.com", attempts: 29, avgScore: 81 },
]

const recentActivities = [
  { id: 1, user: "Nguyễn Văn A", action: "Hoàn thành đề thi JLPT N5", time: "2 phút trước" },
  { id: 2, user: "Trần Thị B", action: "Đăng ký gói Premium", time: "15 phút trước" },
  { id: 3, user: "Lê Văn C", action: "Bắt đầu đề thi JLPT N4", time: "1 giờ trước" },
  { id: 4, user: "Phạm Thị D", action: "Cập nhật thông tin cá nhân", time: "2 giờ trước" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống JLPT Practice</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng tài khoản</CardTitle>
            <Users className="h-5 w-5 text-jlpt-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+12% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng đề thi</CardTitle>
            <BookOpen className="h-5 w-5 text-jlpt-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalExams}</div>
            <p className="text-xs text-green-600 mt-1">+3 đề mới tuần này</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lượt luyện đề (30 ngày)</CardTitle>
            <TrendingUp className="h-5 w-5 text-jlpt-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.practiceAttempts.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+18% so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Người dùng hoạt động</CardTitle>
            <Activity className="h-5 w-5 text-jlpt-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Trong 24 giờ qua</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Users */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-jlpt-red" />
              Top 5 người dùng luyện đề nhiều nhất
            </CardTitle>
            <CardDescription>Thống kê trong 30 ngày gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-jlpt-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{user.attempts} lần</p>
                    <p className="text-sm text-gray-600">TB: {user.avgScore} điểm</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-jlpt-red" />
              Hoạt động gần đây
            </CardTitle>
            <CardDescription>Các hoạt động mới nhất của người dùng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="w-2 h-2 bg-jlpt-red rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Biểu đồ thống kê</CardTitle>
          <CardDescription>Lượt truy cập và luyện đề theo thời gian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
