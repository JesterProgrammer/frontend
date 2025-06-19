import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Список страниц, доступных без авторизации
const PUBLIC_PATHS = [
  "/auth",
  "/createProfile"
  // Добавляйте сюда новые публичные страницы
];

export function middleware(request: NextRequest) {
  // Пропускаем все запросы к API
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Получаем все куки и ищем нашу
  const allCookies = request.cookies.getAll()
  const authCookie = allCookies.find(cookie => cookie.name === 'auth_token')
  const isPublic = PUBLIC_PATHS.includes(request.nextUrl.pathname)

  console.log('Middleware:', {
    path: request.nextUrl.pathname,
    hasToken: !!authCookie,
    isPublic,
    allCookies: allCookies.map(c => c.name)
  })

  // Если пользователь не авторизован и пытается получить доступ к защищенным страницам
  if (!authCookie && !isPublic) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Если пользователь авторизован и пытается получить доступ к странице авторизации
  if (authCookie && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
} 