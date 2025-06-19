"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "https://api.jesterstudio.ru"

const routes = [
  {
    href: "/",
    label: "Главная",
  },
  // {
  //   href: "/about",
  //   label: "О нас",
  // },
  // {
  //   href: "/blog",
  //   label: "Блог",
  // },
  // {
  //   href: "/contacts",
  //   label: "Контакты",
  // },
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
  const [fullName, setFullName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const PUBLIC_PATHS = ["/auth", "/createProfile"];
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (isPublic) return; // просто не делаем запрос, если публичная страница
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.data && response.data.fullName) {
          setFullName(response.data.fullName);
        } else {
          setFullName(null);
        }
      } catch {
        // Не сбрасываем fullName в null, если уже был авторизован
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [pathname, isPublic]);

  if (isPublic) return null;

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  if (!fullName) return null;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      router.push("/auth");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-opacity duration-500 animate-navbar-fade-in">
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
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground/80">{fullName}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-foreground/60 hover:text-white hover:bg-red-500 transition-all duration-300 px-3 py-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <span className="relative z-10">Выйти</span>
          </button>
        </div>
      </div>
    </header>
  )
} 