package com.project.LibrarySystem.service.impl;

import com.project.LibrarySystem.entity.AuthRequest;
import com.project.LibrarySystem.entity.Role;
import com.project.LibrarySystem.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtServiceImpl implements JwtService {

    private  final String secretKey="v16ETVzaPsH8LC6D1aqL0uI8k8vM6mLVybjIyMu7Xcu";

    @Override
    public String generateToken(String username, String role) {
        HashMap<String, Object> claims = new HashMap<String, Object>();
        claims.put("role",role);

        return Jwts.builder()
                .claims(claims)
                .signWith(getSecretKey())
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*15))
                .compact();
    }

    @Override
    public boolean validateToken(String token) {
        return verifyTokenAndExtractAllClaims(token).getExpiration().after(new Date());
    }

    @Override
    public Claims verifyTokenAndExtractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public String extractUsername(String token) {
     return  verifyTokenAndExtractAllClaims(token).getSubject();
    }

    public Key getSecretKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}
