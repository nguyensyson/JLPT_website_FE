"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Crown, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const currentUser = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  currentPlan: "free",
  expiryDate: null,
}

export default function ActivatePage() {
  const { t } = useLanguage()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: "free",
      nameKey: "activate.plan_free",
      price: "0đ",
      period: "mãi mãi",
      descKey: "activate.plan_free_desc",
      icon: Zap,
      features: ["5 đề thi mỗi tháng", "Kết quả cơ bản", "Hỗ trợ N5, N4", "Quảng cáo hiển thị", "Hỗ trợ email"],
      limitations: ["Giới hạn 5 đề/tháng", "Không có phân tích chi tiết", "Có quảng cáo"],
      popular: false,
      buttonTextKey: "activate.current_plan",
      current: true,
    },
    {
      id: "monthly",
      nameKey: "activate.plan_monthly",
      price: "99,000đ",
      period: "tháng",
      descKey: "activate.plan_monthly_desc",
      icon: Star,
      features: [
        "Không giới hạn đề thi",
        "Phân tích chi tiết kết quả",
        "Hỗ trợ tất cả cấp độ N1-N5",
        "Không quảng cáo",
        "Hỗ trợ 24/7",
        "Tải xuống kết quả PDF",
        "Thống kê tiến độ học tập",
      ],
      limitations: [],
      popular: true,
      buttonTextKey: "activate.upgrade_now",
      current: false,
    },
    {
      id: "yearly",
      nameKey: "activate.plan_yearly",
      price: "799,000đ",
      period: "năm",
      originalPrice: "1,188,000đ",
      descKey: "activate.plan_yearly_desc",
      icon: Crown,
      features: [
        "Tất cả tính năng gói 1 tháng",
        "Ưu tiên hỗ trợ",
        "Tài liệu học tập độc quyền",
        "Webinar trực tuyến hàng tháng",
        "Chứng chỉ hoàn thành",
        "Mentor 1-1 (2 buổi/tháng)",
        "Truy cập sớm tính năng mới",
      ],
      limitations: [],
      popular: false,
      buttonTextKey: "home.pricing.save_33",
      current: false,
    },
  ]

  const handleUpgrade = async (planId: string) => {
    setSelectedPlan(planId)
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedPlan(null)
      alert(`Đã nâng cấp thành công lên gói ${t(plans.find((p) => p.id === planId)?.nameKey || "")}!`)
    }, 2000)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("activate.title")}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">{t("activate.description")}</p>
        </div>

        {/* Current Plan Status */}
        <Card className="mb-8 shadow-lg rounded-2xl bg-gradient-to-r from-jlpt-red to-red-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">{t("activate.current_account")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{currentUser.name}</p>
                <p className="text-red-100">{currentUser.email}</p>
                <div className="mt-2">
                  <Badge className="bg-white text-jlpt-red">
                    Gói {t(plans.find((p) => p.id === currentUser.currentPlan)?.nameKey || "")}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-100">{t("activate.status")}</p>
                <p className="text-lg font-semibold">{t("activate.active")}</p>
                {currentUser.expiryDate && <p className="text-sm text-red-100">Hết hạn: {currentUser.expiryDate}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isCurrent = plan.id === currentUser.currentPlan

            return (
              <Card
                key={plan.id}
                className={`relative rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "ring-2 ring-jlpt-red scale-105" : ""
                } ${isCurrent ? "bg-gray-50 border-2 border-green-500" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-jlpt-red text-white px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    {t("home.pricing.popular")}
                  </Badge>
                )}

                {isCurrent && (
                  <Badge className="absolute -top-3 right-4 bg-green-500 text-white px-4 py-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {t("activate.current_plan")}
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="mx-auto w-16 h-16 bg-jlpt-red/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-jlpt-red" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{t(plan.nameKey)}</CardTitle>
                  <CardDescription className="text-gray-600">{t(plan.descKey)}</CardDescription>
                  <div className="mt-4">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-jlpt-red">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      Tiết kiệm{" "}
                      {Math.round(
                        (1 -
                          Number.parseInt(plan.price.replace(/\D/g, "")) /
                            Number.parseInt(plan.originalPrice.replace(/\D/g, ""))) *
                          100,
                      )}
                      %
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">{t("activate.features_included")}</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{t("activate.limitations")}</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-gray-300 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full rounded-xl py-3 mt-8 ${
                      isCurrent
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : plan.popular
                          ? "bg-jlpt-red hover:bg-red-800 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                    disabled={isCurrent || isProcessing}
                    onClick={() => !isCurrent && handleUpgrade(plan.id)}
                  >
                    {isProcessing && selectedPlan === plan.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("activate.processing")}
                      </>
                    ) : (
                      t(plan.buttonTextKey)
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
