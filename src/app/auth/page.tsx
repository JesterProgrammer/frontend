"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

const API_URL = "https://api.jesterstudio.ru"

type ApiError = {
  response?: {
    data?: {
      error?: string
    }
  }
}

export default function Auth() {
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify`,
        { 
          'token': token
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      console.log(response.data)
      console.log('Cookies:', document.cookie)
      
      if (response.data.success == true) {
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 100)
      } else {
        setError(response.data.error || "Неверный токен")
      }
    } catch (err) {
      setError((err as ApiError)?.response?.data?.error || "Ошибка при проверке токена")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Авторизация</h1>
          <p className="mt-2 text-muted-foreground">
            Введите токен для доступа к сайту
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="token" className="sr-only">
              Токен
            </label>
            <input
              id="token"
              name="token"
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary"
              placeholder="Введите токен"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
} 