package com.mathformulas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDTO {
    private Long id;
    private String testName;
    private Integer score;
    private Integer totalQuestions;
    private Integer percentage;
    private LocalDateTime completedAt;
}

