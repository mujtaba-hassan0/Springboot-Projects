package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.features.tailor;

import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.GeneratedDocument;
import com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<GeneratedDocument, Long> {

    List<GeneratedDocument> findByUserOrderByCreatedAtDesc(User user);
}
