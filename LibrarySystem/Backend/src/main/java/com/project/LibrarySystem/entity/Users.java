package com.project.LibrarySystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "username")
    private String username;

    @Column(nullable = false, name = "password")
    private String password;


    @Enumerated(EnumType.STRING)
    private Role role = Role.STUDENT;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Book> ownedBooks;

    @OneToMany(mappedBy = "borrower")
    private List<Book> borrowedBooks;

}
