// Компонент авторизации и регистрации
const { useState } = React;

function AuthComponent({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Очищаем ошибку при вводе
    };

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError('Пожалуйста, заполните все поля');
            return false;
        }

        if (formData.username.length < 3) {
            setError('Имя пользователя должно содержать минимум 3 символа');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Пароль должен содержать минимум 6 символов');
            return false;
        }

        if (!isLogin) {
            if (!formData.email) {
                setError('Пожалуйста, введите email');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setError('Введите корректный email');
                return false;
            }

            if (formData.password !== formData.confirmPassword) {
                setError('Пароли не совпадают');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            let response;
            
            if (isLogin) {
                response = await AuthService.login(formData.username, formData.password);
            } else {
                response = await AuthService.register(
                    formData.username,
                    formData.email,
                    formData.password
                );
            }

            // Успешная авторизация
            if (response && response.token) {
                onAuthSuccess(response.user);
            }
        } catch (err) {
            setError(err.message || 'Произошла ошибка. Попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>📐 MathFormulas</h1>
                        <p className="auth-subtitle">
                            {isLogin ? 'Добро пожаловать!' : 'Создайте аккаунт'}
                        </p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Вход
                        </button>
                        <button
                            className={`auth-tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Регистрация
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Введите имя пользователя"
                                disabled={loading}
                                autoComplete="username"
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    disabled={loading}
                                    autoComplete="email"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Введите пароль"
                                disabled={loading}
                                autoComplete={isLogin ? "current-password" : "new-password"}
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Повторите пароль"
                                    disabled={loading}
                                    autoComplete="new-password"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="auth-error">
                                <span>⚠️ {error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading-spinner">⏳ Загрузка...</span>
                            ) : (
                                isLogin ? 'Войти' : 'Зарегистрироваться'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                            {' '}
                            <button
                                type="button"
                                className="auth-toggle-btn"
                                onClick={toggleMode}
                                disabled={loading}
                            >
                                {isLogin ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                        </p>
                    </div>

                    <div className="auth-info">
                        <p>🔒 Безопасное соединение с сервером</p>
                        <p>📊 Ваши данные надежно защищены</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

