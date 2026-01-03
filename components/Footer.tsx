"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Екскурсовод Львів</h3>
            <p className="text-gray-400">
              Професійні екскурсії по найкрасивішому місту України. Досвідчений
              гід з багаторічним стажем.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Про мене
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">
                  Екскурсії
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors"
                >
                  Відгуки
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Контакти
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакти</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Львів, Україна</li>
              <li>
                <a
                  href="tel:+380975383348"
                  className="hover:text-white transition-colors"
                >
                  +380 97 538 33 48
                </a>
              </li>
              <li>
                <a
                  href="mailto:example@email.com"
                  className="hover:text-white transition-colors"
                >
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

