package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.profile;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth.UserRepository;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.User;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.UserProfile;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    private final UserRepository userRepository;


    public UserProfile getProfileByUsername(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"+ username));

         return profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found for user"+ username));


    }


    public UserProfile saveOrUpdateProfile(String username, ProfileRequest request){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"+ username));

        UserProfile profile = profileRepository.findByUserId(user.getId())
                .orElse(new UserProfile());

        profile.setFullName(request.getFullName());
        profile.setCurrentRole(request.getCurrentRole());
        profile.setSkills(request.getSkills());
        profile.setUser(user);

        return profileRepository.save(profile);

    }
}
