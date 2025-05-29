import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать на наш сайт</h1>
      <p className="text-xl text-muted-foreground">
        Мы рады видеть вас здесь!
      </p>
    </div>
  );
}
