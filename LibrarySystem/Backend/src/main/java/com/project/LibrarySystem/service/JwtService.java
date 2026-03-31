package com.project.LibrarySystem.service;

import com.project.LibrarySystem.entity.AuthRequest;
import com.project.LibrarySystem.entity.Role;
import io.jsonwebtoken.Claims;


public interface JwtService {

    String generateToken(String username, String role);
    boolean validateToken(String token);
    Claims verifyTokenAndExtractAllClaims(String token);
    String extractUsername(String token);
}
