"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const API_URL = "http://localhost:3001"

const routes = [
  {
    href: "/",
    label: "Главная",
  },
  {
    href: "/about",
    label: "О нас",
  },
  {
    href: "/blog",
    label: "Блог",
  },
  {
    href: "/contacts",
    label: "Контакты",
  },
  {
    href: "/verify",
    label: "Верификация",
  },
//   {
//     href: "/createProfile",
//     label: "Создать профиль",
//   }
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      })
      router.push("/auth")
    } catch (error) {
      console.error("Ошибка при выходе:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === route.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-foreground/60 hover:text-foreground/80 transition-colors"
        >
          Выйти
        </button>
      </div>
    </header>
  )
} 