package com.project.LibrarySystem.controller;


import com.project.LibrarySystem.entity.BookRequest;
import com.project.LibrarySystem.entity.BookResponse;
import com.project.LibrarySystem.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class BookController {


    private final BookService bookService;

    @GetMapping("/books")
    @PreAuthorize("hasAuthority('READ_BOOK')")
    public List<BookResponse> getAllBooks() {
        return bookService.getAllBooks();
    }


    @PostMapping("/book")
    @PreAuthorize("hasAuthority('ADD_BOOK')")
    public String addBook(@RequestBody BookRequest book) {
        return bookService.addBook(book);
    }

    @DeleteMapping("/book/{id}")
    @PreAuthorize("hasAuthority('DELETE_BOOK')")
    public String deleteBook(@PathVariable Long id){
        return bookService.deleteBook(id);
    }

    @PutMapping("/update-book/{id}")
    @PreAuthorize("hasAuthority('EDIT_BOOK')")
    public String updateBook(@RequestBody BookRequest bookRequest, @PathVariable Long id){
        return bookService.updateBook(bookRequest,id);
    }

    @GetMapping("book/{id}")
    @PreAuthorize("hasAuthority('READ_BOOK')")
    public BookResponse getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping("book/borrow/{id}")
    @PreAuthorize("hasAuthority('READ_BOOK')")
    public String borrowBook(@PathVariable Long id){
        return bookService.borrowBook(id);
    }

    @PostMapping("book/return/{id}")
    @PreAuthorize("hasAuthority('READ_BOOK')")
    public String returnBook(@PathVariable Long id){
        return bookService.returnBook(id);}

}


