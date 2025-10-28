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
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('quizStats');
        return saved ? JSON.parse(saved) : {
            totalTests: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            bestScores: {},
            testHistory: []
        };
    });

    // Обновляем статистику каждую секунду для синхронизации
    useEffect(() => {
        const interval = setInterval(() => {
            const saved = localStorage.getItem('quizStats');
            if (saved) {
                const newStats = JSON.parse(saved);
                setStats(newStats);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const accuracy = stats.totalQuestions > 0 
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
        : 0;

    const achievements = [
        { id: 1, name: 'Первый тест', desc: 'Пройти первый тест', condition: stats.totalTests >= 1, icon: '🎯' },
        { id: 2, name: 'Отличник', desc: '80%+ правильных ответов', condition: accuracy >= 80, icon: '🏆' },
        { id: 3, name: 'Настойчивость', desc: 'Пройти 5 тестов', condition: stats.totalTests >= 5, icon: '💪' },
        { id: 4, name: 'Эксперт', desc: 'Пройти 10 тестов', condition: stats.totalTests >= 10, icon: '🎓' },
        { id: 5, name: 'Перфекционист', desc: '100% в любом тесте', condition: Object.values(stats.bestScores).some(s => s === 100), icon: '⭐' }
    ];

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
                    <div className="stat-value">{accuracy}%</div>
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
                <h3>🎯 Лучшие результаты</h3>
                {Object.keys(stats.bestScores).length > 0 ? (
                    <div className="scores-list">
                        {Object.entries(stats.bestScores).map(([test, score]) => (
                            <div key={test} className="score-item">
                                <span className="score-test">{test}</span>
                                <span className="score-value">{score}%</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-scores">Пройдите тесты, чтобы увидеть результаты!</p>
                )}
            </div>

            {stats.totalTests > 0 && (
                <button 
                    className="btn-reset-stats"
                    onClick={() => {
                        if (confirm('Вы уверены, что хотите сбросить всю статистику?')) {
                            localStorage.removeItem('quizStats');
                            setStats({
                                totalTests: 0,
                                totalQuestions: 0,
                                correctAnswers: 0,
                                bestScores: {},
                                testHistory: []
                            });
                        }
                    }}
                >
                    Сбросить статистику
                </button>
            )}
        </div>
    );
}

