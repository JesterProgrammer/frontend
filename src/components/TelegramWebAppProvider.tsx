"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import type { TelegramWebApp } from "@/app/telegram-webapp";
import { initTelegramWebApp } from "@/lib/telegram-init";

interface TelegramWebAppContextProps {
  webApp?: TelegramWebApp;
}

const TelegramWebAppContext = createContext<TelegramWebAppContextProps>({});

export const useTelegramWebApp = () => useContext(TelegramWebAppContext);

export const TelegramWebAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webApp, setWebApp] = useState<TelegramWebApp | undefined>(undefined);

  useEffect(() => {
    const tg = initTelegramWebApp();
    setWebApp(tg);
    // Можно добавить кастомизацию цветов, кнопок и т.д.
    if (tg?.themeParams) {
      Object.entries(tg.themeParams).forEach(([key, value]) => {
        if (value) {
          document.documentElement.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value);
        }
      });
    }
  }, []);

  return (
    <TelegramWebAppContext.Provider value={{ webApp }}>
      {children}
    </TelegramWebAppContext.Provider>
  );
}; 