# API Спецификация для Spring Boot Backend

Этот документ описывает API endpoints, которые должны быть реализованы в Spring Boot приложении для работы с фронтендом.

## 🔧 Базовая конфигурация

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **Authorization**: Bearer Token (где требуется)

## 📡 Endpoints

### 1. Регистрация пользователя

**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "string (минимум 3 символа)",
  "email": "string (валидный email)",
  "password": "string (минимум 6 символов)"
}
```

**Response (200 OK):**
```json
{
  "token": "string (JWT token)",
  "user": {
    "id": "long",
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Невалидные данные
- `409 Conflict` - Пользователь уже существует

---

### 2. Вход пользователя

**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "token": "string (JWT token)",
  "user": {
    "id": "long",
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Неверные учетные данные
- `400 Bad Request` - Невалидные данные

---

### 3. Валидация токена

**GET** `/auth/validate`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "valid": true
}
```

**Error Responses:**
- `401 Unauthorized` - Невалидный или истекший токен

---

### 4. Обновление профиля (опционально)

**PUT** `/user/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "email": "string (опционально)"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "long",
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Невалидный токен
- `400 Bad Request` - Невалидные данные

---

## 🔐 CORS конфигурация

Убедитесь, что Spring Boot настроен для приема запросов с фронтенда:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:*", "file://")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

## 📦 Модели данных

### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password; // Хранить в зашифрованном виде (BCrypt)
    
    // Getters and Setters
}
```

### DTO (Data Transfer Objects)

```java
// RegisterRequest
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}

// LoginRequest
public class LoginRequest {
    private String username;
    private String password;
}

// AuthResponse
public class AuthResponse {
    private String token;
    private UserDTO user;
}

// UserDTO
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    // НЕ включайте пароль!
}
```

## 🔒 Безопасность

### JWT Token
- Используйте библиотеку `io.jsonwebtoken:jjwt` для работы с JWT
- Срок действия токена: 24 часа (рекомендуется)
- Секретный ключ должен храниться в `application.properties`

### Пароли
- Используйте `BCryptPasswordEncoder` для хеширования паролей
- Никогда не отправляйте пароли в ответах API

## 📝 Примеры использования (curl)

### Регистрация
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Вход
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Валидация токена
```bash
curl -X GET http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🚀 Зависимости Maven

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- H2 Database (для разработки) -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

## ⚙️ application.properties

```properties
# Server
server.port=8080

# Database (H2 для разработки)
spring.datasource.url=jdbc:h2:mem:mathdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (опционально, для отладки)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JWT
jwt.secret=your-secret-key-change-this-in-production
jwt.expiration=86400000
```

---

**Готово!** Следуйте этой спецификации для реализации бэкенда.

