"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, User, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [userRole, setUserRole] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Check login status from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const storedUsername = localStorage.getItem("username") || ""
    const storedRole = localStorage.getItem("userRole") || ""

    setIsLoggedIn(loggedIn)
    setUsername(storedUsername)
    setUserRole(storedRole)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")
    setIsLoggedIn(false)
    setUsername("")
    setUserRole("")
    router.push("/")
  }

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.practice"), href: "/practice" },
    { name: t("nav.activate"), href: "/activate" },
    { name: t("nav.profile"), href: "/profile" },
  ]

  return (
    <header className="bg-white shadow-lg border-b-4 border-jlpt-red">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <div className="w-10 h-10 bg-jlpt-red rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-jlpt-black">JLPT Practice</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 px-4 py-2 rounded-lg transition-all duration-200",
                pathname === item.href ? "text-white bg-jlpt-red shadow-lg" : "text-gray-900 hover:bg-gray-100",
              )}
            >
              {item.name}
            </Link>
          ))}
          {userRole === "admin" && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-semibold leading-6 px-4 py-2 rounded-lg transition-all duration-200",
                pathname.startsWith("/admin") ? "text-white bg-jlpt-red shadow-lg" : "text-gray-900 hover:bg-gray-100",
              )}
            >
              Quản trị
            </Link>
          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {isLoggedIn ? (
            <Button variant="outline" className="rounded-xl" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất {username && `(${username})`}
            </Button>
          ) : (
            <Button className="bg-jlpt-red hover:bg-red-800 text-white rounded-xl" asChild>
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                {t("nav.login")}
              </Link>
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10" />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="w-8 h-8 bg-jlpt-red rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-jlpt-black">JLPT Practice</span>
              </Link>
              <Button
                variant="ghost"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                        pathname === item.href ? "text-white bg-jlpt-red" : "text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {userRole === "admin" && (
                    <Link
                      href="/admin"
                      className={cn(
                        "block rounded-lg px-3 py-2 text-base font-semibold leading-7",
                        pathname.startsWith("/admin") ? "text-white bg-jlpt-red" : "text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Quản trị
                    </Link>
                  )}
                </div>
                <div className="py-6 space-y-4">
                  {/* Mobile Language Switcher */}
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>

                  {isLoggedIn ? (
                    <Button className="w-full" variant="outline" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Đăng xuất {username && `(${username})`}
                    </Button>
                  ) : (
                    <Button className="w-full bg-jlpt-red hover:bg-red-800 text-white rounded-xl" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        {t("nav.login")}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
