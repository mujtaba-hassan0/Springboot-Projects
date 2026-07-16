package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.ai_email_cover_letter_tailorer")
@EntityScan(basePackages = "com.example.ai_email_cover_letter_tailorer")
@EnableJpaRepositories(basePackages = "com.example.ai_email_cover_letter_tailorer")
public class AiEmailCoverLetterTailorerApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiEmailCoverLetterTailorerApplication.class, args);
    }
}