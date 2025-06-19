import type { TelegramWebApp } from "@/app/telegram-webapp";

export function initTelegramWebApp(): TelegramWebApp | undefined {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    // Можно добавить кастомизацию, например:
    // tg.MainButton.setText("Готово");
    // tg.MainButton.show();
    return tg;
  }
  return undefined;
} 