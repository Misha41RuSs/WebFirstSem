# 🚀 Быстрый старт

## Шаг 1: Запустите PostgreSQL в Docker

```bash
cd MathFormulasBackend
docker-compose up -d
```

Это создаст:
- PostgreSQL контейнер на порту **5432**
- База данных: **mathformulas_db**
- Пользователь: **postgres**
- Пароль: **postgres**

Проверьте, что контейнер запущен:
```bash
docker ps
```

## Шаг 2: Откройте проект в IntelliJ IDEA

1. Запустите IntelliJ IDEA
2. `File -> Open`
3. Выберите папку `MathFormulasBackend`
4. Дождитесь индексации и загрузки Maven зависимостей

## Шаг 3: Проверьте application.properties

Файл: `src/main/resources/application.properties`

Убедитесь, что настройки БД совпадают:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mathformulas_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## Шаг 4: Создайте таблицы в БД

### Вариант А: Автоматически (через Hibernate)

Hibernate создаст таблицы автоматически при первом запуске благодаря:
```properties
spring.jpa.hibernate.ddl-auto=update
```

### Вариант Б: Вручную (рекомендуется)

Подключитесь к PostgreSQL:
```bash
docker exec -it mathformulas-postgres psql -U postgres -d mathformulas_db
```

Скопируйте и выполните SQL из файла `src/main/resources/schema.sql`

Или через DBeaver/pgAdmin:
- Host: localhost
- Port: 5432
- Database: mathformulas_db
- Username: postgres
- Password: postgres

## Шаг 5: Запустите приложение

В IntelliJ IDEA:
1. Найдите `MathFormulasApplication.java`
2. Нажмите правую кнопку мыши
3. `Run 'MathFormulasApplication'`

Или через терминал:
```bash
mvn spring-boot:run
```

## Шаг 6: Проверьте работу API

Откройте терминал и выполните:

```bash
# Регистрация пользователя
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456"
  }'
```

Ожидаемый ответ:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

## Шаг 7: Запустите фронтенд

1. Перейдите в папку `MathFormulas`
2. Откройте `index.html` в браузере
3. Попробуйте зарегистрироваться/войти

## 📊 Структура таблиц

### users
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Primary Key |
| username | VARCHAR(50) | Уникальное имя пользователя |
| email | VARCHAR(100) | Уникальный email |
| password | VARCHAR(255) | BCrypt hash пароля |
| created_at | TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP | Дата обновления |

**Индексы:**
- `idx_users_username` на `username`
- `idx_users_email` на `email`

**Ограничения:**
- `username` - UNIQUE, NOT NULL
- `email` - UNIQUE, NOT NULL
- `password` - NOT NULL

### user_statistics (опционально)
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Primary Key |
| user_id | BIGINT | Foreign Key -> users.id |
| total_tests | INTEGER | Количество пройденных тестов |
| total_questions | INTEGER | Всего вопросов |
| correct_answers | INTEGER | Правильных ответов |
| created_at | TIMESTAMP | Дата создания |
| updated_at | TIMESTAMP | Дата обновления |

### test_results (опционально)
| Поле | Тип | Описание |
|------|-----|----------|
| id | BIGSERIAL | Primary Key |
| user_id | BIGINT | Foreign Key -> users.id |
| test_name | VARCHAR(100) | Название теста |
| score | INTEGER | Набранные баллы |
| total_questions | INTEGER | Всего вопросов |
| percentage | INTEGER | Процент правильных ответов |
| completed_at | TIMESTAMP | Дата прохождения |

**Индексы:**
- `idx_test_results_user_id` на `user_id`
- `idx_test_results_test_name` на `test_name`

## 🔧 Полезные команды Docker

```bash
# Запустить PostgreSQL
docker-compose up -d

# Остановить PostgreSQL
docker-compose down

# Посмотреть логи
docker-compose logs -f

# Войти в контейнер PostgreSQL
docker exec -it mathformulas-postgres psql -U postgres -d mathformulas_db

# Удалить все данные и начать заново
docker-compose down -v
docker-compose up -d
```

## 🐛 Troubleshooting

### Порт 5432 занят
```bash
# Найдите процесс
lsof -i :5432

# Остановите существующий PostgreSQL
brew services stop postgresql
# или
sudo systemctl stop postgresql
```

### Проблемы с Maven
```bash
# Очистите кеш
mvn clean install -U
```

### IntelliJ не видит классы
```bash
# Reimport Maven project
File -> Invalidate Caches -> Invalidate and Restart
```

---

**Готово!** 🎉 

Теперь у вас работает:
- ✅ PostgreSQL в Docker (порт 5432)
- ✅ Spring Boot API (порт 8080)
- ✅ Фронтенд с авторизацией

Проверьте в браузере: откройте `index.html` и попробуйте зарегистрироваться!

