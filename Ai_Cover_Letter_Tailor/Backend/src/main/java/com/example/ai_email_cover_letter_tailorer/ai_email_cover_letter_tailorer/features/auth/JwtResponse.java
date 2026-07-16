package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String username;
    private List<String> roles;
}
