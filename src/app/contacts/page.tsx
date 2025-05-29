export default function Contacts() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      <div className="grid gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Наши контактные данные</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </p>
            <p className="text-lg">
              <span className="font-medium">Телефон:</span>{" "}
              <a href="tel:+71234567890" className="text-primary hover:underline">
                +7 (123) 456-78-90
              </a>
            </p>
            <p className="text-lg">
              <span className="font-medium">Адрес:</span> г. Москва, ул. Примерная, д. 1
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Время работы</h2>
          <div className="space-y-2">
            <p className="text-lg">Понедельник - Пятница: 9:00 - 18:00</p>
            <p className="text-lg">Суббота - Воскресенье: Выходной</p>
          </div>
        </div>
      </div>
    </div>
  )
} 