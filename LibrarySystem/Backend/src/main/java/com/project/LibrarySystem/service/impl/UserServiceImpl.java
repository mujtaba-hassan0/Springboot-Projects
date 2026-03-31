package com.project.LibrarySystem.service.impl;

import com.project.LibrarySystem.entity.Role;
import com.project.LibrarySystem.entity.UserRequest;
import com.project.LibrarySystem.entity.Users;
import com.project.LibrarySystem.repo.UserRepo;
import com.project.LibrarySystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Users findByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(()-> new  UsernameNotFoundException("User not found"));
    }

    @Override
    public String saveUser(UserRequest userRequest) {
        if(userRepo.existsByUsername(userRequest.getUsername())){
           throw new RuntimeException("User with"+ userRequest.getUsername() +"already exists");
        }
        Users user = new Users();

        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(userRequest.getRole()!=null ? userRequest.getRole() : Role.STUDENT);

        userRepo.save(user);

        return "User saved Successfully";
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Users user = findByUsername(username);

       List<SimpleGrantedAuthority> authorities = new ArrayList<>();
       authorities.add(new SimpleGrantedAuthority("ROLE_"+user.getRole().name()));

       return User.builder()
               .username(user.getUsername())
               .password(user.getPassword())
               .authorities(authorities)
               .build();
    }


}
