# 🚀 Быстрый запуск

## ✅ Проверка статуса

### 1. Проверить Docker контейнер PostgreSQL
```bash
docker ps
```

Должен быть запущен контейнер `mathformulas-postgres` на порту `5432`.

Если не запущен:
```bash
cd "/Users/misha/Documents/Вуз/3 курс/Web/MathFormulasBackend"
docker-compose up -d
```

### 2. Запустить Spring Boot приложение

В IntelliJ IDEA:
1. Откройте проект `MathFormulasBackend`
2. Найдите файл `src/main/java/com/mathformulas/MathFormulasApplication.java`
3. Кликните правой кнопкой → **Run 'MathFormulasApplication'**
4. Дождитесь сообщения в консоли:
   ```
   Started MathFormulasApplication in X.XXX seconds
   ```

### 3. Проверить что API работает

Выполните в терминале:
```bash
# Проверка здоровья сервера
curl http://localhost:8080/api/auth/login

# Должен вернуться JSON с ошибкой (это нормально, т.к. нет данных для входа)
```

## 🌐 Запуск Frontend

### Откройте в браузере:
```bash
open "/Users/misha/Documents/Вуз/3 курс/Web/MathFormulas/index.html"
```

Или просто двойной клик на файл `index.html`.

## 🔑 API Endpoints

После запуска доступны по адресу: `http://localhost:8080/api/`

### Авторизация:
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/validate` - Проверка токена

### Статистика (требуется авторизация):
- `GET /api/user/statistics` - Получить статистику
- `GET /api/user/statistics/history` - История тестов
- `POST /api/user/statistics/submit` - Отправить результат

## 🐛 Решение проблем

### Ошибка: "Cannot connect to database"
```bash
# Перезапустите Docker контейнер
docker-compose down
docker-compose up -d
```

### Ошибка: "Port 8080 already in use"
```bash
# Найдите процесс на порту 8080
lsof -i :8080

# Убейте процесс (замените PID на реальный)
kill -9 <PID>
```

### Статистика не загружается
1. Убедитесь что Spring Boot запущен
2. Проверьте консоль браузера (F12) на наличие ошибок
3. Проверьте что пользователь авторизован (есть токен)

### "Не удалось загрузить статистику"
1. Откройте консоль браузера (F12)
2. Проверьте вкладку **Network**
3. Попробуйте выйти и войти заново

## 📊 База данных

### Подключение к PostgreSQL:
```bash
# Войти в контейнер
docker exec -it mathformulas-postgres psql -U postgres -d mathformulas_db

# Просмотр таблиц
\dt

# Просмотр пользователей
SELECT * FROM users;

# Просмотр статистики
SELECT * FROM user_statistics;

# Выход
\q
```

## ✨ Готово!

Приложение должно работать:
- ✅ PostgreSQL на `localhost:5432`
- ✅ Spring Boot API на `localhost:8080`
- ✅ Frontend в браузере (файл `index.html`)

