# Math Formulas Backend

Spring Boot REST API для приложения Math Formulas с JWT авторизацией.

## 🚀 Технологии

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** с JWT
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Lombok**

## 📁 Структура проекта

```
MathFormulasBackend/
├── src/
│   ├── main/
│   │   ├── java/com/mathformulas/
│   │   │   ├── config/           # Конфигурации (Security, CORS)
│   │   │   ├── controller/       # REST контроллеры
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── entity/           # JPA сущности
│   │   │   ├── repository/       # Spring Data репозитории
│   │   │   ├── security/         # JWT утилиты и фильтры
│   │   │   ├── service/          # Бизнес-логика
│   │   │   └── MathFormulasApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql        # SQL скрипт создания таблиц
│   └── test/
├── pom.xml
├── docker-compose.yml
└── README.md
```

## 🗄️ База данных

### Таблицы PostgreSQL

1. **users** - Пользователи приложения
   - `id` (BIGSERIAL PRIMARY KEY)
   - `username` (VARCHAR(50) UNIQUE NOT NULL)
   - `email` (VARCHAR(100) UNIQUE NOT NULL)
   - `password` (VARCHAR(255) NOT NULL) - BCrypt hash
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

2. **user_statistics** - Статистика пользователя (опционально)
   - `id` (BIGSERIAL PRIMARY KEY)
   - `user_id` (BIGINT FK -> users.id)
   - `total_tests` (INTEGER)
   - `total_questions` (INTEGER)
   - `correct_answers` (INTEGER)
   - `created_at`, `updated_at`

3. **test_results** - История тестов (опционально)
   - `id` (BIGSERIAL PRIMARY KEY)
   - `user_id` (BIGINT FK -> users.id)
   - `test_name` (VARCHAR(100))
   - `score`, `total_questions`, `percentage`
   - `completed_at` (TIMESTAMP)

## 🐳 Запуск PostgreSQL через Docker

```bash
docker-compose up -d
```

Или вручную:

```bash
docker run --name postgres-math \
  -e POSTGRES_DB=mathformulas_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

## ⚙️ Настройка

1. **Откройте проект в IntelliJ IDEA**
   ```
   File -> Open -> Выберите папку MathFormulasBackend
   ```

2. **Настройте `application.properties`**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/mathformulas_db
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```

3. **Создайте базу данных**
   ```sql
   -- Подключитесь к PostgreSQL и выполните:
   CREATE DATABASE mathformulas_db;
   
   -- Затем выполните schema.sql из resources/
   ```

4. **Запустите приложение**
   ```bash
   mvn spring-boot:run
   ```
   
   Или через IntelliJ IDEA: Run -> Run 'MathFormulasApplication'

## 📡 API Endpoints

### Авторизация

**POST** `/api/auth/register`
```json
Request:
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

**POST** `/api/auth/login`
```json
Request:
{
  "username": "testuser",
  "password": "password123"
}

Response (200):
{
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

**GET** `/api/auth/validate`
```
Headers:
  Authorization: Bearer {token}

Response (200):
{
  "valid": true
}
```

## 🔐 Безопасность

- Пароли хешируются с помощью **BCrypt**
- JWT токены с временем жизни **24 часа**
- Stateless сессии (не используются cookies)
- CORS настроен для работы с фронтендом

## 🧪 Тестирование API

### С помощью curl

```bash
# Регистрация
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Вход
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Валидация токена
curl -X GET http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### С помощью Postman

1. Импортируйте collection (создайте requests как указано выше)
2. Используйте переменные для хранения токена
3. Добавьте токен в Headers для защищенных endpoints

## 📝 Логирование

Логи доступны в консоли при запуске приложения:
- SQL запросы (при `spring.jpa.show-sql=true`)
- Security события
- Ошибки валидации

## 🛠️ Разработка

### Добавление новых endpoints

1. Создайте DTO в `dto/`
2. Создайте метод в соответствующем `Service`
3. Добавьте endpoint в `Controller`
4. При необходимости обновите `SecurityConfig`

### Изменение схемы БД

1. Отредактируйте `schema.sql`
2. Обновите Entity классы
3. Перезапустите приложение (с `ddl-auto=update`)

## 📦 Сборка

```bash
# Сборка проекта
mvn clean install

# Запуск JAR файла
java -jar target/math-formulas-backend-1.0.0.jar
```

## ❗ Troubleshooting

**Проблема**: Ошибка подключения к БД
```
Решение: Проверьте, запущен ли Docker контейнер с PostgreSQL
docker ps
```

**Проблема**: JWT токен не валидируется
```
Решение: Проверьте, что jwt.secret одинаковый в application.properties
```

**Проблема**: CORS ошибки
```
Решение: Проверьте CorsConfig.java, убедитесь что allowedOriginPatterns = "*"
```

## 📄 Лицензия

Образовательный проект.

---

**Готово!** 🎉 Backend готов к работе с фронтендом.

