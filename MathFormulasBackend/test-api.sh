#!/bin/bash

echo "🚀 Тестирование MathFormulas API"
echo "================================"
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:8080/api"

echo "1️⃣ Проверка доступности сервера..."
if curl -s -o /dev/null -w "%{http_code}" "$API_URL/auth/login" | grep -q "401\|400"; then
    echo -e "${GREEN}✅ Сервер доступен${NC}"
else
    echo -e "${RED}❌ Сервер недоступен! Запустите Spring Boot${NC}"
    exit 1
fi
echo ""

echo "2️⃣ Регистрация нового пользователя..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser$(date +%s)\",\"email\":\"test$(date +%s)@test.com\",\"password\":\"password123\"}")

if echo "$REGISTER_RESPONSE" | grep -q "token"; then
    echo -e "${GREEN}✅ Регистрация успешна${NC}"
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "   Токен: ${TOKEN:0:20}..."
else
    echo -e "${RED}❌ Ошибка регистрации${NC}"
    echo "   Ответ: $REGISTER_RESPONSE"
    
    echo ""
    echo "3️⃣ Попробуем вход с существующим пользователем..."
    LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
      -H "Content-Type: application/json" \
      -d '{"username":"testuser","password":"password123"}')
    
    if echo "$LOGIN_RESPONSE" | grep -q "token"; then
        echo -e "${GREEN}✅ Вход успешен${NC}"
        TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
        echo "   Токен: ${TOKEN:0:20}..."
    else
        echo -e "${RED}❌ Ошибка входа${NC}"
        echo "   Ответ: $LOGIN_RESPONSE"
        exit 1
    fi
fi
echo ""

echo "4️⃣ Проверка токена..."
VALIDATE_RESPONSE=$(curl -s "$API_URL/auth/validate" \
  -H "Authorization: Bearer $TOKEN")

if echo "$VALIDATE_RESPONSE" | grep -q "valid"; then
    echo -e "${GREEN}✅ Токен валиден${NC}"
else
    echo -e "${RED}❌ Токен невалиден${NC}"
    echo "   Ответ: $VALIDATE_RESPONSE"
fi
echo ""

echo "5️⃣ Получение статистики..."
STATS_RESPONSE=$(curl -s "$API_URL/user/statistics" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json")

if echo "$STATS_RESPONSE" | grep -q "totalTests\|totalQuestions"; then
    echo -e "${GREEN}✅ Статистика получена${NC}"
    echo "   Ответ: $STATS_RESPONSE"
else
    echo -e "${RED}❌ Ошибка получения статистики${NC}"
    echo "   Ответ: $STATS_RESPONSE"
fi
echo ""

echo "6️⃣ Отправка результата теста..."
SUBMIT_RESPONSE=$(curl -s -X POST "$API_URL/user/statistics/submit" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"testName":"Тестовый тест","score":8,"totalQuestions":10,"correctAnswers":8}')

if echo "$SUBMIT_RESPONSE" | grep -q "id\|testName"; then
    echo -e "${GREEN}✅ Результат сохранён${NC}"
    echo "   Ответ: $SUBMIT_RESPONSE"
else
    echo -e "${RED}❌ Ошибка сохранения результата${NC}"
    echo "   Ответ: $SUBMIT_RESPONSE"
fi
echo ""

echo "================================"
echo -e "${GREEN}🎉 Тестирование завершено!${NC}"
echo ""
echo "📋 Для фронтенда используйте:"
echo "   Токен: $TOKEN"

