package com.project.LibrarySystem.config;

import com.project.LibrarySystem.entity.Role;
import com.project.LibrarySystem.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);

            if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                if (jwtService.validateToken(token)) {
                    Claims claim = jwtService.verifyTokenAndExtractAllClaims(token);
                    String username = claim.getSubject();

                    Role role = Role.valueOf(claim.get("role", String.class));

                    List<SimpleGrantedAuthority> authorities = role.getAuthorities();

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);

                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } else {
                    System.out.println("JWT Token validation failed in Filter");
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}