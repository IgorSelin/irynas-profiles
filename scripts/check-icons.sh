#!/bin/bash

# Скрипт для перевірки іконок локально
# Використання: ./scripts/check-icons.sh [port]
# За замовчуванням використовується порт 3000

PORT=${1:-3000}
BASE_URL="http://localhost:${PORT}"

echo "🔍 Перевірка іконок на ${BASE_URL}"
echo ""

# Кольори для виводу
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_icon() {
    local url=$1
    local name=$2
    
    echo -n "Перевірка ${name}... "
    
    if curl -s -o /dev/null -w "%{http_code}" "${url}" | grep -q "200"; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        return 1
    fi
}

# Перевірка іконок
check_icon "${BASE_URL}/favicon.ico" "favicon.ico (для Google)"
check_icon "${BASE_URL}/icon.svg" "icon.svg"
check_icon "${BASE_URL}/icon" "icon (PNG 512x512)"
check_icon "${BASE_URL}/apple-icon" "apple-icon (PNG 180x180)"

echo ""
echo "📋 Перевірка HTML метаданих..."

# Перевірка метаданих через curl та grep
HTML=$(curl -s "${BASE_URL}")

if echo "$HTML" | grep -q 'rel="icon"'; then
    echo -e "${GREEN}✓ Icon links присутні в HTML${NC}"
else
    echo -e "${RED}✗ Icon links відсутні в HTML${NC}"
fi

if echo "$HTML" | grep -q 'rel="apple-touch-icon"'; then
    echo -e "${GREEN}✓ Apple touch icon присутній в HTML${NC}"
else
    echo -e "${RED}✗ Apple touch icon відсутній в HTML${NC}"
fi

echo ""
echo -e "${YELLOW}💡 Порада: Відкрийте ${BASE_URL} у браузері та перевірте вкладку - там має бути іконка${NC}"
echo -e "${YELLOW}💡 Також перевірте DevTools (F12) -> Network -> перезавантажте сторінку -> знайдіть favicon.ico${NC}"
