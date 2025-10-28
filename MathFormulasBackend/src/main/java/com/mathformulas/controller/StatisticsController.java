package com.mathformulas.controller;

import com.mathformulas.dto.StatisticsDTO;
import com.mathformulas.dto.SubmitTestRequest;
import com.mathformulas.dto.TestResultDTO;
import com.mathformulas.entity.User;
import com.mathformulas.service.StatisticsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;
    private final com.mathformulas.repository.UserRepository userRepository;

    /**
     * Получить статистику текущего пользователя
     */
    @GetMapping
    public ResponseEntity<StatisticsDTO> getUserStatistics(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        StatisticsDTO statistics = statisticsService.getUserStatistics(user.getId());
        return ResponseEntity.ok(statistics);
    }

    /**
     * Получить историю тестов текущего пользователя
     */
    @GetMapping("/history")
    public ResponseEntity<List<TestResultDTO>> getTestHistory(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<TestResultDTO> history = statisticsService.getUserTestResults(user.getId());
        return ResponseEntity.ok(history);
    }

    /**
     * Сохранить результат теста
     */
    @PostMapping("/submit")
    public ResponseEntity<TestResultDTO> submitTest(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody SubmitTestRequest request) {
        
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        TestResultDTO result = statisticsService.submitTestResult(user.getId(), request);
        return ResponseEntity.ok(result);
    }
}

