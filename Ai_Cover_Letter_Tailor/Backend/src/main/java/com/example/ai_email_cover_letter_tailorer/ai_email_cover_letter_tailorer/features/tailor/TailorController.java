package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto.TailorRequest;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor.dto.TailorResponse;
import kotlin.coroutines.jvm.internal.TailCallAsyncStackTraceEntryKt;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tailor")
public class TailorController {

    private final TailorService tailorService;

    public TailorController(TailorService tailorService) {
        this.tailorService = tailorService;
    }

    @PostMapping("/generate")
    public ResponseEntity<TailorResponse> createCoverLetter(@RequestBody TailorRequest tailorRequest, Principal principal) {
        TailorResponse response = tailorService.generatedAndSaveLetter(tailorRequest, principal);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<TailorResponse>> getGenerationHistory(Principal principal) {
        List<TailorResponse> responses = tailorService.getUserHistory(principal);
        return ResponseEntity.ok(responses);
    }
}
