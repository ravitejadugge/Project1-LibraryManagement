package com.service;

import com.model.Book;
import com.model.User;
import org.hibernate.query.Query;

import java.util.List;

public interface BookService {
    List<Book> getBooks();

    List<Book> getBookById(int bookId);

    Book createBook(Book order);

    List<Book> getBookByName(String bookName);

    int getMostReadBookId();

    Book deleteBook(int bookId);

    List<User> getUserMostLent();
    List<User> getUsers();
    int lastAddedBooks();
    List<User> searchUsers(String key);
    List<Book> categoryWiseBooks();
}

