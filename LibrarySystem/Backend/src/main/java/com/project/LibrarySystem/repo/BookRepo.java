package com.project.LibrarySystem.repo;

import com.project.LibrarySystem.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends JpaRepository<Book,Long> {

    boolean existsByTitle(String title);
    boolean existsByAuthor(String author);
}
