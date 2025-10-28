# 🔧 Решение проблем

## ⚠️ "Unexpected end of JSON input"

Эта ошибка означает, что сервер вернул пустой ответ или ответ не в формате JSON.

### 🔍 Диагностика:

#### 1. Проверьте что бэкенд запущен

```bash
# Проверка доступности API
curl http://localhost:8080/api/auth/login

# Должен вернуть JSON (даже с ошибкой - это нормально)
# Если "Connection refused" - бэкенд не запущен!
```

#### 2. Откройте консоль браузера (F12)

1. Перейдите на вкладку **Network**
2. Обновите страницу
3. Найдите запрос к API (например, `/api/user/statistics`)
4. Проверьте:
   - **Status Code**: должен быть 200, 401, 403 и т.д. (не просто "failed")
   - **Response**: что вернул сервер

#### 3. Проверьте логи Spring Boot

В IntelliJ IDEA в консоли должны быть сообщения типа:
```
Started MathFormulasApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

### ✅ Решения:

#### Решение 1: Запустите бэкенд

```bash
# В IntelliJ IDEA:
# Найдите MathFormulasApplication.java
# Кликните правой кнопкой → Run
```

#### Решение 2: Перезапустите PostgreSQL

```bash
cd "/Users/misha/Documents/Вуз/3 курс/Web/MathFormulasBackend"
docker-compose down
docker-compose up -d
docker ps  # Проверить что контейнер запущен
```

#### Решение 3: Проверьте CORS

Если в консоли браузера ошибка CORS:
```
Access-Control-Allow-Origin
```

Убедитесь, что в `CorsConfig.java` настроены правильные origins.

#### Решение 4: Очистите кэш браузера

```javascript
// В консоли браузера (F12 → Console)
localStorage.clear();
location.reload();
```

---

## ⚠️ "Не удалось загрузить статистику"

### Возможные причины:

#### 1. Бэкенд не запущен
**Проверка:**
```bash
curl http://localhost:8080/api/user/statistics
```

**Решение:** Запустите Spring Boot приложение.

#### 2. Пользователь не авторизован
**Проверка:** Откройте консоль браузера (F12):
```javascript
localStorage.getItem('token')
// Должен вернуть JWT токен, а не null
```

**Решение:** Выйдите и войдите снова.

#### 3. Неправильный endpoint
**Проверка:** В консоли браузера (Network) проверьте URL запроса:
- ✅ Правильно: `http://localhost:8080/api/user/statistics`
- ❌ Неправильно: `http://localhost:8080/api/api/user/statistics`

**Решение:** Проверьте `application.properties` - там НЕ должно быть:
```properties
# server.servlet.context-path=/api  # Должно быть закомментировано!
```

#### 4. Ошибка в базе данных
**Проверка логов Spring Boot:**
```
HikernateException
PSQLException
```

**Решение:** Проверьте что PostgreSQL запущен и доступен:
```bash
docker ps | grep postgres
```

---

## ⚠️ "401 Unauthorized"

### Причина: Токен недействителен или отсутствует

### Решение:

1. **Выйдите из системы**
   - Нажмите "Выйти" в правом верхнем углу

2. **Очистите localStorage**
   ```javascript
   localStorage.clear();
   ```

3. **Войдите снова**
   - Используйте свои учетные данные

4. **Проверьте токен**
   ```javascript
   console.log(localStorage.getItem('token'));
   // Должен показать длинную строку (JWT)
   ```

---

## ⚠️ CORS errors

### Ошибка в консоли:
```
Access to fetch at 'http://localhost:8080/api/...' 
from origin 'null' has been blocked by CORS policy
```

### Причина: 
Открытие `index.html` напрямую из файловой системы (`file://`)

### Решение:

#### Вариант 1: Используйте локальный сервер
```bash
# Установите http-server (один раз)
npm install -g http-server

# Запустите в папке MathFormulas
cd "/Users/misha/Documents/Вуз/3 курс/Web/MathFormulas"
http-server -p 3000 --cors

# Откройте браузер: http://localhost:3000
```

#### Вариант 2: Проверьте CORS конфигурацию
Убедитесь что в `CorsConfig.java`:
```java
configuration.setAllowedOriginPatterns(Arrays.asList("*"));
```

---

## ⚠️ "Failed to fetch"

### Причина: Сеть недоступна или бэкенд не отвечает

### Решение:

1. **Проверьте что бэкенд запущен:**
   ```bash
   curl http://localhost:8080/api/auth/login
   ```

2. **Проверьте порт 8080:**
   ```bash
   lsof -i :8080
   # Должен показать Java процесс
   ```

3. **Проверьте firewall/антивирус:**
   - Разрешите доступ к порту 8080

---

## 🔍 Детальная диагностика

### 1. Проверка всей цепочки

```bash
# 1. PostgreSQL
docker ps | grep postgres
# Должен быть: mathformulas-postgres

# 2. База данных
docker exec mathformulas-postgres psql -U postgres -d mathformulas_db -c "\dt"
# Должны быть таблицы: users, user_statistics, test_results

# 3. Backend API
curl http://localhost:8080/api/auth/login
# Должен вернуть JSON

# 4. Frontend
# Откройте браузер → F12 → Console
# Выполните:
window.StatisticsService.getUserStatistics()
```

### 2. Проверка логов

#### Spring Boot (IntelliJ IDEA):
```
DEBUG com.mathformulas
INFO  org.springframework
ERROR
```

#### Browser Console (F12):
```javascript
// Включите подробные логи
localStorage.setItem('debug', 'true');
```

#### Docker:
```bash
docker logs mathformulas-postgres
```

---

## 📞 Если ничего не помогло

1. **Полный перезапуск:**
   ```bash
   # 1. Остановите всё
   docker-compose down
   # Остановите Spring Boot в IntelliJ
   
   # 2. Очистите данные
   docker system prune -f
   localStorage.clear(); # В браузере
   
   # 3. Запустите заново
   docker-compose up -d
   # Запустите Spring Boot
   ```

2. **Проверьте версии:**
   ```bash
   java --version  # Должна быть 17+
   docker --version
   psql --version
   ```

3. **Создайте нового пользователя:**
   - Зарегистрируйтесь с новым username/email
   - Проверьте что он появился в БД:
     ```bash
     docker exec mathformulas-postgres \
       psql -U postgres -d mathformulas_db \
       -c "SELECT * FROM users;"
     ```

---

## ✅ Контрольный список

Перед тем как обращаться за помощью, проверьте:

- [ ] Docker контейнер PostgreSQL запущен (`docker ps`)
- [ ] Таблицы созданы в БД (`\dt` в psql)
- [ ] Spring Boot запущен (порт 8080 занят)
- [ ] API отвечает (`curl http://localhost:8080/api/auth/login`)
- [ ] Пользователь авторизован (токен в localStorage)
- [ ] Консоль браузера не показывает ошибок CORS
- [ ] Network вкладка показывает успешные запросы (200 OK)

