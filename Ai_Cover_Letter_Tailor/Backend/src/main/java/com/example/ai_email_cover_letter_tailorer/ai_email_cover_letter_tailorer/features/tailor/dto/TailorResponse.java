package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TailorResponse {
    private Long id;
    private String companyName;
    private String jobTitle;
    private String generatedText;
    private LocalDateTime createdDate;
}
