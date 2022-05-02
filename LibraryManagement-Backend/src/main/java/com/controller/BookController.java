package com.controller;

import com.model.Book;
import com.model.User;
import com.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;


@RestController
@CrossOrigin(origins = "*")
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/get")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @RequestMapping("/get/{id}")
    public List<Book> getBookById(@PathVariable("id") int bookId) {
        return bookService.getBookById(bookId);
    }

    @PostMapping("/create")
    public Book createBook(@RequestBody Book book) {
        Random random = new Random();
        int number = random.nextInt(999999);
        book.setStock(1);
        book.setBookId(number);
        bookService.createBook(book);
        return book;
    }

    @RequestMapping("/getMostReadBook")
    public List<Book> mostReadBookId() {
        int bookId = bookService.getMostReadBookId();
        List<Book> bookList = bookService.getBookById(bookId);
        return bookList;
    }

    @RequestMapping("/searchBookName/{bookName}")
    public List<Book> SearchBookName(@PathVariable("bookName") String bookName) {
        return bookService.getBookByName(bookName);
    }

    @DeleteMapping("delete/{id}")
    public Book deleteBook(@PathVariable("id") int bookId){
        return bookService.deleteBook(bookId);
    }

    @DeleteMapping("deleteuser/{id}")
    public User deleteUserById(@PathVariable("id") int id){
        return bookService.deleteUserById(id);
    }

    @RequestMapping("/getUser")
    public List<User> getUsers() {
        return bookService.getUsers();
    }

    @RequestMapping("/getUser/{key}")
    public List<User> getUsers(@PathVariable("key") String key) {
        return bookService.searchUsers(key);
    }

    @RequestMapping("/totalUsers")
    public int totalUsers(){
       List<User> userList =  bookService.getUsers();
        return  userList.size();
    }
    @RequestMapping("/totalBooks")
    public int totalBooks(){
        List<Book> userList =  bookService.getBooks();
        return  userList.size();
    }

    @RequestMapping("/lastaddedBooks")
    public int lastAddedBooks(){
        return bookService.lastAddedBooks();
    }

    @RequestMapping("/categoryWiseBooks")
    public  List<Book> categoryWiseBooks() {
        return  bookService.categoryWiseBooks();
    }

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {

        Random random = new Random();
        int number = random.nextInt(999999);
        user.setUserId(number);

        if(user.getImage()==null){
            user.setImage("https://picsum.photos/225");
        }

        return bookService.createUser(user);
    }

}
