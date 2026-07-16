package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

}
