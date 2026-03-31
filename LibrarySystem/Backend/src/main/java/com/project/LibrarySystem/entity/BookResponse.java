package com.project.LibrarySystem.entity;

import lombok.Data;

@Data
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Status status;
    private String ownerUsername;
    private String borrowerUsername;
}
