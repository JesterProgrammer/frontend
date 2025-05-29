export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Введение в Next.js",
      excerpt: "Узнайте о преимуществах использования Next.js для создания современных веб-приложений.",
      date: "2024-03-20",
    },
    {
      id: 2,
      title: "Работа с shadcn/ui",
      excerpt: "Как использовать компоненты shadcn/ui для создания красивых интерфейсов.",
      date: "2024-03-19",
    },
    {
      id: 3,
      title: "TypeScript в React",
      excerpt: "Почему TypeScript так важен при разработке React-приложений.",
      date: "2024-03-18",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Блог</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <time className="text-sm text-muted-foreground">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  )
} 