const { useState, useEffect, useRef } = React;

// Общие вопросы
const generalQuestions = [
    {
        id: 1,
        question: "Формула Эйлера:",
        formula: "e^{i\\pi} + 1 = ?",
        options: [
            { text: "1", latex: "1", correct: false },
            { text: "i", latex: "i", correct: false },
            { text: "0", latex: "0", correct: true },
            { text: "-1", latex: "-1", correct: false }
        ],
        category: "general"
    },
    {
        id: 2,
        question: "Основное тригонометрическое тождество:",
        formula: "\\sin^2\\theta + \\cos^2\\theta = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "2", latex: "2", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\pi", latex: "\\pi", correct: false }
        ],
        category: "general"
    },
    {
        id: 3,
        question: "Площадь круга радиусом r:",
        formula: "S = ?",
        options: [
            { text: "2\\pi r", latex: "2\\pi r", correct: false },
            { text: "\\pi r", latex: "\\pi r", correct: false },
            { text: "r^2", latex: "r^2", correct: false },
            { text: "\\pi r^2", latex: "\\pi r^2", correct: true }
        ],
        category: "general"
    },
    {
        id: 4,
        question: "Решение квадратного уравнения ax^2 + bx + c = 0:",
        formula: "x = ?",
        options: [
            { text: "\\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}", latex: "\\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}", correct: false },
            { text: "\\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}", latex: "\\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}", correct: false },
            { text: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", latex: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", correct: true },
            { text: "\\frac{-b}{2a}", latex: "\\frac{-b}{2a}", correct: false }
        ],
        category: "general"
    },
    {
        id: 5,
        question: "Определитель матрицы 2×2:",
        formula: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ?",
        options: [
            { text: "ac - bd", latex: "ac - bd", correct: false },
            { text: "ad + bc", latex: "ad + bc", correct: false },
            { text: "ab - cd", latex: "ab - cd", correct: false },
            { text: "ad - bc", latex: "ad - bc", correct: true }
        ],
        category: "general"
    }
];

// Вопросы по производным
const derivativeQuestions = [
    {
        id: 1,
        question: "Производная степенной функции x^n:",
        formula: "\\frac{d}{dx}(x^n) = ?",
        options: [
            { text: "x^{n-1}", latex: "x^{n-1}", correct: false },
            { text: "nx^{n-1}", latex: "nx^{n-1}", correct: true },
            { text: "nx^n", latex: "nx^n", correct: false },
            { text: "(n-1)x^{n-2}", latex: "(n-1)x^{n-2}", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 2,
        question: "Производная синуса:",
        formula: "\\frac{d}{dx}(\\sin x) = ?",
        options: [
            { text: "-\\sin x", latex: "-\\sin x", correct: false },
            { text: "\\cos x", latex: "\\cos x", correct: true },
            { text: "-\\cos x", latex: "-\\cos x", correct: false },
            { text: "\\tan x", latex: "\\tan x", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 3,
        question: "Производная косинуса:",
        formula: "\\frac{d}{dx}(\\cos x) = ?",
        options: [
            { text: "\\sin x", latex: "\\sin x", correct: false },
            { text: "-\\sin x", latex: "-\\sin x", correct: true },
            { text: "\\cos x", latex: "\\cos x", correct: false },
            { text: "-\\cos x", latex: "-\\cos x", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 4,
        question: "Производная экспоненты:",
        formula: "\\frac{d}{dx}(e^x) = ?",
        options: [
            { text: "xe^{x-1}", latex: "xe^{x-1}", correct: false },
            { text: "\\frac{e^x}{x}", latex: "\\frac{e^x}{x}", correct: false },
            { text: "e^x", latex: "e^x", correct: true },
            { text: "e", latex: "e", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 5,
        question: "Производная натурального логарифма:",
        formula: "\\frac{d}{dx}(\\ln x) = ?",
        options: [
            { text: "\\frac{1}{x}", latex: "\\frac{1}{x}", correct: true },
            { text: "x", latex: "x", correct: false },
            { text: "\\ln x", latex: "\\ln x", correct: false },
            { text: "\\frac{1}{x^2}", latex: "\\frac{1}{x^2}", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 6,
        question: "Производная тангенса:",
        formula: "\\frac{d}{dx}(\\tan x) = ?",
        options: [
            { text: "\\sec x", latex: "\\sec x", correct: false },
            { text: "\\frac{1}{\\cos^2 x}", latex: "\\frac{1}{\\cos^2 x}", correct: true },
            { text: "\\frac{1}{\\sin^2 x}", latex: "\\frac{1}{\\sin^2 x}", correct: false },
            { text: "\\tan^2 x", latex: "\\tan^2 x", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 7,
        question: "Производная произведения uv (правило Лейбница):",
        formula: "(uv)' = ?",
        options: [
            { text: "u'v'", latex: "u'v'", correct: false },
            { text: "u'v + uv'", latex: "u'v + uv'", correct: true },
            { text: "u'v - uv'", latex: "u'v - uv'", correct: false },
            { text: "(u+v)'", latex: "(u+v)'", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 8,
        question: "Производная частного u/v:",
        formula: "\\left(\\frac{u}{v}\\right)' = ?",
        options: [
            { text: "\\frac{u'}{v'}", latex: "\\frac{u'}{v'}", correct: false },
            { text: "\\frac{u'v + uv'}{v^2}", latex: "\\frac{u'v + uv'}{v^2}", correct: false },
            { text: "\\frac{u'v - uv'}{v^2}", latex: "\\frac{u'v - uv'}{v^2}", correct: true },
            { text: "\\frac{uv' - u'v}{v^2}", latex: "\\frac{uv' - u'v}{v^2}", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 9,
        question: "Производная сложной функции f(g(x)):",
        formula: "\\frac{d}{dx}f(g(x)) = ?",
        options: [
            { text: "f'(x) \\cdot g'(x)", latex: "f'(x) \\cdot g'(x)", correct: false },
            { text: "f'(g(x)) \\cdot g'(x)", latex: "f'(g(x)) \\cdot g'(x)", correct: true },
            { text: "f(g'(x))", latex: "f(g'(x))", correct: false },
            { text: "f'(x) + g'(x)", latex: "f'(x) + g'(x)", correct: false }
        ],
        category: "derivatives"
    },
    {
        id: 10,
        question: "Производная арктангенса:",
        formula: "\\frac{d}{dx}(\\arctan x) = ?",
        options: [
            { text: "\\frac{1}{\\sqrt{1-x^2}}", latex: "\\frac{1}{\\sqrt{1-x^2}}", correct: false },
            { text: "\\frac{1}{1+x^2}", latex: "\\frac{1}{1+x^2}", correct: true },
            { text: "\\frac{1}{1-x^2}", latex: "\\frac{1}{1-x^2}", correct: false },
            { text: "-\\frac{1}{1+x^2}", latex: "-\\frac{1}{1+x^2}", correct: false }
        ],
        category: "derivatives"
    }
];

// Вопросы по пределам
const limitQuestions = [
    {
        id: 1,
        question: "Первый замечательный предел:",
        formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\infty", latex: "\\infty", correct: false },
            { text: "\\frac{1}{2}", latex: "\\frac{1}{2}", correct: false }
        ],
        category: "limits"
    },
    {
        id: 2,
        question: "Второй замечательный предел:",
        formula: "\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = ?",
        options: [
            { text: "1", latex: "1", correct: false },
            { text: "\\infty", latex: "\\infty", correct: false },
            { text: "e", latex: "e", correct: true },
            { text: "\\pi", latex: "\\pi", correct: false }
        ],
        category: "limits"
    },
    {
        id: 3,
        question: "Предел константы:",
        formula: "\\lim_{x \\to a} C = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "a", latex: "a", correct: false },
            { text: "C", latex: "C", correct: true },
            { text: "\\infty", latex: "\\infty", correct: false }
        ],
        category: "limits"
    },
    {
        id: 4,
        question: "Предел суммы:",
        formula: "\\lim_{x \\to a} (f(x) + g(x)) = ?",
        options: [
            { text: "\\lim f(x) \\cdot \\lim g(x)", latex: "\\lim f(x) \\cdot \\lim g(x)", correct: false },
            { text: "\\lim f(x) + \\lim g(x)", latex: "\\lim f(x) + \\lim g(x)", correct: true },
            { text: "\\lim(f(x) - g(x))", latex: "\\lim(f(x) - g(x))", correct: false },
            { text: "0", latex: "0", correct: false }
        ],
        category: "limits"
    },
    {
        id: 5,
        question: "Чему равен предел:",
        formula: "\\lim_{x \\to 0} \\frac{e^x - 1}{x} = ?",
        options: [
            { text: "e", latex: "e", correct: false },
            { text: "0", latex: "0", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\infty", latex: "\\infty", correct: false }
        ],
        category: "limits"
    },
    {
        id: 6,
        question: "Предел при раскрытии неопределенности:",
        formula: "\\lim_{x \\to 0} \\frac{\\tan x}{x} = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\infty", latex: "\\infty", correct: false },
            { text: "\\frac{\\pi}{2}", latex: "\\frac{\\pi}{2}", correct: false }
        ],
        category: "limits"
    },
    {
        id: 7,
        question: "Предел показательной функции:",
        formula: "\\lim_{x \\to \\infty} \\frac{x}{e^x} = ?",
        options: [
            { text: "\\infty", latex: "\\infty", correct: false },
            { text: "1", latex: "1", correct: false },
            { text: "e", latex: "e", correct: false },
            { text: "0", latex: "0", correct: true }
        ],
        category: "limits"
    }
];

// Вопросы по тригонометрии
const trigonometryQuestions = [
    {
        id: 1,
        question: "Формула синуса двойного угла:",
        formula: "\\sin 2\\alpha = ?",
        options: [
            { text: "2\\sin\\alpha", latex: "2\\sin\\alpha", correct: false },
            { text: "2\\sin\\alpha\\cos\\alpha", latex: "2\\sin\\alpha\\cos\\alpha", correct: true },
            { text: "\\sin^2\\alpha", latex: "\\sin^2\\alpha", correct: false },
            { text: "2\\cos\\alpha", latex: "2\\cos\\alpha", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 2,
        question: "Формула косинуса суммы:",
        formula: "\\cos(\\alpha + \\beta) = ?",
        options: [
            { text: "\\cos\\alpha + \\cos\\beta", latex: "\\cos\\alpha + \\cos\\beta", correct: false },
            { text: "\\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta", latex: "\\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta", correct: false },
            { text: "\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta", latex: "\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta", correct: true },
            { text: "\\sin\\alpha\\cos\\beta", latex: "\\sin\\alpha\\cos\\beta", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 3,
        question: "Формула тангенса суммы:",
        formula: "\\tan(\\alpha + \\beta) = ?",
        options: [
            { text: "\\tan\\alpha + \\tan\\beta", latex: "\\tan\\alpha + \\tan\\beta", correct: false },
            { text: "\\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}", latex: "\\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}", correct: true },
            { text: "\\frac{\\tan\\alpha - \\tan\\beta}{1 + \\tan\\alpha\\tan\\beta}", latex: "\\frac{\\tan\\alpha - \\tan\\beta}{1 + \\tan\\alpha\\tan\\beta}", correct: false },
            { text: "\\tan\\alpha\\tan\\beta", latex: "\\tan\\alpha\\tan\\beta", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 4,
        question: "Формула понижения степени для sin²α:",
        formula: "\\sin^2\\alpha = ?",
        options: [
            { text: "\\frac{1 + \\cos 2\\alpha}{2}", latex: "\\frac{1 + \\cos 2\\alpha}{2}", correct: false },
            { text: "\\frac{1 - \\cos 2\\alpha}{2}", latex: "\\frac{1 - \\cos 2\\alpha}{2}", correct: true },
            { text: "1 - \\cos^2\\alpha", latex: "1 - \\cos^2\\alpha", correct: false },
            { text: "\\frac{\\sin 2\\alpha}{2}", latex: "\\frac{\\sin 2\\alpha}{2}", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 5,
        question: "Связь тангенса и котангенса:",
        formula: "\\tan\\alpha \\cdot \\cot\\alpha = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "\\sin\\alpha", latex: "\\sin\\alpha", correct: false },
            { text: "\\cos\\alpha", latex: "\\cos\\alpha", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 6,
        question: "Формула косинуса двойного угла:",
        formula: "\\cos 2\\alpha = ?",
        options: [
            { text: "2\\cos\\alpha", latex: "2\\cos\\alpha", correct: false },
            { text: "\\cos^2\\alpha + \\sin^2\\alpha", latex: "\\cos^2\\alpha + \\sin^2\\alpha", correct: false },
            { text: "\\cos^2\\alpha - \\sin^2\\alpha", latex: "\\cos^2\\alpha - \\sin^2\\alpha", correct: true },
            { text: "2\\cos^2\\alpha", latex: "2\\cos^2\\alpha", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 7,
        question: "Тождество для 1 + tan²α:",
        formula: "1 + \\tan^2\\alpha = ?",
        options: [
            { text: "\\sec^2\\alpha", latex: "\\sec^2\\alpha", correct: false },
            { text: "\\frac{1}{\\cos^2\\alpha}", latex: "\\frac{1}{\\cos^2\\alpha}", correct: true },
            { text: "\\cot^2\\alpha", latex: "\\cot^2\\alpha", correct: false },
            { text: "1", latex: "1", correct: false }
        ],
        category: "trigonometry"
    },
    {
        id: 8,
        question: "Формула синуса суммы:",
        formula: "\\sin(\\alpha + \\beta) = ?",
        options: [
            { text: "\\sin\\alpha + \\sin\\beta", latex: "\\sin\\alpha + \\sin\\beta", correct: false },
            { text: "\\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta", latex: "\\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta", correct: false },
            { text: "\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta", latex: "\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta", correct: true },
            { text: "\\cos\\alpha\\cos\\beta", latex: "\\cos\\alpha\\cos\\beta", correct: false }
        ],
        category: "trigonometry"
    }
];

// Вопросы по комплексным числам
const complexQuestions = [
    {
        id: 1,
        question: "Чему равно i²:",
        formula: "i^2 = ?",
        options: [
            { text: "1", latex: "1", correct: false },
            { text: "i", latex: "i", correct: false },
            { text: "-1", latex: "-1", correct: true },
            { text: "0", latex: "0", correct: false }
        ],
        category: "complex"
    },
    {
        id: 2,
        question: "Модуль комплексного числа z = a + bi:",
        formula: "|z| = ?",
        options: [
            { text: "a + b", latex: "a + b", correct: false },
            { text: "\\sqrt{a + b}", latex: "\\sqrt{a + b}", correct: false },
            { text: "\\sqrt{a^2 + b^2}", latex: "\\sqrt{a^2 + b^2}", correct: true },
            { text: "a^2 + b^2", latex: "a^2 + b^2", correct: false }
        ],
        category: "complex"
    },
    {
        id: 3,
        question: "Сопряженное число для z = a + bi:",
        formula: "\\overline{z} = ?",
        options: [
            { text: "-a - bi", latex: "-a - bi", correct: false },
            { text: "a - bi", latex: "a - bi", correct: true },
            { text: "b + ai", latex: "b + ai", correct: false },
            { text: "-a + bi", latex: "-a + bi", correct: false }
        ],
        category: "complex"
    },
    {
        id: 4,
        question: "Формула Эйлера для комплексных чисел:",
        formula: "e^{i\\theta} = ?",
        options: [
            { text: "\\cos\\theta + \\sin\\theta", latex: "\\cos\\theta + \\sin\\theta", correct: false },
            { text: "\\cos\\theta + i\\sin\\theta", latex: "\\cos\\theta + i\\sin\\theta", correct: true },
            { text: "i(\\cos\\theta + \\sin\\theta)", latex: "i(\\cos\\theta + \\sin\\theta)", correct: false },
            { text: "\\sin\\theta + i\\cos\\theta", latex: "\\sin\\theta + i\\cos\\theta", correct: false }
        ],
        category: "complex"
    },
    {
        id: 5,
        question: "Чему равно i⁴:",
        formula: "i^4 = ?",
        options: [
            { text: "-1", latex: "-1", correct: false },
            { text: "i", latex: "i", correct: false },
            { text: "1", latex: "1", correct: true },
            { text: "-i", latex: "-i", correct: false }
        ],
        category: "complex"
    },
    {
        id: 6,
        question: "Произведение z · z̄:",
        formula: "z \\cdot \\overline{z} = ?",
        options: [
            { text: "0", latex: "0", correct: false },
            { text: "|z|", latex: "|z|", correct: false },
            { text: "|z|^2", latex: "|z|^2", correct: true },
            { text: "2|z|", latex: "2|z|", correct: false }
        ],
        category: "complex"
    }
];

// Вопросы по статистике и теории вероятностей
const statisticsQuestions = [
    {
        id: 1,
        question: "Среднее арифметическое выборки:",
        formula: "\\bar{x} = ?",
        options: [
            { text: "\\sum x_i", latex: "\\sum x_i", correct: false },
            { text: "\\frac{1}{n}\\sum_{i=1}^{n} x_i", latex: "\\frac{1}{n}\\sum_{i=1}^{n} x_i", correct: true },
            { text: "\\frac{\\sum x_i}{n-1}", latex: "\\frac{\\sum x_i}{n-1}", correct: false },
            { text: "\\sqrt{\\sum x_i}", latex: "\\sqrt{\\sum x_i}", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 2,
        question: "Дисперсия выборки:",
        formula: "\\sigma^2 = ?",
        options: [
            { text: "\\sum (x_i - \\bar{x})", latex: "\\sum (x_i - \\bar{x})", correct: false },
            { text: "\\frac{1}{n}\\sum (x_i - \\bar{x})^2", latex: "\\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2", correct: true },
            { text: "\\sqrt{\\sum (x_i - \\bar{x})^2}", latex: "\\sqrt{\\sum (x_i - \\bar{x})^2}", correct: false },
            { text: "\\frac{\\sum x_i^2}{n}", latex: "\\frac{\\sum x_i^2}{n}", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 3,
        question: "Стандартное отклонение:",
        formula: "\\sigma = ?",
        options: [
            { text: "\\frac{1}{n}\\sum (x_i - \\bar{x})^2", latex: "\\frac{1}{n}\\sum (x_i - \\bar{x})^2", correct: false },
            { text: "\\sum (x_i - \\bar{x})", latex: "\\sum (x_i - \\bar{x})", correct: false },
            { text: "\\sqrt{\\frac{1}{n}\\sum (x_i - \\bar{x})^2}", latex: "\\sqrt{\\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2}", correct: true },
            { text: "(\\bar{x})^2", latex: "(\\bar{x})^2", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 4,
        question: "Вероятность противоположного события:",
        formula: "P(\\overline{A}) = ?",
        options: [
            { text: "1 + P(A)", latex: "1 + P(A)", correct: false },
            { text: "1 - P(A)", latex: "1 - P(A)", correct: true },
            { text: "\\frac{1}{P(A)}", latex: "\\frac{1}{P(A)}", correct: false },
            { text: "0", latex: "0", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 5,
        question: "Формула сложения вероятностей (для несовместных событий):",
        formula: "P(A \\cup B) = ?",
        options: [
            { text: "P(A) \\cdot P(B)", latex: "P(A) \\cdot P(B)", correct: false },
            { text: "P(A) + P(B)", latex: "P(A) + P(B)", correct: true },
            { text: "P(A) + P(B) - P(A \\cap B)", latex: "P(A) + P(B) - P(A \\cap B)", correct: false },
            { text: "P(A) - P(B)", latex: "P(A) - P(B)", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 6,
        question: "Формула умножения вероятностей (для независимых событий):",
        formula: "P(A \\cap B) = ?",
        options: [
            { text: "P(A) + P(B)", latex: "P(A) + P(B)", correct: false },
            { text: "P(A) \\cdot P(B)", latex: "P(A) \\cdot P(B)", correct: true },
            { text: "P(A) - P(B)", latex: "P(A) - P(B)", correct: false },
            { text: "\\frac{P(A)}{P(B)}", latex: "\\frac{P(A)}{P(B)}", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 7,
        question: "Условная вероятность P(A|B):",
        formula: "P(A|B) = ?",
        options: [
            { text: "\\frac{P(A)}{P(B)}", latex: "\\frac{P(A)}{P(B)}", correct: false },
            { text: "P(A) \\cdot P(B)", latex: "P(A) \\cdot P(B)", correct: false },
            { text: "\\frac{P(A \\cap B)}{P(B)}", latex: "\\frac{P(A \\cap B)}{P(B)}", correct: true },
            { text: "P(A) + P(B)", latex: "P(A) + P(B)", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 8,
        question: "Математическое ожидание дискретной случайной величины:",
        formula: "E(X) = ?",
        options: [
            { text: "\\sum x_i", latex: "\\sum x_i", correct: false },
            { text: "\\sum p_i", latex: "\\sum p_i", correct: false },
            { text: "\\sum x_i p_i", latex: "\\sum x_i p_i", correct: true },
            { text: "\\frac{\\sum x_i}{n}", latex: "\\frac{\\sum x_i}{n}", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 9,
        question: "Дисперсия случайной величины через математическое ожидание:",
        formula: "D(X) = ?",
        options: [
            { text: "E(X^2)", latex: "E(X^2)", correct: false },
            { text: "E(X)^2", latex: "E(X)^2", correct: false },
            { text: "E(X^2) - (E(X))^2", latex: "E(X^2) - (E(X))^2", correct: true },
            { text: "E(X^2) + (E(X))^2", latex: "E(X^2) + (E(X))^2", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 10,
        question: "Медиана — это:",
        formula: "Me = ?",
        options: [
            { text: "Среднее арифметическое", latex: "\\text{Среднее значение}", correct: false },
            { text: "Наиболее часто встречающееся значение", latex: "\\text{Мода}", correct: false },
            { text: "Значение, делящее ряд пополам", latex: "\\text{Серединное значение}", correct: true },
            { text: "Максимальное значение", latex: "\\max(x_i)", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 11,
        question: "Коэффициент корреляции Пирсона находится в диапазоне:",
        formula: "r \\in ?",
        options: [
            { text: "[0, 1]", latex: "[0, 1]", correct: false },
            { text: "[-1, 1]", latex: "[-1, 1]", correct: true },
            { text: "[0, \\infty)", latex: "[0, \\infty)", correct: false },
            { text: "(-\\infty, \\infty)", latex: "(-\\infty, \\infty)", correct: false }
        ],
        category: "statistics"
    },
    {
        id: 12,
        question: "Для нормального распределения параметр μ обозначает:",
        formula: "\\mu = ?",
        options: [
            { text: "Дисперсию", latex: "\\sigma^2", correct: false },
            { text: "Стандартное отклонение", latex: "\\sigma", correct: false },
            { text: "Математическое ожидание", latex: "E(X)", correct: true },
            { text: "Медиану", latex: "Me", correct: false }
        ],
        category: "statistics"
    }
];

// Вопросы по интегралам
const integralQuestions = [
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
function MathFormula({ latex, displayMode = true }) {
    const formulaRef = useRef(null);

    useEffect(() => {
        if (formulaRef.current && window.katex) {
            katex.render(latex, formulaRef.current, {
                displayMode: displayMode,
                throwOnError: false
            });
        }
    }, [latex, displayMode]);

    return <span ref={formulaRef} className="math-formula"></span>;
}

// Компонент карточки формулы
function FormulaCard({ title, formula, solution, category, onClick }) {
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
}

// Компонент вопроса теста
function QuizQuestion({ question, onAnswer, showResult, selectedAnswer }) {
    const [selected, setSelected] = useState(selectedAnswer);

    useEffect(() => {
        // Сбрасываем выделение при смене вопроса
        setSelected(selectedAnswer);
    }, [question.id, selectedAnswer]);

    const handleSelect = (index) => {
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
}

// Компонент выбора теста
function QuizSelector() {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const handleQuizComplete = async (score, totalQuestions, correctAnswers) => {
        const testName = selectedQuiz.name;
        
        try {
            // Отправляем результат на сервер
            await window.StatisticsService.submitTestResult(
                testName,
                score,
                totalQuestions,
                correctAnswers
            );
            console.log('Test result submitted successfully');
        } catch (error) {
            console.error('Failed to submit test result:', error);
            alert('Не удалось сохранить результаты теста. Проверьте подключение к серверу.');
        }
    };

    if (selectedQuiz) {
        return (
            <div>
                <button 
                    className="btn-back" 
                    onClick={() => setSelectedQuiz(null)}
                    style={{
                        marginBottom: '20px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '2px solid var(--border)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1em',
                        fontWeight: '600'
                    }}
                >
                    ← Назад к выбору теста
                </button>
                <Quiz questions={selectedQuiz.questions} onComplete={handleQuizComplete} />
            </div>
        );
    }

    return (
        <div className="quiz-selector">
            <p className="quiz-selector-description">Выберите тему для тестирования:</p>
            
            <div className="quiz-types">
                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Общие вопросы',
                    questions: generalQuestions
                })}>
                    <div className="quiz-type-icon">📚</div>
                    <h3>Общие вопросы</h3>
                    <p>Формула Эйлера, тригонометрия, геометрия, алгебра</p>
                    <div className="quiz-type-count">{generalQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Производные',
                    questions: derivativeQuestions
                })}>
                    <div className="quiz-type-icon">📈</div>
                    <h3>Производные</h3>
                    <p>Правила дифференцирования, табличные производные</p>
                    <div className="quiz-type-count">{derivativeQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Интегралы',
                    questions: integralQuestions
                })}>
                    <div className="quiz-type-icon">∫</div>
                    <h3>Интегралы</h3>
                    <p>Табличные интегралы, интегрирование по частям</p>
                    <div className="quiz-type-count">{integralQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Пределы',
                    questions: limitQuestions
                })}>
                    <div className="quiz-type-icon">∞</div>
                    <h3>Пределы</h3>
                    <p>Замечательные пределы, раскрытие неопределенностей</p>
                    <div className="quiz-type-count">{limitQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Тригонометрия',
                    questions: trigonometryQuestions
                })}>
                    <div className="quiz-type-icon">📐</div>
                    <h3>Тригонометрия</h3>
                    <p>Формулы суммы, двойного угла, понижения степени</p>
                    <div className="quiz-type-count">{trigonometryQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Комплексные числа',
                    questions: complexQuestions
                })}>
                    <div className="quiz-type-icon">ℂ</div>
                    <h3>Комплексные числа</h3>
                    <p>Модуль, сопряжение, формула Эйлера</p>
                    <div className="quiz-type-count">{complexQuestions.length} вопросов</div>
                </div>

                <div className="quiz-type-card" onClick={() => setSelectedQuiz({
                    name: 'Статистика и вероятность',
                    questions: statisticsQuestions
                })}>
                    <div className="quiz-type-icon">📊</div>
                    <h3>Статистика и вероятность</h3>
                    <p>Среднее, дисперсия, вероятности, корреляция</p>
                    <div className="quiz-type-count">{statisticsQuestions.length} вопросов</div>
                </div>
            </div>
        </div>
    );
}

// Компонент теста
function Quiz({ questions, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const handleAnswer = (answerIndex, isCorrect) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = { answerIndex, isCorrect };
        setAnswers(newAnswers);
        
        if (isCorrect) {
            setScore(score + 1);
        }
        
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowResult(false);
        } else {
            const finalScore = answers.filter(a => a.isCorrect).length;
            setQuizComplete(true);
            if (onComplete) {
                onComplete(score + (answers[currentQuestion]?.isCorrect ? 1 : 0), questions.length, score + (answers[currentQuestion]?.isCorrect ? 1 : 0));
            }
        }
    };

    const handleRestart = () => {
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
}

// Главный компонент приложения
function App() {
    const [activeTab, setActiveTab] = useState('formulas');
    const [theme, setTheme] = useState('dark');
    const [notification, setNotification] = useState(null);
    const [interactiveMode, setInteractiveMode] = useState('calculator'); // calculator, graph, stats
    const [selectedCategory, setSelectedCategory] = useState('all'); // для фильтрации формул
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);

    // Проверка авторизации при загрузке
    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = AuthService.getCurrentUser();
            const isValid = await AuthService.validateToken();
            
            if (currentUser && isValid) {
                setUser(currentUser);
                setIsAuthenticated(true);
            } else {
                AuthService.logout();
                setIsAuthenticated(false);
            }
            
            setAuthChecking(false);
        };
        
        checkAuth();
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('mathTheme') || 'dark';
        setTheme(savedTheme);
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('mathTheme', newTheme);
        
        if (newTheme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 2000);
    };

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        // Убрали уведомление при входе
    };

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
        showNotification('Вы вышли из системы');
    };

    const handleFormulaClick = (formula) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(formula);
            showNotification('Формула скопирована!');
        }
    };

    const formulas = [
        // Алгебра
        {
            title: "Квадратное уравнение",
            formula: "ax^2 + bx + c = 0",
            solution: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
            category: "algebra"
        },
        {
            title: "Формулы сокращенного умножения: квадрат суммы",
            formula: "(a+b)^2 = a^2 + 2ab + b^2",
            category: "algebra"
        },
        {
            title: "Формулы сокращенного умножения: квадрат разности",
            formula: "(a-b)^2 = a^2 - 2ab + b^2",
            category: "algebra"
        },
        {
            title: "Разность квадратов",
            formula: "a^2 - b^2 = (a-b)(a+b)",
            category: "algebra"
        },
        {
            title: "Куб суммы",
            formula: "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
            category: "algebra"
        },
        {
            title: "Куб разности",
            formula: "(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3",
            category: "algebra"
        },
        {
            title: "Сумма кубов",
            formula: "a^3 + b^3 = (a+b)(a^2-ab+b^2)",
            category: "algebra"
        },
        {
            title: "Разность кубов",
            formula: "a^3 - b^3 = (a-b)(a^2+ab+b^2)",
            category: "algebra"
        },
        {
            title: "Биномиальный коэффициент",
            formula: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}",
            category: "algebra"
        },
        {
            title: "Формула бинома Ньютона",
            formula: "(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k}b^k",
            category: "algebra"
        },
        
        // Геометрия
        {
            title: "Теорема Пифагора",
            formula: "a^2 + b^2 = c^2",
            category: "geometry"
        },
        {
            title: "Площадь круга",
            formula: "S = \\pi r^2",
            category: "geometry"
        },
        {
            title: "Длина окружности",
            formula: "C = 2\\pi r",
            category: "geometry"
        },
        {
            title: "Площадь треугольника",
            formula: "S = \\frac{1}{2}ah",
            category: "geometry"
        },
        {
            title: "Формула Герона",
            formula: "S = \\sqrt{p(p-a)(p-b)(p-c)}, \\quad p = \\frac{a+b+c}{2}",
            category: "geometry"
        },
        {
            title: "Площадь прямоугольника",
            formula: "S = ab",
            category: "geometry"
        },
        {
            title: "Площадь трапеции",
            formula: "S = \\frac{a+b}{2} \\cdot h",
            category: "geometry"
        },
        {
            title: "Объём шара",
            formula: "V = \\frac{4}{3}\\pi r^3",
            category: "geometry"
        },
        {
            title: "Площадь поверхности шара",
            formula: "S = 4\\pi r^2",
            category: "geometry"
        },
        {
            title: "Объём цилиндра",
            formula: "V = \\pi r^2 h",
            category: "geometry"
        },
        {
            title: "Объём конуса",
            formula: "V = \\frac{1}{3}\\pi r^2 h",
            category: "geometry"
        },
        
        // Тригонометрия
        {
            title: "Основное тригонометрическое тождество",
            formula: "\\sin^2\\theta + \\cos^2\\theta = 1",
            category: "trigonometry"
        },
        {
            title: "Тангенс через синус и косинус",
            formula: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}",
            category: "trigonometry"
        },
        {
            title: "Котангенс через косинус и синус",
            formula: "\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}",
            category: "trigonometry"
        },
        {
            title: "Синус двойного угла",
            formula: "\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha",
            category: "trigonometry"
        },
        {
            title: "Косинус двойного угла",
            formula: "\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha",
            category: "trigonometry"
        },
        {
            title: "Тангенс двойного угла",
            formula: "\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1-\\tan^2\\alpha}",
            category: "trigonometry"
        },
        {
            title: "Синус суммы",
            formula: "\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta",
            category: "trigonometry"
        },
        {
            title: "Косинус суммы",
            formula: "\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta",
            category: "trigonometry"
        },
        {
            title: "Синус разности",
            formula: "\\sin(\\alpha-\\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta",
            category: "trigonometry"
        },
        {
            title: "Косинус разности",
            formula: "\\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta",
            category: "trigonometry"
        },
        
        // Математический анализ
        {
            title: "Формула Эйлера",
            formula: "e^{i\\pi} + 1 = 0",
            category: "calculus"
        },
        {
            title: "Производная степенной функции",
            formula: "\\frac{d}{dx}(x^n) = nx^{n-1}",
            category: "calculus"
        },
        {
            title: "Производная синуса",
            formula: "\\frac{d}{dx}(\\sin x) = \\cos x",
            category: "calculus"
        },
        {
            title: "Производная косинуса",
            formula: "\\frac{d}{dx}(\\cos x) = -\\sin x",
            category: "calculus"
        },
        {
            title: "Производная экспоненты",
            formula: "\\frac{d}{dx}(e^x) = e^x",
            category: "calculus"
        },
        {
            title: "Производная натурального логарифма",
            formula: "\\frac{d}{dx}(\\ln x) = \\frac{1}{x}",
            category: "calculus"
        },
        {
            title: "Производная произведения",
            formula: "(uv)' = u'v + uv'",
            category: "calculus"
        },
        {
            title: "Производная частного",
            formula: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
            category: "calculus"
        },
        {
            title: "Интеграл степенной функции",
            formula: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1",
            category: "calculus"
        },
        {
            title: "Интеграл синуса",
            formula: "\\int \\sin x dx = -\\cos x + C",
            category: "calculus"
        },
        {
            title: "Интеграл косинуса",
            formula: "\\int \\cos x dx = \\sin x + C",
            category: "calculus"
        },
        {
            title: "Интеграл экспоненты",
            formula: "\\int e^x dx = e^x + C",
            category: "calculus"
        },
        {
            title: "Формула Ньютона-Лейбница",
            formula: "\\int_a^b f(x)dx = F(b) - F(a)",
            category: "calculus"
        },
        {
            title: "Первый замечательный предел",
            formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
            category: "calculus"
        },
        {
            title: "Второй замечательный предел",
            formula: "\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e",
            category: "calculus"
        },
        
        // Комплексные числа
        {
            title: "Мнимая единица",
            formula: "i^2 = -1",
            category: "complex"
        },
        {
            title: "Модуль комплексного числа",
            formula: "|z| = \\sqrt{a^2 + b^2}, \\quad z = a + bi",
            category: "complex"
        },
        {
            title: "Сопряженное число",
            formula: "\\overline{a+bi} = a - bi",
            category: "complex"
        },
        {
            title: "Формула Эйлера для комплексных чисел",
            formula: "e^{i\\theta} = \\cos\\theta + i\\sin\\theta",
            category: "complex"
        },
        
        // Статистика и комбинаторика
        {
            title: "Среднее арифметическое",
            formula: "\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i",
            category: "statistics"
        },
        {
            title: "Дисперсия",
            formula: "\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2",
            category: "statistics"
        },
        {
            title: "Стандартное отклонение",
            formula: "\\sigma = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})^2}",
            category: "statistics"
        },
        {
            title: "Количество перестановок",
            formula: "P_n = n!",
            category: "combinatorics"
        },
        {
            title: "Размещения",
            formula: "A_n^k = \\frac{n!}{(n-k)!}",
            category: "combinatorics"
        },
        {
            title: "Сочетания",
            formula: "C_n^k = \\frac{n!}{k!(n-k)!}",
            category: "combinatorics"
        },
        
        // Дополнительные формулы
        {
            title: "Формула суммы арифметической прогрессии",
            formula: "S_n = \\frac{(a_1 + a_n) \\cdot n}{2}",
            category: "algebra"
        },
        {
            title: "n-й член арифметической прогрессии",
            formula: "a_n = a_1 + (n-1)d",
            category: "algebra"
        },
        {
            title: "Сумма геометрической прогрессии",
            formula: "S_n = b_1 \\cdot \\frac{1-q^n}{1-q}, \\quad q \\neq 1",
            category: "algebra"
        },
        {
            title: "Площадь параллелограмма",
            formula: "S = a \\cdot h = ab\\sin\\alpha",
            category: "geometry"
        },
        {
            title: "Площадь ромба",
            formula: "S = \\frac{d_1 \\cdot d_2}{2}",
            category: "geometry"
        },
        {
            title: "Теорема косинусов",
            formula: "c^2 = a^2 + b^2 - 2ab\\cos\\gamma",
            category: "geometry"
        },
        {
            title: "Теорема синусов",
            formula: "\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R",
            category: "geometry"
        },
        {
            title: "Производная тангенса",
            formula: "\\frac{d}{dx}(\\tan x) = \\frac{1}{\\cos^2 x} = \\sec^2 x",
            category: "calculus"
        },
        {
            title: "Производная арксинуса",
            formula: "\\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1-x^2}}",
            category: "calculus"
        },
        {
            title: "Формула Тейлора",
            formula: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n",
            category: "calculus"
        },
        {
            title: "Ряд Маклорена для e^x",
            formula: "e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + ...",
            category: "calculus"
        },
        {
            title: "Ряд Маклорена для sin x",
            formula: "\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - ...",
            category: "calculus"
        },
        {
            title: "Ряд Маклорена для cos x",
            formula: "\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - ...",
            category: "calculus"
        },
        {
            title: "Формула включений-исключений",
            formula: "|A \\cup B| = |A| + |B| - |A \\cap B|",
            category: "combinatorics"
        },
        {
            title: "Формула полной вероятности",
            formula: "P(A) = \\sum_{i=1}^{n} P(A|B_i)P(B_i)",
            category: "statistics"
        },
        {
            title: "Формула Байеса",
            formula: "P(B_i|A) = \\frac{P(A|B_i)P(B_i)}{\\sum_{j=1}^{n} P(A|B_j)P(B_j)}",
            category: "statistics"
        }
    ];

    // Показываем загрузку при проверке авторизации
    if (authChecking) {
        return (
            <div className="auth-container">
                <div className="loading-spinner" style={{ fontSize: '2em' }}>
                    ⏳ Загрузка...
                </div>
            </div>
        );
    }

    // Показываем форму авторизации, если пользователь не авторизован
    if (!isAuthenticated) {
        return <AuthComponent onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="container">
            <header>
                <div className="header-top">
                    <div>
                        <h1>Математические формулы</h1>
                        <p className="subtitle">Интерактивное обучение математике</p>
                    </div>
                    
                    {/* Панель пользователя */}
                    <div className="user-panel">
                        <div className="user-avatar">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="user-info">
                            <p className="user-name">{user?.username || 'Пользователь'}</p>
                            <p className="user-email">{user?.email || ''}</p>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            Выйти
                        </button>
                    </div>
                </div>
                
                <div className="header-controls">
                    <button 
                        className={`tab-btn ${activeTab === 'formulas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('formulas')}
                    >
                        📐 Формулы
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('theory')}
                    >
                        📚 Теория
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                        onClick={() => setActiveTab('quiz')}
                    >
                        🎯 Тесты
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'interactive' ? 'active' : ''}`}
                        onClick={() => setActiveTab('interactive')}
                    >
                        🎮 Интерактив
                    </button>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <main>
                {activeTab === 'formulas' && (
                    <section className="formulas-section">
                        <div className="category-filter">
                            <button 
                                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                Все формулы
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'algebra' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('algebra')}
                            >
                                Алгебра
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'geometry' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('geometry')}
                            >
                                Геометрия
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'trigonometry' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('trigonometry')}
                            >
                                Тригонометрия
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'calculus' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('calculus')}
                            >
                                Мат. анализ
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'complex' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('complex')}
                            >
                                Комплексные числа
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'statistics' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('statistics')}
                            >
                                Статистика
                            </button>
                            <button 
                                className={`filter-btn ${selectedCategory === 'combinatorics' ? 'active' : ''}`}
                                onClick={() => setSelectedCategory('combinatorics')}
                            >
                                Комбинаторика
                            </button>
                        </div>
                        <div className="formulas-grid">
                            {formulas
                                .filter(f => selectedCategory === 'all' || f.category === selectedCategory)
                                .map((formula, index) => (
                                    <FormulaCard
                                        key={index}
                                        {...formula}
                                        onClick={() => handleFormulaClick(formula.formula)}
                                    />
                                ))}
                        </div>
                    </section>
                )}

                {activeTab === 'theory' && (
                    <section className="theory-section">
                        <h2>📚 Теоретические основы</h2>
                        
                        <div className="theory-block">
                            <h3>📊 Основы алгебры</h3>
                            <div className="theory-content">
                                <p><strong>Формулы сокращенного умножения</strong> — это набор формул, которые упрощают умножение многочленов:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="(a \pm b)^2 = a^2 \pm 2ab + b^2" />
                                </div>
                                <div className="theory-formula">
                                    <MathFormula latex="a^2 - b^2 = (a-b)(a+b)" />
                                </div>
                                <div className="theory-formula">
                                    <MathFormula latex="(a \pm b)^3 = a^3 \pm 3a^2b + 3ab^2 \pm b^3" />
                                </div>
                                <p>Эти формулы широко применяются для упрощения выражений и решения уравнений.</p>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>📐 Геометрия</h3>
                            <div className="theory-content">
                                <p><strong>Теорема Пифагора</strong> — одна из фундаментальных теорем геометрии:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="a^2 + b^2 = c^2" />
                                </div>
                                <p>где <em>c</em> — гипотенуза прямоугольного треугольника, <em>a</em> и <em>b</em> — катеты.</p>
                                
                                <p><strong>Площади основных фигур:</strong></p>
                                <ul>
                                    <li>Круг: <MathFormula latex="S = \pi r^2" displayMode={false} /></li>
                                    <li>Треугольник: <MathFormula latex="S = \frac{1}{2}ah" displayMode={false} /></li>
                                    <li>Трапеция: <MathFormula latex="S = \frac{a+b}{2} \cdot h" displayMode={false} /></li>
                                </ul>

                                <p><strong>Объёмы тел:</strong></p>
                                <ul>
                                    <li>Шар: <MathFormula latex="V = \frac{4}{3}\pi r^3" displayMode={false} /></li>
                                    <li>Цилиндр: <MathFormula latex="V = \pi r^2 h" displayMode={false} /></li>
                                    <li>Конус: <MathFormula latex="V = \frac{1}{3}\pi r^2 h" displayMode={false} /></li>
                                </ul>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>📈 Тригонометрия</h3>
                            <div className="theory-content">
                                <p><strong>Основное тригонометрическое тождество:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\sin^2\alpha + \cos^2\alpha = 1" />
                                </div>
                                
                                <p><strong>Формулы двойного угла:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\sin 2\alpha = 2\sin\alpha\cos\alpha" />
                                </div>
                                <div className="theory-formula">
                                    <MathFormula latex="\cos 2\alpha = \cos^2\alpha - \sin^2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha" />
                                </div>

                                <p><strong>Формулы суммы и разности:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta" />
                                </div>
                                <div className="theory-formula">
                                    <MathFormula latex="\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta" />
                                </div>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>∫ Математический анализ</h3>
                            <div className="theory-content">
                                <p><strong>Производная</strong> показывает скорость изменения функции:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
                                </div>

                                <p><strong>Основные правила дифференцирования:</strong></p>
                                <ul>
                                    <li>Постоянная: <MathFormula latex="C' = 0" displayMode={false} /></li>
                                    <li>Степенная: <MathFormula latex="(x^n)' = nx^{n-1}" displayMode={false} /></li>
                                    <li>Произведение: <MathFormula latex="(uv)' = u'v + uv'" displayMode={false} /></li>
                                    <li>Частное: <MathFormula latex="(\frac{u}{v})' = \frac{u'v - uv'}{v^2}" displayMode={false} /></li>
                                </ul>

                                <p><strong>Интеграл</strong> — обратная операция к дифференцированию:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="\int f(x)dx = F(x) + C, \quad \text{где } F'(x) = f(x)" />
                                </div>

                                <p><strong>Формула Ньютона-Лейбница:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\int_a^b f(x)dx = F(b) - F(a)" />
                                </div>

                                <p><strong>Замечательные пределы:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\lim_{x \to 0} \frac{\sin x}{x} = 1" />
                                </div>
                                <div className="theory-formula">
                                    <MathFormula latex="\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e \approx 2.71828" />
                                </div>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>ℂ Комплексные числа</h3>
                            <div className="theory-content">
                                <p><strong>Комплексное число</strong> имеет вид:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="z = a + bi" />
                                </div>
                                <p>где <em>a</em> — действительная часть, <em>b</em> — мнимая часть, <MathFormula latex="i^2 = -1" displayMode={false} /></p>

                                <p><strong>Модуль комплексного числа:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="|z| = \sqrt{a^2 + b^2}" />
                                </div>

                                <p><strong>Формула Эйлера</strong> связывает тригонометрию и комплексные числа:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="e^{i\theta} = \cos\theta + i\sin\theta" />
                                </div>
                                
                                <p>Частный случай при θ = π:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="e^{i\pi} + 1 = 0" />
                                </div>
                                <p>Эта формула связывает пять фундаментальных математических констант: e, i, π, 1 и 0.</p>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>📊 Комбинаторика</h3>
                            <div className="theory-content">
                                <p><strong>Перестановки</strong> — упорядоченные наборы из n элементов:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="P_n = n!" />
                                </div>

                                <p><strong>Размещения</strong> — упорядоченные k-элементные выборки из n элементов:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="A_n^k = \frac{n!}{(n-k)!}" />
                                </div>

                                <p><strong>Сочетания</strong> — неупорядоченные k-элементные выборки из n элементов:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="C_n^k = \binom{n}{k} = \frac{n!}{k!(n-k)!}" />
                                </div>

                                <p><strong>Бином Ньютона:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="(a+b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k}b^k" />
                                </div>
                            </div>
                        </div>

                        <div className="theory-block">
                            <h3>📈 Теория вероятностей и статистика</h3>
                            <div className="theory-content">
                                <p><strong>Среднее арифметическое</strong> (математическое ожидание для выборки):</p>
                                <div className="theory-formula">
                                    <MathFormula latex="\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i" />
                                </div>

                                <p><strong>Дисперсия</strong> — мера разброса значений:</p>
                                <div className="theory-formula">
                                    <MathFormula latex="\sigma^2 = \frac{1}{n}\sum_{i=1}^{n} (x_i - \bar{x})^2" />
                                </div>

                                <p><strong>Стандартное отклонение:</strong></p>
                                <div className="theory-formula">
                                    <MathFormula latex="\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n} (x_i - \bar{x})^2}" />
                                </div>

                                <p>Стандартное отклонение показывает, насколько в среднем отклоняются значения от среднего арифметического.</p>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'quiz' && (
                    <section className="quiz-section">
                        <h2>Проверьте свои знания!</h2>
                        <QuizSelector />
                    </section>
                )}

                {activeTab === 'interactive' && (
                    <section className="interactive-section">
                        <h2>Интерактивные инструменты</h2>
                        
                        <div className="interactive-tabs">
                            <button
                                className={`interactive-tab ${interactiveMode === 'calculator' ? 'active' : ''}`}
                                onClick={() => setInteractiveMode('calculator')}
                            >
                                🧮 Калькулятор
                            </button>
                            <button
                                className={`interactive-tab ${interactiveMode === 'graph' ? 'active' : ''}`}
                                onClick={() => setInteractiveMode('graph')}
                            >
                                📊 Графики
                            </button>
                            <button
                                className={`interactive-tab ${interactiveMode === 'stats' ? 'active' : ''}`}
                                onClick={() => setInteractiveMode('stats')}
                            >
                                📈 Статистика
                            </button>
                        </div>

                        <div className="interactive-content">
                            {interactiveMode === 'calculator' && <Calculator />}
                            {interactiveMode === 'graph' && <GraphVisualizer />}
                            {interactiveMode === 'stats' && <Statistics />}
                        </div>
                    </section>
                )}
            </main>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
}

// Рендер приложения
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

