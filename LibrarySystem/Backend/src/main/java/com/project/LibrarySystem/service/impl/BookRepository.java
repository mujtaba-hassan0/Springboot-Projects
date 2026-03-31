package com.project.LibrarySystem.service.impl;

import com.project.LibrarySystem.entity.Book;
import org.springframework.data.repository.Repository;

interface BookRepository extends Repository<Book, Long> {
}
