package com.project.LibrarySystem.controller;

import com.project.LibrarySystem.entity.AuthRequest;
import com.project.LibrarySystem.entity.UserRequest;
import com.project.LibrarySystem.service.JwtService;
import com.project.LibrarySystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager  authenticationManager;
    private final JwtService jwtService;


    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserRequest userRequest){
        return new ResponseEntity<>(userService.saveUser(userRequest), HttpStatus.OK);
    }


    @PostMapping("/token")
    public String generateToken(@RequestBody AuthRequest authRequest){
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(), authRequest.getPassword()
        ));

        if(authenticate.isAuthenticated()){

        String role = authenticate.getAuthorities()
                .iterator()
                .next()
                .getAuthority()
                .replace("ROLE_","");

        return jwtService.generateToken(authRequest.getUsername(),role);

        }
    return null;
    }

}
