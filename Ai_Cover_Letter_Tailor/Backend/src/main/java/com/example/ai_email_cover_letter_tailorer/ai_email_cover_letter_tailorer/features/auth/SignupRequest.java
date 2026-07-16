package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignupRequest {
    private String username;
    private String password;
    private Set<Role> roles;
}
