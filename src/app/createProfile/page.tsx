"use client"

// New Next.js page file for the Telegram WebApp

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";

const institutes = [
  'ИНГЭ',
  'ИКСИБ',
  'ИППП',
  'ИЭУБ',
  'ИСТИ',
  'ИМРИТТС',
  'ИФН',
  'ИТК',
];

const TelegramWebApp: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    inst: "",
    Ugroup: "",
    gradeBook: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!form.fullName || !form.inst || !form.Ugroup || !form.gradeBook) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    let telegramID = "";
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      telegramID = window.Telegram.WebApp.initDataUnsafe.user.id.toString();
    }
    if (!telegramID) {
      setError("Не удалось получить Telegram ID. Откройте форму через Telegram.");
      return;
    }

    try {
      const res = await fetch("https://api.jesterstudio.ru/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          telegramID,
          department: "",
          year: 1,
          admissionYear: new Date().getFullYear(),
          program: "",
          FoE: "",
          typeOfSet: ""
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setSuccess("Профиль успешно отправлен!");
      } else {
        setError(data.error || "Ошибка при создании профиля");
      }
    } catch {
      setError("Ошибка отправки");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-inter">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            {!submitted && (
              <>
                <Icon icon="lucide:message-circle" className="text-primary text-4xl mb-2" />
                <h1 className="font-inter text-2xl mb-1">Регистрация</h1>
                <p className="text-muted-foreground text-sm mb-6 font-inter">
                  Введите информацию о вас ниже
                </p>
              </>
            )}
            {!submitted ? (
              <>
                <div className="w-full space-y-2">
                  <label className="text-sm font-medium font-inter">ФИО</label>
                  <Input
                    name="fullName"
                    placeholder="Иванов Иван Иванович"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full font-inter"
                    required
                  />
                </div>
                <div className="h-4" />
                <div className="w-full space-y-2">
                  <label className="text-sm font-medium font-inter">Институт</label>
                  <select
                    name="inst"
                    value={form.inst}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 font-inter"
                    required
                  >
                    <option value="">Выберите институт</option>
                    {institutes.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div className="h-4" />
                <div className="w-full space-y-2">
                  <label className="text-sm font-medium font-inter">Учебная группа</label>
                  <Input
                    name="Ugroup"
                    placeholder="24-КБ-ПР2"
                    value={form.Ugroup}
                    onChange={handleChange}
                    className="w-full font-inter"
                    required
                  />
                </div>
                <div className="h-4" />
                <div className="w-full space-y-2">
                  <label className="text-sm font-medium font-inter">Номер зачётки</label>
                  <Input
                    name="gradeBook"
                    placeholder="23-ЗКМ-ИВ08"
                    value={form.gradeBook}
                    onChange={handleChange}
                    className="w-full font-inter"
                    required
                  />
                </div>
                <div className="h-4" />
                {error && <div className="mb-2 text-red-600">{error}</div>}
                {success && <div className="mb-2 text-green-600">{success}</div>}
                <Button
                  className="w-full font-inter"
                  onClick={handleSubmit}
                >
                  <Icon icon="lucide:send" className="mr-2" />
                  Отправить
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Icon icon="lucide:check" className="text-green-600 text-2xl" />
                </div>
                <div className="h-2" />
                <h2 className="font-inter text-xl text-green-600">Спасибо!</h2>
                <p className="text-muted-foreground mt-2 font-inter">
                  Ваша заявка была отправлена на проверку <br /><br />
                  А пока можете пользоваться ограниченным функционалом
                </p>
                <div className="h-4" />
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="font-inter"
                >
                  Заполнить ещё раз
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 text-center text-muted-foreground text-xs font-inter">
        <p>Эта страница была разработана специально для <br />&quot;КубГТУ: Цифровой Институт&quot;</p>
      </div>
    </div>
  );
};

export default TelegramWebApp;