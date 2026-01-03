#!/bin/bash

# Скрипт для завантаження реальних фотографій з Unsplash
# Використовуйте власні фотографії або завантажте з Unsplash/Pexels

cd "$(dirname "$0")/../public/images"

echo "Завантаження фотографій з Unsplash..."

# Шевченківський гай - українська дерев'яна архітектура
curl -L "https://source.unsplash.com/1200x800/?ukrainian,wooden,architecture,village" -o additional-shevchenkivskyi-hai.jpg

# Замки Золотої Підкови - замки України
curl -L "https://source.unsplash.com/1200x800/?castle,ukraine,historic" -o additional-golden-horseshoe.jpg

# Жовква та Крехів - замок та монастир
curl -L "https://source.unsplash.com/1200x800/?castle,monastery,ukraine" -o additional-zhovkva-krekhiv.jpg

# Замки Тернопілля
curl -L "https://source.unsplash.com/1200x800/?castle,fortress,historic" -o additional-ternopil-castles.jpg

# Фортеця Тустань - скеля фортеця
curl -L "https://source.unsplash.com/1200x800/?rock,fortress,cliff,castle" -o additional-tustan.jpg

# Кам'янецький водоспад - водоспад Карпати
curl -L "https://source.unsplash.com/1200x800/?waterfall,mountain,forest" -o additional-waterfall.jpg

# Польща - Красічин
curl -L "https://source.unsplash.com/1200x800/?krasiczyn,castle,poland" -o additional-poland-krasiczyn.jpg

# Польща - Ланцют
curl -L "https://source.unsplash.com/1200x800/?lancut,castle,poland" -o additional-poland-lancut.jpg

# Польща - Краків
curl -L "https://source.unsplash.com/1200x800/?krakow,poland,old,town" -o additional-poland-krakow.jpg

# Польща - Сянок/Соліна
curl -L "https://source.unsplash.com/1200x800/?lake,reservoir,poland,nature" -o additional-poland-solina.jpg

echo "Завантаження завершено!"
echo "ВАЖЛИВО: Це випадкові зображення з Unsplash."
echo "Для кращого результату завантажте реальні фотографії з екскурсій або знайдіть конкретні зображення на Unsplash.com"

