"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios, { AxiosError } from "axios"

interface VerificationStatus {
  code?: string
  status?: string
}

interface BackendErrorResponse {
  error?: string;
}

interface RequestItem {
  id: number;
  gradeBook: string;
  Code: string;
  status: string;
}

const API_URL = "https://api.jesterstudio.ru"

export default function VerifyPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [gradeBookInput, setGradeBookInput] = useState("")
  const [verificationResult, setVerificationResult] = useState<VerificationStatus | null>(null)
  const [requests, setRequests] = useState<RequestItem[]>([])

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/verify/requests`);
      setRequests(res.data);
    } catch {
      // Можно добавить обработку ошибок
    }
  };

  useEffect(() => {
    setLoading(false)
    fetchRequests()
  }, [])

  const handleGenerateAccess = async () => {
    setError("")
    setLoading(true)
    setVerificationResult(null)

    if (!gradeBookInput) {
      setError("Пожалуйста, введите номер зачетной книжки.")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${API_URL}/api/verify/generate-access`, {
        gradeBook: gradeBookInput,
      })

      if (response.data && response.data.code) {
        setVerificationResult({ code: response.data.code, status: response.data.status || 'pending' })
        fetchRequests()
      } else {
        setError(response.data?.error || "Ошибка генерации доступа. Получен неожиданный ответ.");
      }
    } catch (err) {
      const axiosError = err as AxiosError<BackendErrorResponse>;
      const errorMessage = axiosError.response?.data?.error ?? "Произошла неизвестная ошибка при запросе.";
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Верификация заявок</h1>
      <div className="w-full max-w-4xl mx-auto">
        <p className="mb-4 text-lg text-center">
          Список на активацию:
        </p>
        <div className="mt-6 text-center text-muted-foreground text-xs font-inter">
          {/* Ваша подпись */}
        </div>
      </div>

      <div className="mt-6 text-center text-muted-foreground text-xs font-inter">
        {/* Ваша подпись */}
      </div>

      {/* Центрируем форму */}
      <div className="flex justify-center items-center w-full mt-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Верификация аккаунта</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gradeBook">Номер зачётной книжки</Label>
              <Input
                id="gradeBook"
                type="text"
                placeholder="Введите номер зачётки"
                value={gradeBookInput}
                onChange={(e) => setGradeBookInput(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleGenerateAccess}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Генерация..." : "Генерация доступа"}
            </Button>

            {verificationResult && (
              <div className="space-y-4 mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Ваши данные для активации:</h3>

                {verificationResult.code && (
                  <div className="flex flex-col items-center space-y-2">
                    <Label>Код активации:</Label>
                    <div className="text-4xl font-bold text-primary">{verificationResult.code}</div>
                    <p className="text-sm text-muted-foreground text-center">
                      Используйте этот код для активации аккаунта в боте.
                    </p>
                  </div>
                )}

                {verificationResult.status && (
                  <div className="space-y-2">
                    <Label>Статус заявки:</Label>
                    <p className="text-base font-medium">{verificationResult.status}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Список заявок на верификацию */}
      <div className="w-full max-w-2xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">Список заявок на верификацию</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Зачётная книжка</th>
                <th className="border px-2 py-1">Код</th>
                <th className="border px-2 py-1">Статус</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req.id}>
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1">{req.gradeBook}</td>
                  <td className="border px-2 py-1">{req.Code}</td>
                  <td className="border px-2 py-1">{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div className="text-center text-muted-foreground mt-4">Нет заявок на верификацию</div>
          )}
        </div>
      </div>
    </div>
  )
} 