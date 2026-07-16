package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.profile;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;


    @GetMapping
    public ResponseEntity<?> getUserProfile(Principal principal){
        try{
            UserProfile profile = profileService.getProfileByUsername(principal.getName());
            return ResponseEntity.ok(profile);
        } catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> saveUserProfile(@RequestBody ProfileRequest request, Principal principal){
        try {
            UserProfile profile = profileService.saveOrUpdateProfile(principal.getName(), request);
            return ResponseEntity.ok(profile);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
