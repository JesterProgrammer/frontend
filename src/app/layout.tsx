import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@/app/telegram-webapp.css'
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Мой сайт",
  description: "Создан с использованием Next.js и shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Navbar />
        <main className="container py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
