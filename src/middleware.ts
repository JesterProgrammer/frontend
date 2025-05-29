import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Пропускаем все запросы к API
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const authToken = request.cookies.get("auth_token")
  const isAuthPage = request.nextUrl.pathname === "/auth"

  // Если пользователь не авторизован и пытается получить доступ к защищенным страницам
  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  // Если пользователь авторизован и пытается получить доступ к странице авторизации
  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
} 