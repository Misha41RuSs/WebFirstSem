// TypeScript версия React приложения
import React, { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';

// Типы
interface MathFormulaProps {
    latex: string;
    displayMode?: boolean;
}

interface FormulaCardProps {
    title: string;
    formula: string;
    solution?: string;
    category: string;
    onClick?: () => void;
}

interface QuizOption {
    text: string;
    latex: string;
    correct: boolean;
}

interface QuizQuestionData {
    id: number;
    question: string;
    formula: string;
    options: QuizOption[];
    category: string;
}

interface QuizQuestionProps {
    question: QuizQuestionData;
    onAnswer: (answerIndex: number, isCorrect: boolean) => void;
    showResult: boolean;
    selectedAnswer?: number;
}

interface QuizProps {
    questions: QuizQuestionData[];
    onComplete?: (score: number) => void;
}

interface Answer {
    answerIndex: number;
    isCorrect: boolean;
}

// Данные тестов
const quizData: QuizQuestionData[] = [
    {
        id: 1,
        question: "Чему равна производная функции x^n?",
        formula: "\\frac{d}{dx}(x^n) = ?",
        options: [
            { text: "x^{n-1}", latex: "x^{n-1}", correct: false },
            { text: "nx^{n-1}", latex: "nx^{n-1}", correct: true },
            { text: "nx^n", latex: "nx^n", correct: false },
            { text: "(n-1)x^{n-2}", latex: "(n-1)x^{n-2}", correct: false }
        ],
        category: "calculus"
    },
    {
        id: 2,
        question: "Формула Эйлера:",
        formula: "e^{i\\pi} + 1 = ?",
        options: [
            { text: "1", latex: "1", correct: false },
            { text: "i", latex: "i", correct: false },
            { text: "0", latex: "0", correct: true },
            { text: "-1", latex: "-1", correct: false }
        ],
        category: "calculus"
    },
    {
        id: 3,
        question: "Основное тригонометрическое тождество:",
        formula: "\\sin^2\\theta + \\cos^2\\theta = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "2", latex: "2", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\pi", latex: "\\pi", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 4,
        question: "Площадь круга радиусом r:",
        formula: "S = ?",
        options: [
            { text: "2\\pi r", latex: "2\\pi r", correct: false },
            { text: "\\pi r", latex: "\\pi r", correct: false },
            { text: "r^2", latex: "r^2", correct: false },
            { text: "\\pi r^2", latex: "\\pi r^2", correct: true }
        ],
        category: "geometry"
    },
    {
        id: 5,
        question: "Решение квадратного уравнения ax^2 + bx + c = 0:",
        formula: "x = ?",
        options: [
            { text: "\\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}", latex: "\\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}", correct: false },
            { text: "\\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}", latex: "\\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}", correct: false },
            { text: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", latex: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", correct: true },
            { text: "\\frac{-b}{2a}", latex: "\\frac{-b}{2a}", correct: false }
        ],
        category: "algebra"
    },
    {
        id: 6,
        question: "Определитель матрицы 2×2:",
        formula: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ?",
        options: [
            { text: "ac - bd", latex: "ac - bd", correct: false },
            { text: "ad + bc", latex: "ad + bc", correct: false },
            { text: "ab - cd", latex: "ab - cd", correct: false },
            { text: "ad - bc", latex: "ad - bc", correct: true }
        ],
        category: "linear"
    },
    {
        id: 7,
        question: "Интеграл от x^n:",
        formula: "\\int x^n dx = ?",
        options: [
            { text: "nx^{n-1} + C", latex: "nx^{n-1} + C", correct: false },
            { text: "\\frac{x^{n+1}}{n+1} + C", latex: "\\frac{x^{n+1}}{n+1} + C", correct: true },
            { text: "x^{n+1} + C", latex: "x^{n+1} + C", correct: false },
            { text: "\\frac{x^n}{n} + C", latex: "\\frac{x^n}{n} + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 8,
        question: "Интеграл от синуса:",
        formula: "\\int \\sin x dx = ?",
        options: [
            { text: "\\cos x + C", latex: "\\cos x + C", correct: false },
            { text: "-\\sin x + C", latex: "-\\sin x + C", correct: false },
            { text: "-\\cos x + C", latex: "-\\cos x + C", correct: true },
            { text: "\\sin x + C", latex: "\\sin x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 9,
        question: "Интеграл от косинуса:",
        formula: "\\int \\cos x dx = ?",
        options: [
            { text: "-\\sin x + C", latex: "-\\sin x + C", correct: false },
            { text: "\\cos x + C", latex: "\\cos x + C", correct: false },
            { text: "\\sin x + C", latex: "\\sin x + C", correct: true },
            { text: "-\\cos x + C", latex: "-\\cos x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 10,
        question: "Интеграл от 1/x:",
        formula: "\\int \\frac{1}{x} dx = ?",
        options: [
            { text: "\\ln x + C", latex: "\\ln x + C", correct: false },
            { text: "\\ln|x| + C", latex: "\\ln|x| + C", correct: true },
            { text: "\\frac{1}{x^2} + C", latex: "\\frac{1}{x^2} + C", correct: false },
            { text: "e^x + C", latex: "e^x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 11,
        question: "Интеграл от экспоненты:",
        formula: "\\int e^x dx = ?",
        options: [
            { text: "xe^x + C", latex: "xe^x + C", correct: false },
            { text: "\\frac{e^x}{x} + C", latex: "\\frac{e^x}{x} + C", correct: false },
            { text: "e^x + C", latex: "e^x + C", correct: true },
            { text: "\\ln x + C", latex: "\\ln x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 12,
        question: "Интеграл от константы:",
        formula: "\\int a dx = ?",
        options: [
            { text: "a", latex: "a", correct: false },
            { text: "0", latex: "0", correct: false },
            { text: "ax + C", latex: "ax + C", correct: true },
            { text: "\\frac{a}{x} + C", latex: "\\frac{a}{x} + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 13,
        question: "Интеграл от 1/(1+x^2):",
        formula: "\\int \\frac{1}{1+x^2} dx = ?",
        options: [
            { text: "\\ln(1+x^2) + C", latex: "\\ln(1+x^2) + C", correct: false },
            { text: "\\arctan x + C", latex: "\\arctan x + C", correct: true },
            { text: "\\arcsin x + C", latex: "\\arcsin x + C", correct: false },
            { text: "\\frac{x}{1+x^2} + C", latex: "\\frac{x}{1+x^2} + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 14,
        question: "Интеграл от 1/√(1-x^2):",
        formula: "\\int \\frac{1}{\\sqrt{1-x^2}} dx = ?",
        options: [
            { text: "\\arctan x + C", latex: "\\arctan x + C", correct: false },
            { text: "\\arccos x + C", latex: "\\arccos x + C", correct: false },
            { text: "\\arcsin x + C", latex: "\\arcsin x + C", correct: true },
            { text: "\\ln|x| + C", latex: "\\ln|x| + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 15,
        question: "Интеграл от xe^x (по частям):",
        formula: "\\int xe^x dx = ?",
        options: [
            { text: "\\frac{x^2e^x}{2} + C", latex: "\\frac{x^2e^x}{2} + C", correct: false },
            { text: "xe^x + C", latex: "xe^x + C", correct: false },
            { text: "xe^x - e^x + C", latex: "xe^x - e^x + C", correct: true },
            { text: "e^x(x-1) + C", latex: "e^x(x-1) + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 16,
        question: "Интеграл от sin²x:",
        formula: "\\int \\sin^2 x dx = ?",
        options: [
            { text: "\\frac{x}{2} - \\frac{\\sin 2x}{4} + C", latex: "\\frac{x}{2} - \\frac{\\sin 2x}{4} + C", correct: true },
            { text: "-\\frac{\\cos^2 x}{2} + C", latex: "-\\frac{\\cos^2 x}{2} + C", correct: false },
            { text: "\\frac{x}{2} + C", latex: "\\frac{x}{2} + C", correct: false },
            { text: "-\\cos x + C", latex: "-\\cos x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 17,
        question: "Интеграл от ln x:",
        formula: "\\int \\ln x dx = ?",
        options: [
            { text: "\\frac{1}{x} + C", latex: "\\frac{1}{x} + C", correct: false },
            { text: "x\\ln x + C", latex: "x\\ln x + C", correct: false },
            { text: "x\\ln x - x + C", latex: "x\\ln x - x + C", correct: true },
            { text: "\\frac{(\\ln x)^2}{2} + C", latex: "\\frac{(\\ln x)^2}{2} + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 18,
        question: "Интеграл от x/√(x²+1):",
        formula: "\\int \\frac{x}{\\sqrt{x^2+1}} dx = ?",
        options: [
            { text: "\\ln(x^2+1) + C", latex: "\\ln(x^2+1) + C", correct: false },
            { text: "\\sqrt{x^2+1} + C", latex: "\\sqrt{x^2+1} + C", correct: true },
            { text: "\\arctan x + C", latex: "\\arctan x + C", correct: false },
            { text: "\\frac{x^2}{2\\sqrt{x^2+1}} + C", latex: "\\frac{x^2}{2\\sqrt{x^2+1}} + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 19,
        question: "Интеграл от sin x · cos x:",
        formula: "\\int \\sin x \\cos x dx = ?",
        options: [
            { text: "\\sin^2 x + C", latex: "\\sin^2 x + C", correct: false },
            { text: "\\frac{\\sin 2x}{2} + C", latex: "\\frac{\\sin 2x}{2} + C", correct: false },
            { text: "\\frac{\\sin^2 x}{2} + C", latex: "\\frac{\\sin^2 x}{2} + C", correct: true },
            { text: "-\\cos^2 x + C", latex: "-\\cos^2 x + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 20,
        question: "Интеграл от 1/(x²+4):",
        formula: "\\int \\frac{1}{x^2+4} dx = ?",
        options: [
            { text: "\\arctan x + C", latex: "\\arctan x + C", correct: false },
            { text: "\\frac{1}{2}\\arctan\\frac{x}{2} + C", latex: "\\frac{1}{2}\\arctan\\frac{x}{2} + C", correct: true },
            { text: "\\arctan\\frac{x}{2} + C", latex: "\\arctan\\frac{x}{2} + C", correct: false },
            { text: "\\frac{1}{4}\\ln(x^2+4) + C", latex: "\\frac{1}{4}\\ln(x^2+4) + C", correct: false }
        ],
        category: "integrals"
    },
    {
        id: 21,
        question: "Интеграл от x²e^x:",
        formula: "\\int x^2e^x dx = ?",
        options: [
            { text: "x^2e^x + C", latex: "x^2e^x + C", correct: false },
            { text: "e^x(x^2 - 2x + 2) + C", latex: "e^x(x^2 - 2x + 2) + C", correct: true },
            { text: "x^2e^x - 2xe^x + C", latex: "x^2e^x - 2xe^x + C", correct: false },
            { text: "\\frac{x^3e^x}{3} + C", latex: "\\frac{x^3e^x}{3} + C", correct: false }
        ],
        category: "integrals"
    }
];

// Компонент формулы с KaTeX
const MathFormula: React.FC<MathFormulaProps> = ({ latex, displayMode = true }) => {
    const formulaRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (formulaRef.current && (window as any).katex) {
            (window as any).katex.render(latex, formulaRef.current, {
                displayMode: displayMode,
                throwOnError: false
            });
        }
    }, [latex, displayMode]);

    return <span ref={formulaRef} className="math-formula"></span>;
};

// Компонент карточки формулы
const FormulaCard: React.FC<FormulaCardProps> = ({ title, formula, solution, category, onClick }) => {
    return (
        <div className="formula-card" data-category={category} onClick={onClick}>
            <h3>{title}</h3>
            <div className="formula">
                <MathFormula latex={formula} />
            </div>
            {solution && (
                <div className="formula-solution">
                    <MathFormula latex={solution} />
                </div>
            )}
        </div>
    );
};

// Компонент вопроса теста
const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, showResult, selectedAnswer }) => {
    const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

    useEffect(() => {
        // Сбрасываем выделение при смене вопроса
        setSelected(selectedAnswer);
    }, [question.id, selectedAnswer]);

    const handleSelect = (index: number): void => {
        if (showResult) return;
        setSelected(index);
        onAnswer(index, question.options[index].correct);
    };

    return (
        <div className="quiz-question">
            <h3 className="quiz-question-title">{question.question}</h3>
            <div className="quiz-formula">
                <MathFormula latex={question.formula} />
            </div>
            <div className="quiz-options">
                {question.options.map((option, index) => {
                    let className = "quiz-option";
                    if (showResult) {
                        if (option.correct) {
                            className += " correct";
                        } else if (selected === index) {
                            className += " incorrect";
                        }
                        // Убираем selected класс когда показан результат
                    } else if (selected === index) {
                        className += " selected";
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => handleSelect(index)}
                            disabled={showResult}
                        >
                            <MathFormula latex={option.latex} displayMode={false} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Компонент теста
const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const handleAnswer = (answerIndex: number, isCorrect: boolean): void => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = { answerIndex, isCorrect };
        setAnswers(newAnswers);
        
        if (isCorrect) {
            setScore(score + 1);
        }
        
        setShowResult(true);
    };

    const handleNext = (): void => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowResult(false);
        } else {
            setQuizComplete(true);
            if (onComplete) {
                const finalScore = answers.filter(a => a.isCorrect).length;
                onComplete(finalScore);
            }
        }
    };

    const handleRestart = (): void => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setScore(0);
        setQuizComplete(false);
    };

    if (quizComplete) {
        const finalScore = answers.filter(a => a.isCorrect).length;
        const percentage = Math.round((finalScore / questions.length) * 100);
        
        return (
            <div className="quiz-complete">
                <h2>Тест завершён!</h2>
                <div className="quiz-score">
                    <div className="score-circle" style={{
                        background: `conic-gradient(
                            var(--accent) 0deg ${percentage * 3.6}deg,
                            var(--bg-secondary) ${percentage * 3.6}deg 360deg
                        )`
                    }}>
                        <div className="score-inner">
                            <div className="score-number">{percentage}%</div>
                            <div className="score-text">{finalScore}/{questions.length}</div>
                        </div>
                    </div>
                </div>
                <p className="quiz-message">
                    {percentage >= 80 ? '🎉 Отлично! Вы отлично знаете математику!' :
                     percentage >= 60 ? '👍 Хорошо! Есть над чем поработать.' :
                     '📚 Стоит повторить материал.'}
                </p>
                <button className="btn-primary" onClick={handleRestart}>
                    Пройти снова
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-progress">
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
                <div className="progress-text">
                    Вопрос {currentQuestion + 1} из {questions.length}
                </div>
            </div>

            <QuizQuestion
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                showResult={showResult}
                selectedAnswer={answers[currentQuestion]?.answerIndex}
            />

            {showResult && (
                <div className="quiz-actions">
                    <button className="btn-primary" onClick={handleNext}>
                        {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
                    </button>
                </div>
            )}
        </div>
    );
};

// Экспорт для использования
export { MathFormula, FormulaCard, QuizQuestion, Quiz, quizData };
export type { QuizQuestionData, QuizOption, MathFormulaProps, FormulaCardProps };

