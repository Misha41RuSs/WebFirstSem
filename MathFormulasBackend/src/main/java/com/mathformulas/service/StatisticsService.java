package com.mathformulas.service;

import com.mathformulas.dto.StatisticsDTO;
import com.mathformulas.dto.SubmitTestRequest;
import com.mathformulas.dto.TestResultDTO;
import com.mathformulas.entity.TestResult;
import com.mathformulas.entity.User;
import com.mathformulas.entity.UserStatistics;
import com.mathformulas.repository.TestResultRepository;
import com.mathformulas.repository.UserRepository;
import com.mathformulas.repository.UserStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final UserStatisticsRepository statisticsRepository;
    private final TestResultRepository testResultRepository;
    private final UserRepository userRepository;

    /**
     * Получить статистику пользователя
     */
    public StatisticsDTO getUserStatistics(Long userId) {
        UserStatistics stats = statisticsRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultStatistics(userId));

        double accuracy = stats.getTotalQuestions() > 0
                ? (stats.getCorrectAnswers() * 100.0) / stats.getTotalQuestions()
                : 0.0;

        return new StatisticsDTO(
                stats.getTotalTests(),
                stats.getTotalQuestions(),
                stats.getCorrectAnswers(),
                Math.round(accuracy * 100.0) / 100.0 // Округляем до 2 знаков
        );
    }

    /**
     * Получить историю тестов пользователя
     */
    public List<TestResultDTO> getUserTestResults(Long userId) {
        List<TestResult> results = testResultRepository.findByUserIdOrderByCompletedAtDesc(userId);
        
        return results.stream()
                .map(result -> new TestResultDTO(
                        result.getId(),
                        result.getTestName(),
                        result.getScore(),
                        result.getTotalQuestions(),
                        result.getPercentage(),
                        result.getCompletedAt()
                ))
                .collect(Collectors.toList());
    }

    /**
     * Сохранить результат теста
     */
    @Transactional
    public TestResultDTO submitTestResult(Long userId, SubmitTestRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Создаем результат теста
        TestResult testResult = new TestResult();
        testResult.setUser(user);
        testResult.setTestName(request.getTestName());
        testResult.setScore(request.getScore());
        testResult.setTotalQuestions(request.getTotalQuestions());
        testResult.setPercentage((request.getScore() * 100) / request.getTotalQuestions());
        
        TestResult savedResult = testResultRepository.save(testResult);

        // Обновляем общую статистику
        updateUserStatistics(userId, request.getTotalQuestions(), request.getCorrectAnswers());

        return new TestResultDTO(
                savedResult.getId(),
                savedResult.getTestName(),
                savedResult.getScore(),
                savedResult.getTotalQuestions(),
                savedResult.getPercentage(),
                savedResult.getCompletedAt()
        );
    }

    /**
     * Обновить общую статистику пользователя
     */
    @Transactional
    protected void updateUserStatistics(Long userId, Integer totalQuestions, Integer correctAnswers) {
        UserStatistics stats = statisticsRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultStatistics(userId));

        stats.setTotalTests(stats.getTotalTests() + 1);
        stats.setTotalQuestions(stats.getTotalQuestions() + totalQuestions);
        stats.setCorrectAnswers(stats.getCorrectAnswers() + correctAnswers);

        statisticsRepository.save(stats);
    }

    /**
     * Создать статистику по умолчанию для нового пользователя
     */
    private UserStatistics createDefaultStatistics(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserStatistics stats = new UserStatistics();
        stats.setUser(user);
        stats.setTotalTests(0);
        stats.setTotalQuestions(0);
        stats.setCorrectAnswers(0);

        return statisticsRepository.save(stats);
    }
}

