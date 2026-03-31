package com.project.LibrarySystem.service;

import com.project.LibrarySystem.entity.BookRequest;
import com.project.LibrarySystem.entity.BookResponse;

import java.util.List;

public interface BookService {
    List<BookResponse> getAllBooks();
    String addBook(BookRequest bookRequest);
    String deleteBook(Long id);
    BookResponse getBookById(Long id);
    String updateBook(BookRequest bookRequest,Long id);
    String borrowBook(Long id);
    String returnBook(Long id);
}
