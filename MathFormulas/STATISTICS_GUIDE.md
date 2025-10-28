# 📊 Руководство по системе статистики

## 🎯 Обзор

Система статистики теперь **хранится на сервере** для каждого пользователя индивидуально. Все результаты тестов, прогресс и достижения сохраняются в базе данных PostgreSQL.

## 🔄 Что изменилось?

### ❌ Было (LocalStorage):
- Статистика хранилась локально в браузере
- Данные терялись при очистке кэша
- Нельзя было получить доступ с другого устройства

### ✅ Стало (Server-side):
- Статистика хранится на сервере для каждого пользователя
- Данные доступны с любого устройства после авторизации
- История всех пройденных тестов
- Синхронизация в реальном времени

## 📡 API Endpoints

### 1. Получить статистику пользователя
```
GET /api/user/statistics
Authorization: Bearer <token>
```

**Ответ:**
```json
{
  "totalTests": 5,
  "totalQuestions": 50,
  "correctAnswers": 42,
  "accuracy": 84.0
}
```

### 2. Получить историю тестов
```
GET /api/user/statistics/history
Authorization: Bearer <token>
```

**Ответ:**
```json
[
  {
    "id": 1,
    "testName": "Общие вопросы",
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "completedAt": "2025-10-28T10:30:00"
  },
  ...
]
```

### 3. Отправить результат теста
```
POST /api/user/statistics/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "testName": "Производные",
  "score": 9,
  "totalQuestions": 10,
  "correctAnswers": 9
}
```

## 🗄️ Структура базы данных

### Таблица `users`
```sql
id          BIGSERIAL PRIMARY KEY
username    VARCHAR(50) UNIQUE NOT NULL
email       VARCHAR(100) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### Таблица `user_statistics`
```sql
id                 BIGSERIAL PRIMARY KEY
user_id            BIGINT FOREIGN KEY
total_tests        INTEGER DEFAULT 0
total_questions    INTEGER DEFAULT 0
correct_answers    INTEGER DEFAULT 0
created_at         TIMESTAMP
updated_at         TIMESTAMP
```

### Таблица `test_results`
```sql
id               BIGSERIAL PRIMARY KEY
user_id          BIGINT FOREIGN KEY
test_name        VARCHAR(100) NOT NULL
score            INTEGER NOT NULL
total_questions  INTEGER NOT NULL
percentage       INTEGER NOT NULL
completed_at     TIMESTAMP
```

## 🚀 Как это работает?

### 1. Прохождение теста
```javascript
// Пользователь завершает тест
handleQuizComplete(score, totalQuestions, correctAnswers)
  ↓
// Отправка результата на сервер
StatisticsService.submitTestResult(testName, score, totalQuestions, correctAnswers)
  ↓
// Сервер сохраняет результат в test_results
// Сервер обновляет user_statistics
```

### 2. Просмотр статистики
```javascript
// Загрузка статистики при открытии вкладки "Интерактив"
StatisticsService.getUserStatistics()
  ↓
// Отображение общей статистики (тесты, вопросы, точность)

StatisticsService.getTestHistory()
  ↓
// Отображение истории последних 10 тестов
```

## 🎮 Функциональность

### Общая статистика
- 🎯 **Пройдено тестов** - количество завершенных тестов
- ❓ **Всего вопросов** - общее количество отвеченных вопросов
- ✅ **Правильных ответов** - количество правильных ответов
- 📈 **Точность** - процент правильных ответов

### Достижения
- 🎯 **Первый тест** - Пройти первый тест
- 🏆 **Отличник** - 80%+ правильных ответов
- 💪 **Настойчивость** - Пройти 5 тестов
- 🎓 **Эксперт** - Пройти 10 тестов
- ⭐ **Перфекционист** - 100% в любом тесте

### История тестов
- Показывает последние 10 результатов
- Название теста, процент выполнения, дата прохождения
- Сортировка по дате (новые сверху)

## 🔧 Технические детали

### Frontend (React)
- **Компонент:** `Statistics` в `src/components/Interactive.jsx`
- **Сервис:** `src/services/statistics.js`
- **Стили:** `styles/interactive.css`

### Backend (Spring Boot)
- **Controller:** `StatisticsController.java`
- **Service:** `StatisticsService.java`
- **Entities:** `UserStatistics.java`, `TestResult.java`
- **Repositories:** `UserStatisticsRepository.java`, `TestResultRepository.java`

## 📝 Пример использования

```javascript
// Во фронтенд коде (Interactive.jsx)

// Загрузка статистики
const loadStatistics = async () => {
    try {
        const data = await window.StatisticsService.getUserStatistics();
        setStats(data);
    } catch (err) {
        console.error('Failed to load statistics:', err);
    }
};

// Отправка результата теста
const handleQuizComplete = async (score, totalQuestions, correctAnswers) => {
    try {
        await window.StatisticsService.submitTestResult(
            testName,
            score,
            totalQuestions,
            correctAnswers
        );
    } catch (error) {
        console.error('Failed to submit test result:', error);
    }
};
```

## 🛡️ Безопасность

- Все запросы требуют JWT токен
- Пользователь может видеть только свою статистику
- Валидация данных на стороне сервера
- CORS настроен для безопасного взаимодействия frontend/backend

## ✅ Преимущества

1. **Персонализация** - каждый пользователь видит только свою статистику
2. **Надежность** - данные не теряются при очистке браузера
3. **Доступность** - статистика доступна с любого устройства
4. **Масштабируемость** - легко добавить новые метрики
5. **Аналитика** - возможность анализировать прогресс пользователей

## 🎉 Готово!

Теперь статистика хранится на сервере и доступна для каждого авторизованного пользователя!

