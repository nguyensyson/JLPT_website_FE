"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", shortFlag: "VN" },
  { code: "en", name: "English", flag: "🇺🇸", shortFlag: "US" },
  { code: "ja", name: "日本語", flag: "🇯🇵", shortFlag: "JP" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <div className="flex items-center">
          <span className="text-base font-medium mr-1">{currentLanguage.shortFlag}</span>
          <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-180")} />
        </div>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3",
                  language === lang.code && "bg-jlpt-red/5 text-jlpt-red",
                )}
              >
                <span className="text-base font-medium">{lang.shortFlag}</span>
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{lang.name}</span>
                {language === lang.code && <div className="ml-auto w-2 h-2 bg-jlpt-red rounded-full" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
