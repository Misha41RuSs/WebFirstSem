// Калькулятор для производных и интегралов
const { useState, useEffect } = React;

// Компонент калькулятора
function Calculator() {
    const [mode, setMode] = useState('derivative'); // 'derivative' или 'integral'
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [steps, setSteps] = useState([]);

    // Простые правила дифференцирования
    const derivatives = {
        'x': '1',
        'x^2': '2x',
        'x^3': '3x^2',
        'x^n': 'nx^{n-1}',
        'sin(x)': 'cos(x)',
        'cos(x)': '-sin(x)',
        'e^x': 'e^x',
        'ln(x)': '\\frac{1}{x}',
        'tan(x)': '\\frac{1}{cos^2(x)}',
        'sqrt(x)': '\\frac{1}{2\\sqrt{x}}'
    };

    // Простые правила интегрирования
    const integrals = {
        '1': 'x + C',
        'x': '\\frac{x^2}{2} + C',
        'x^2': '\\frac{x^3}{3} + C',
        'x^3': '\\frac{x^4}{4} + C',
        'sin(x)': '-cos(x) + C',
        'cos(x)': 'sin(x) + C',
        'e^x': 'e^x + C',
        '1/x': 'ln|x| + C'
    };

    const calculate = () => {
        const normalizedInput = input.trim();
        
        if (mode === 'derivative') {
            if (derivatives[normalizedInput]) {
                setResult(derivatives[normalizedInput]);
                setSteps([
                    'Используем табличную формулу производной',
                    `Производная от ${normalizedInput} равна ${derivatives[normalizedInput]}`
                ]);
            } else {
                setResult('Функция не найдена в базе');
                setSteps(['Попробуйте: x, x^2, x^3, sin(x), cos(x), e^x, ln(x)']);
            }
        } else {
            if (integrals[normalizedInput]) {
                setResult(integrals[normalizedInput]);
                setSteps([
                    'Используем табличную формулу интеграла',
                    `Интеграл от ${normalizedInput} равен ${integrals[normalizedInput]}`
                ]);
            } else {
                setResult('Функция не найдена в базе');
                setSteps(['Попробуйте: 1, x, x^2, x^3, sin(x), cos(x), e^x, 1/x']);
            }
        }
    };

    const examples = mode === 'derivative' 
        ? ['x', 'x^2', 'sin(x)', 'cos(x)', 'e^x']
        : ['1', 'x', 'x^2', 'sin(x)', 'cos(x)', 'e^x'];

    return (
        <div className="calculator-container">
            <h2>🧮 Интерактивный калькулятор</h2>
            
            <div className="calc-mode-switch">
                <button 
                    className={`calc-mode-btn ${mode === 'derivative' ? 'active' : ''}`}
                    onClick={() => setMode('derivative')}
                >
                    📈 Производные
                </button>
                <button 
                    className={`calc-mode-btn ${mode === 'integral' ? 'active' : ''}`}
                    onClick={() => setMode('integral')}
                >
                    ∫ Интегралы
                </button>
            </div>

            <div className="calc-input-section">
                <label>
                    {mode === 'derivative' ? 'Функция для дифференцирования:' : 'Функция для интегрирования:'}
                </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введите функцию..."
                    className="calc-input"
                    onKeyPress={(e) => e.key === 'Enter' && calculate()}
                />
            </div>

            <div className="calc-examples">
                <span>Примеры: </span>
                {examples.map((ex, idx) => (
                    <button
                        key={idx}
                        className="example-btn"
                        onClick={() => setInput(ex)}
                    >
                        {ex}
                    </button>
                ))}
            </div>

            <button className="calc-button" onClick={calculate}>
                Вычислить
            </button>

            {result && (
                <div className="calc-result">
                    <h3>Результат:</h3>
                    <div className="result-formula">
                        <MathFormula latex={result} />
                    </div>
                    
                    {steps.length > 0 && (
                        <div className="calc-steps">
                            <h4>Шаги решения:</h4>
                            <ol>
                                {steps.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Компонент визуализации графиков
function GraphVisualizer() {
    const [func, setFunc] = useState('sin');
    const canvasRef = React.useRef(null);

    const functions = {
        'sin': { name: 'sin(x)', func: Math.sin },
        'cos': { name: 'cos(x)', func: Math.cos },
        'tan': { name: 'tan(x)', func: Math.tan },
        'x': { name: 'x', func: (x) => x },
        'x2': { name: 'x²', func: (x) => x * x },
        'x3': { name: 'x³', func: (x) => x * x * x },
        'exp': { name: 'eˣ', func: Math.exp },
        'sqrt': { name: '√x', func: Math.sqrt }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Очистка
        ctx.clearRect(0, 0, width, height);
        
        // Фон
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);

        // Сетка
        ctx.strokeStyle = '#dee2e6';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = 0; i < height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        // Оси
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        // График функции
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const scale = 40;
        const centerX = width / 2;
        const centerY = height / 2;

        for (let px = 0; px < width; px++) {
            const x = (px - centerX) / scale;
            let y;
            
            try {
                y = functions[func].func(x);
                if (!isFinite(y)) continue;
            } catch {
                continue;
            }

            const py = centerY - y * scale;
            
            if (px === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }

        ctx.stroke();

    }, [func]);

    return (
        <div className="graph-container">
            <h2>📊 Визуализация графиков</h2>
            
            <div className="graph-selector">
                {Object.entries(functions).map(([key, { name }]) => (
                    <button
                        key={key}
                        className={`graph-btn ${func === key ? 'active' : ''}`}
                        onClick={() => setFunc(key)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="graph-canvas"
            />
            
            <div className="graph-info">
                <p>Текущая функция: <strong>f(x) = {functions[func].name}</strong></p>
                <p className="graph-hint">Масштаб: 1 клетка = 1 единица</p>
            </div>
        </div>
    );
}

// Компонент статистики
function Statistics() {
    const [stats, setStats] = useState({
        totalTests: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0
    });
    const [testHistory, setTestHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загружаем статистику с сервера
    useEffect(() => {
        loadStatistics();
        loadTestHistory();
    }, []);

    const loadStatistics = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Проверяем что сервис доступен
            if (!window.StatisticsService) {
                throw new Error('Сервис статистики не загружен');
            }
            
            const data = await window.StatisticsService.getUserStatistics();
            setStats(data);
        } catch (err) {
            console.error('Failed to load statistics:', err);
            
            let errorMessage = 'Не удалось загрузить статистику';
            if (err.message.includes('Failed to fetch')) {
                errorMessage = 'Бэкенд не доступен. Убедитесь, что Spring Boot запущен на порту 8080.';
            } else if (err.message.includes('401') || err.message.includes('403')) {
                errorMessage = 'Ошибка авторизации. Попробуйте выйти и войти снова.';
            } else if (err.message.includes('404')) {
                errorMessage = 'API endpoint не найден. Проверьте настройки бэкенда.';
            } else if (err.message.includes('500')) {
                errorMessage = 'Ошибка сервера. Проверьте логи Spring Boot.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const loadTestHistory = async () => {
        try {
            if (!window.StatisticsService) return;
            
            const history = await window.StatisticsService.getTestHistory();
            setTestHistory(history || []);
        } catch (err) {
            console.error('Failed to load test history:', err);
            setTestHistory([]);
        }
    };

    const accuracy = stats.accuracy || 0;

    const achievements = [
        { id: 1, name: 'Первый тест', desc: 'Пройти первый тест', condition: stats.totalTests >= 1, icon: '🎯' },
        { id: 2, name: 'Отличник', desc: '80%+ правильных ответов', condition: accuracy >= 80, icon: '🏆' },
        { id: 3, name: 'Настойчивость', desc: 'Пройти 5 тестов', condition: stats.totalTests >= 5, icon: '💪' },
        { id: 4, name: 'Эксперт', desc: 'Пройти 10 тестов', condition: stats.totalTests >= 10, icon: '🎓' },
        { id: 5, name: 'Перфекционист', desc: '100% в любом тесте', condition: testHistory.some(t => t.percentage === 100), icon: '⭐' }
    ];

    if (loading) {
        return (
            <div className="stats-container">
                <h2>📊 Статистика и достижения</h2>
                <div className="loading-spinner" style={{ textAlign: 'center', padding: '2em' }}>
                    ⏳ Загрузка статистики...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stats-container">
                <h2>📊 Статистика и достижения</h2>
                <div className="error-message" style={{ textAlign: 'center', padding: '2em', color: '#ef4444' }}>
                    {error}
                </div>
                <button onClick={loadStatistics} className="btn-retry">
                    Попробовать снова
                </button>
            </div>
        );
    }

    return (
        <div className="stats-container">
            <h2>📊 Статистика и достижения</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value">{stats.totalTests}</div>
                    <div className="stat-label">Пройдено тестов</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">❓</div>
                    <div className="stat-value">{stats.totalQuestions}</div>
                    <div className="stat-label">Всего вопросов</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">{stats.correctAnswers}</div>
                    <div className="stat-label">Правильных ответов</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-value">{accuracy.toFixed(1)}%</div>
                    <div className="stat-label">Точность</div>
                </div>
            </div>

            <div className="achievements-section">
                <h3>🏆 Достижения</h3>
                <div className="achievements-grid">
                    {achievements.map(ach => (
                        <div 
                            key={ach.id} 
                            className={`achievement ${ach.condition ? 'unlocked' : 'locked'}`}
                        >
                            <div className="ach-icon">{ach.icon}</div>
                            <div className="ach-name">{ach.name}</div>
                            <div className="ach-desc">{ach.desc}</div>
                            {ach.condition && <div className="ach-badge">✓</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="best-scores">
                <h3>📜 История тестов</h3>
                {testHistory.length > 0 ? (
                    <div className="scores-list">
                        {testHistory.slice(0, 10).map((result, index) => (
                            <div key={result.id || index} className="score-item">
                                <span className="score-test">{result.testName}</span>
                                <span className="score-value">{result.percentage}%</span>
                                <span className="score-date">
                                    {new Date(result.completedAt).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-scores">Пройдите тесты, чтобы увидеть результаты!</p>
                )}
            </div>

            <button onClick={() => { loadStatistics(); loadTestHistory(); }} className="btn-refresh-stats">
                🔄 Обновить статистику
            </button>
        </div>
    );
}

