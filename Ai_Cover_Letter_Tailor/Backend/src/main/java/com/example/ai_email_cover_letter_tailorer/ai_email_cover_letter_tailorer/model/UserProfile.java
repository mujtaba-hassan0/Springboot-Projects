package com.example.ai_email_cover_letter_tailorer.ai_email_cover_letter_tailorer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private String fullName;

    @Column(name = "target_role")
    private String currentRole;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String skills;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;





}
