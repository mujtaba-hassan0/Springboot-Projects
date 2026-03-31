package com.project.LibrarySystem.service;

import com.project.LibrarySystem.entity.UserRequest;
import com.project.LibrarySystem.entity.Users;

public interface UserService {

    Users findByUsername(String username);
    String saveUser(UserRequest userRequest);
}
