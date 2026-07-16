package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TailorRequest {
    private String companyName;
    private String jobTitle;
    private String rawJobDescription;
}
