package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.profile;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<UserProfile, Long> {


    Optional<UserProfile> findByUserId(Long userId);
}
