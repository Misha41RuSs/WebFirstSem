const API_URL = 'http://localhost:8080/api/user/statistics';

/**
 * Получить токен из localStorage
 */
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Получить статистику пользователя
 */
export const getUserStatistics = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Statistics error:', response.status, errorText);
            throw new Error(`Failed to fetch statistics: ${response.status}`);
        }
        
        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
    }
};

/**
 * Получить историю тестов
 */
export const getTestHistory = async () => {
    try {
        const response = await fetch(`${API_URL}/history`, {
            method: 'GET',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('History error:', response.status, errorText);
            throw new Error(`Failed to fetch test history: ${response.status}`);
        }
        
        const text = await response.text();
        if (!text) {
            return []; // Пустая история - это нормально
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Error fetching test history:', error);
        throw error;
    }
};

/**
 * Отправить результат теста
 */
export const submitTestResult = async (testName, score, totalQuestions, correctAnswers) => {
    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                testName,
                score,
                totalQuestions,
                correctAnswers,
            }),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Submit error:', response.status, errorText);
            throw new Error(`Failed to submit test result: ${response.status}`);
        }
        
        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Error submitting test result:', error);
        throw error;
    }
};

