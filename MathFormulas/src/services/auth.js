// API Service для взаимодействия с Spring Boot бэкендом
const API_BASE_URL = 'http://localhost:8080/api';

class AuthService {
    // Регистрация нового пользователя
    static async register(username, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const text = await response.text();
            
            if (!response.ok) {
                let errorMsg = 'Ошибка регистрации';
                try {
                    const error = text ? JSON.parse(text) : {};
                    errorMsg = error.message || errorMsg;
                } catch (e) {
                    errorMsg = text || errorMsg;
                }
                throw new Error(errorMsg);
            }

            const data = text ? JSON.parse(text) : {};
            
            // Сохраняем токен и данные пользователя
            if (data.token) {
                this.saveToken(data.token);
                this.saveUser(data.user);
            }
            
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Вход пользователя
    static async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const text = await response.text();
            
            if (!response.ok) {
                let errorMsg = 'Неверные учетные данные';
                try {
                    const error = text ? JSON.parse(text) : {};
                    errorMsg = error.message || errorMsg;
                } catch (e) {
                    errorMsg = text || errorMsg;
                }
                throw new Error(errorMsg);
            }

            const data = text ? JSON.parse(text) : {};
            
            // Сохраняем токен и данные пользователя
            if (data.token) {
                this.saveToken(data.token);
                this.saveUser(data.user);
            }
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Выход из системы
    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Проверка авторизации
    static isAuthenticated() {
        return !!this.getToken();
    }

    // Получение текущего пользователя
    static getCurrentUser() {
        let userStr = localStorage.getItem('currentUser');
        if (!userStr) userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Получение токена
    static getToken() {
        let token = localStorage.getItem('authToken');
        if (!token) token = localStorage.getItem('token');
        return token;
    }

    // Сохранение токена
    static saveToken(token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('token', token); // Для совместимости
    }

    // Сохранение данных пользователя
    static saveUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user)); // Для совместимости
    }

    // Проверка токена на сервере
    static async validateToken() {
        try {
            const token = this.getToken();
            if (!token) return false;

            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    // Получение заголовков с авторизацией
    static getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    // Обновление профиля пользователя
    static async updateProfile(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Ошибка обновления профиля');
            }

            const data = await response.json();
            this.saveUser(data.user);
            return data;
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }
}

// Экспортируем для использования в других файлах
window.AuthService = AuthService;

