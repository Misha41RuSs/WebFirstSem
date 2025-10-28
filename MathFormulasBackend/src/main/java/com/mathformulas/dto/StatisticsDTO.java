package com.mathformulas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {
    private Integer totalTests;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Double accuracy; // Процент правильных ответов
}

