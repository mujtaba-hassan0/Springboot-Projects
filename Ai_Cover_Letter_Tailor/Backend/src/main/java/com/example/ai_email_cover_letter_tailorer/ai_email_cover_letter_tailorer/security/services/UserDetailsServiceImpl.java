package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.security.services;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth.UserRepository;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
    public class UserDetailsServiceImpl implements UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Override
        @Transactional
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            // Query PostgreSQL database for the user
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

            // Wrap the user entity inside the UserDetailsImpl container
            return UserDetailsImpl.build(user);
        }
    }
