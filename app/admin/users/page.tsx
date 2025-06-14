"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserCheck, UserX, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    plan: "Premium",
    joinDate: "15/03/2024",
    status: "active",
    lastActive: "2 giờ trước",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@email.com",
    plan: "Free",
    joinDate: "20/03/2024",
    status: "active",
    lastActive: "1 ngày trước",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@email.com",
    plan: "Premium",
    joinDate: "10/03/2024",
    status: "inactive",
    lastActive: "1 tuần trước",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    plan: "Basic",
    joinDate: "25/02/2024",
    status: "active",
    lastActive: "5 phút trước",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@email.com",
    plan: "Free",
    joinDate: "01/03/2024",
    status: "active",
    lastActive: "3 giờ trước",
  },
]

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userList, setUserList] = useState(users)

  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleUserStatus = (userId: number) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      setUserList((prev) => prev.filter((user) => user.id !== userId))
    }
  }

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quản lý tài khoản</h1>
        <p className="text-gray-600">Quản lý thông tin và trạng thái tài khoản người dùng</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-jlpt-red" />
            Tìm kiếm tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Button className="bg-jlpt-red hover:bg-red-800 rounded-xl">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Danh sách tài khoản ({filteredUsers.length})</CardTitle>
          <CardDescription>Quản lý thông tin và trạng thái của tất cả tài khoản người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Tên</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Gói tài khoản</TableHead>
                  <TableHead className="font-semibold">Ngày đăng ký</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Hoạt động cuối</TableHead>
                  <TableHead className="font-semibold text-center">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getPlanColor(user.plan)} rounded-full`}>{user.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(user.status)} rounded-full`}>
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={`/admin/users/${user.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => toggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Vô hiệu hóa
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Kích hoạt
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa tài khoản
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
              Hiển thị {filteredUsers.length} trên tổng số {users.length} tài khoản
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
