'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">Екскурсовод Львів</h3>
            <p className="text-gray-400">
              Професійні екскурсії по найкрасивішому місту України. Досвідчений гід з багаторічним стажем.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Швидкі посилання</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  Про мене
                </a>
              </li>
              <li>
                <a href="#tours" className="transition-colors hover:text-white">
                  Екскурсії
                </a>
              </li>
              <li>
                <a href="#additional-services" className="transition-colors hover:text-white">
                  Додаткові послуги
                </a>
              </li>
              <li>
                <a href="#reviews" className="transition-colors hover:text-white">
                  Відгуки
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Контакти
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Контакти</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Львів, Україна</li>
              <li>
                <a href="tel:+380975383348" className="transition-colors hover:text-white">
                  +380 97 538 33 48
                </a>
              </li>
              <li>
                <a href="mailto:example@email.com" className="transition-colors hover:text-white">
                  example@email.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Екскурсовод Львів. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
