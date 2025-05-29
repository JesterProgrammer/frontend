"use client"

// New Next.js page file for the Telegram WebApp

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { TelegramWebAppProvider } from "@/components/webapp-provider";

const TelegramWebApp: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleSubmit = () => {
    if (inputValue.trim()) {
      console.log("Submitted value:", inputValue);
      setSubmitted(true);
      
      // If Telegram WebApp is available, close the webapp and send data back
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({ input: inputValue }));
        window.Telegram.WebApp.close();
      }
    }
  };

  return (
    <TelegramWebAppProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-coco">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Icon icon="lucide:message-circle" className="text-primary text-4xl mb-2" />
              <h1 className="font-coco text-2xl mb-1">Регистрация</h1>
              <p className="text-muted-foreground text-sm mb-6 font-coco">
                Введите информацию о вас ниже
              </p>
              
              {!submitted ? (
                <>
                  <div className="w-full space-y-2">
                    <label className="text-sm font-medium font-coco">ФИО</label>
                    <Input
                      placeholder="Иванов Иван Иванович"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full font-coco"
                    />
                  </div>
                  
                  <div className="h-4" />
                  
                  <Button 
                    className="w-full font-coco"
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
                  <h2 className="font-coco text-xl text-green-600">Спасибо!</h2>
                  <p className="text-muted-foreground mt-2 font-coco">Ваша заявка была отправлена на проверку <br/><br/> А пока можете пользоваться ограниченным функционалом</p>
                  <div className="h-4" />
                  <Button 
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="font-coco"
                  >
                    Submit Another Response
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-muted-foreground text-xs font-coco">
          <p>Эта страница была разработана специально для <br/>"КубГТУ: Цифровой Институт"</p>
        </div>
      </div>
    </TelegramWebAppProvider>
  );
};

export default TelegramWebApp;