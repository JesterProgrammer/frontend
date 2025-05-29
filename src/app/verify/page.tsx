"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface Student {
  request_id: number
  id: number
  z_n: string
  tg_handle: string
  fio: string
  inst: string
  napr: string
  kurs: string
  gruppa: string
  f_o: string
  vid_n: string
  god_post: string
  kaf: string
}

const API_URL = "http://localhost:3001"

export default function VerifyPage() {
  const [selected, setSelected] = useState<number[]>([])
  const [students, setStudents] = useState<Record<number, Student>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/verify/requests`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        setError("Ошибка при загрузке данных")
      }
    } catch (err) {
      setError("Ошибка при загрузке данных")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (requestIds: number[], isVerified: boolean) => {
    try {
      const response = await fetch(`${API_URL}/api/verify/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          requestIds,
          isVerified,
        }),
      })

      if (response.ok) {
        // Обновляем список студентов после верификации
        fetchStudents()
        setSelected([])
      } else {
        setError("Ошибка при обновлении статуса")
      }
    } catch (err) {
      setError("Ошибка при обновлении статуса")
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
        <div className="flex justify-between mb-5">
          <Button
            disabled={selected.length === 0}
            onClick={() => handleVerify(selected, true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Подтвердить выбранных
          </Button>
          <Button
            disabled={selected.length === 0}
            onClick={() => handleVerify(selected, false)}
            className="bg-red-600 hover:bg-red-700"
          >
            Отказать выбранных
          </Button>
        </div>

        <p className="mb-4 text-lg text-center">
          Список студентов запросивших верификацию:
        </p>
        <div className="grid gap-4">
          {Object.values(students).map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <div className="flex justify-between gap-6 items-center">
                  <Checkbox
                    checked={selected.includes(student.id)}
                    onCheckedChange={(checked) =>
                      checked
                        ? setSelected([...selected, student.id])
                        : setSelected(selected.filter((id) => id !== student.id))
                    }
                    id={student.id.toString()}
                  />
                  <Label htmlFor={student.id.toString()} className="w-full">
                    <CardTitle>{student.fio}</CardTitle>
                    <CardDescription>{student.z_n}</CardDescription>
                  </Label>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <p>ID телеграм: {student.tg_handle}</p>
                  <p>ФИО: {student.fio}</p>
                  <p>Номер зачетки: {student.z_n}</p>
                  <p>Институт: {student.inst}</p>
                  <p>Направление: {student.napr}</p>
                  <p>Курс: {student.kurs}</p>
                  <p>Группа: {student.gruppa}</p>
                  <p>Форма обучения: {student.f_o}</p>
                  <p>Вид обучения: {student.vid_n}</p>
                  <p>Год поступления: {student.god_post}</p>
                  <p>Кафедра: {student.kaf}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button
                  onClick={() => handleVerify([student.id], true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Подтвердить
                </Button>
                <Button
                  onClick={() => handleVerify([student.id], false)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Отказать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 