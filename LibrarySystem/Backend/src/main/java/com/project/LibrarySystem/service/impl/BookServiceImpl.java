package com.project.LibrarySystem.service.impl;

import com.project.LibrarySystem.entity.*;
import com.project.LibrarySystem.repo.BookRepo;
import com.project.LibrarySystem.repo.UserRepo;
import com.project.LibrarySystem.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepo bookRepo;
    private final UserRepo userRepo;


    @Override
    public List<BookResponse> getAllBooks() {
        List<Book> books =bookRepo.findAll();
        List<BookResponse> bookResponses = new ArrayList<>();

        for (Book book : books) {
            BookResponse bookResponse = new BookResponse();
            bookResponse.setId(book.getId());
            bookResponse.setTitle(book.getTitle());
            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setDescription(book.getDescription());
            bookResponse.setStatus(book.getStatus());
            bookResponse.setOwnerUsername(book.getOwner().getUsername());
            if(book.getBorrower() !=null){
                bookResponse.setBorrowerUsername(book.getBorrower().getUsername());
            }

            bookResponses.add(bookResponse);
        }
        return bookResponses;
    }

    @Override
    public String addBook(BookRequest bookRequest) {
        if(bookRepo.existsByTitle(bookRequest.getTitle()) && bookRepo.existsByAuthor(bookRequest.getAuthor())){
            throw new RuntimeException("Book is already exist");
        }



        //Check the Logged-in User Here
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername=authentication.getName();

        Users currentUser = userRepo.findByUsername(currentUsername.trim()).orElseThrow(
                ()-> new RuntimeException("User not found with username " + currentUsername)
        );

        Book book = new Book();
        book.setTitle(bookRequest.getTitle());
        book.setAuthor(bookRequest.getAuthor());
        book.setDescription(bookRequest.getDescription());
        book.setOwner(currentUser);
        book.setStatus(Status.AVAILABLE);

        bookRepo.save(book);

        return "Book added successfully by "+currentUsername;
    }

    @Override
    public String deleteBook(Long id) {
        if(bookRepo.existsById(id)){
        bookRepo.deleteById(id);
        return "Book deleted successfully with Id:"+id;
        }
        return "Book not found with Id:"+id;
    }

    @Override
    public BookResponse getBookById(Long id) {
        Book book =bookRepo.findById(id).orElseThrow(()-> new RuntimeException("Book not found with Id:"+id));
        BookResponse bookResponse = new BookResponse();

        bookResponse.setId(book.getId());
        bookResponse.setTitle(book.getTitle());
        bookResponse.setAuthor(book.getAuthor());
        bookResponse.setDescription(book.getDescription());
        bookResponse.setStatus(book.getStatus());
        bookResponse.setOwnerUsername(book.getOwner().getUsername());
        if(book.getBorrower() != null){
        bookResponse.setBorrowerUsername(book.getBorrower().getUsername());}

        return bookResponse;
    }

    @Override
    public String updateBook(BookRequest bookRequest,Long id) {
    Book previousBook = bookRepo.findById(id).orElseThrow(()-> new RuntimeException("Book not found with Id:"+id));

    previousBook.setTitle(bookRequest.getTitle());
    previousBook.setAuthor(bookRequest.getAuthor());
    previousBook.setDescription(bookRequest.getDescription());
    bookRepo.save(previousBook);
    return "Book updated successfully with Id:"+id;

    }

    @Override
    public String borrowBook(Long id) {
        String currentUsername= SecurityContextHolder.getContext().getAuthentication().getName();
        Users student = userRepo.findByUsername(currentUsername.trim()).orElseThrow(
                ()-> new RuntimeException("User not found with username " + currentUsername)
        );

        Book book = bookRepo.findById(id).orElseThrow(()-> new RuntimeException("Book not found with Id:"+id));


        if(book.getStatus().equals(Status.BORROWED)){
            throw new RuntimeException("Book is already borrowed by "+
            (book.getBorrower()!=null ? book.getBorrower().getUsername():"someone"));
        }

        book.setBorrower(student);
        book.setStatus(Status.BORROWED);
        bookRepo.save(book);
        return "You have successfully borrowed '"+book.getTitle()+"'";
    }

    @Override
    public String returnBook(Long id) {
        Book book = bookRepo.findById(id).orElseThrow(() -> new RuntimeException("Book not found with Id:" + id));

        if(book.getStatus().equals(Status.AVAILABLE)){
            throw new RuntimeException("Book is already available in the library");
        }

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if(!book.getBorrower().getUsername().equals(currentUsername)){
            throw new RuntimeException("You cannot return this book because you are not the borrower");
        }

        book.setBorrower(null);
        book.setStatus(Status.AVAILABLE);
        bookRepo.save(book);
        return "You have successfully returned '"+book.getTitle()+"'";
    }
}