package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.auth.UserRepository;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.profile.ProfileRepository;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.GeneratedDocument;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.UserProfile;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto.TailorRequest;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto.TailorResponse;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.User;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TailorService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ChatClient chatClient;

    public TailorService(DocumentRepository documentRepository,
                         UserRepository userRepository,
                         ProfileRepository profileRepository,
                         ChatClient.Builder chatClientBuilder
                         ) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.chatClient = chatClientBuilder.build();
        ;
    }

    @Value("classpath:prompts/cover-letter.st")
    private Resource promptTemplateResource;

    @Transactional
    public TailorResponse generatedAndSaveLetter(TailorRequest request, Principal principal){
        //fetching user
        User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));

        //fetching user profile
        UserProfile profile = profileRepository.findByUserId(user.getId()).orElseThrow(() -> new RuntimeException("Please complete your profile before generating documents"));


        //prompt
        Map<String, Object> promptContext = Map.of(
                "name", profile.getFullName(),
                        "currentRole",profile.getCurrentRole(),
                        "skills", profile.getSkills(),
                        "company", request.getCompanyName(),
                        "jobTitle", request.getJobTitle(),
                        "jobDescription", request.getRawJobDescription()
                );




        //calling llm
        String aiResponse = chatClient.prompt()
                .user(u -> u.text(promptTemplateResource).params(promptContext))
                .call()
                .content();



        //saving document
        GeneratedDocument doc = GeneratedDocument.builder()
                .companyName(request.getCompanyName())
                .jobTitle(request.getJobTitle())
                .rawJobDescription(request.getRawJobDescription())
                .generatedText(aiResponse)
                .user(user)
                .build();

        GeneratedDocument savedDoc = documentRepository.save(doc);

        return new TailorResponse(savedDoc.getId(), savedDoc.getCompanyName(), savedDoc.getJobTitle(), savedDoc.getGeneratedText(), savedDoc.getCreatedAt());

    }

    public List<TailorResponse> getUserHistory(Principal principal){
    User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));

    return documentRepository.findByUserOrderByCreatedAtDesc(user).stream()
            .map(doc -> new TailorResponse(doc.getId(), doc.getCompanyName(), doc.getJobTitle(), doc.getGeneratedText(), doc.getCreatedAt()))
            .collect(Collectors.toList());
    }

}
