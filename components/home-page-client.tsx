"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Users, BookOpen, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const benefits = [
  {
    icon: BookOpen,
    titleKey: "home.benefits.official_tests",
    descKey: "home.benefits.official_tests_desc",
  },
  {
    icon: Trophy,
    titleKey: "home.benefits.progress_tracking",
    descKey: "home.benefits.progress_tracking_desc",
  },
  {
    icon: Zap,
    titleKey: "home.benefits.smart_practice",
    descKey: "home.benefits.smart_practice_desc",
  },
  {
    icon: Users,
    titleKey: "home.benefits.community",
    descKey: "home.benefits.community_desc",
  },
]

export function HomePageClient() {
  const { t } = useLanguage()

  const plans = [
    {
      nameKey: "home.pricing.free",
      price: "0đ",
      period: t("home.pricing.free"),
      descKey: "home.pricing.free_desc",
      features: ["5 đề thi mỗi tháng", "Kết quả cơ bản", "Hỗ trợ N5, N4", "Quảng cáo hiển thị"],
      popular: false,
      buttonTextKey: "home.pricing.start_free",
    },
    {
      nameKey: "home.pricing.monthly",
      price: "99,000đ",
      period: "tháng",
      descKey: "home.pricing.monthly_desc",
      features: [
        "Không giới hạn đề thi",
        "Phân tích chi tiết kết quả",
        "Hỗ trợ tất cả cấp độ N1-N5",
        "Không quảng cáo",
        "Hỗ trợ 24/7",
      ],
      popular: true,
      buttonTextKey: "home.pricing.choose_plan",
    },
    {
      nameKey: "home.pricing.yearly",
      price: "799,000đ",
      period: "năm",
      descKey: "home.pricing.yearly_desc",
      features: [
        "Tất cả tính năng gói 1 tháng",
        "Ưu tiên hỗ trợ",
        "Tài liệu học tập độc quyền",
        "Webinar trực tuyến",
        "Chứng chỉ hoàn thành",
      ],
      popular: false,
      buttonTextKey: "home.pricing.save_33",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jlpt-red via-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {t("home.hero.title")}
              <span className="block text-yellow-300">{t("home.hero.subtitle")}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">{t("home.hero.description")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-jlpt-red hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                {t("home.hero.start")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-jlpt-red rounded-xl px-8 py-4 text-lg"
              >
                {t("home.hero.demo")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("home.benefits.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t("home.benefits.subtitle")}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.titleKey} className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-jlpt-red/10">
                    <benefit.icon className="h-8 w-8 text-jlpt-red" aria-hidden="true" />
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">{t(benefit.titleKey)}</dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{t(benefit.descKey)}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("home.pricing.title")}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t("home.pricing.subtitle")}</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.nameKey}
                className={`relative rounded-2xl shadow-lg ${plan.popular ? "ring-2 ring-jlpt-red" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-jlpt-red text-white px-4 py-1">
                    <Star className="h-4 w-4 mr-1" />
                    {t("home.pricing.popular")}
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{t(plan.nameKey)}</CardTitle>
                  <CardDescription className="text-gray-600">{t(plan.descKey)}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-jlpt-red">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl py-3 mt-8 ${
                      plan.popular
                        ? "bg-jlpt-red hover:bg-red-800 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                    asChild
                  >
                    <Link href="/activate">{t(plan.buttonTextKey)}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-jlpt-red">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("home.cta.title")}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">{t("home.cta.subtitle")}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-white text-jlpt-red hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                {t("home.cta.register")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
