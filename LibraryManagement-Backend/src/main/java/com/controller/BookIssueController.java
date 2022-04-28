package com.controller;

import com.model.Book;
import com.model.BookIssue;
import com.model.User;
import com.service.BookIssueService;
import com.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BookIssueController {
    @Autowired
    private BookIssueService bookIssueService;

    @Autowired
    private BookService bookService;

    @RequestMapping("/bookIssue")
    public List<BookIssue> bookIssueDetails() {
        List<BookIssue> bookIssueList = bookIssueService.getIssuedBooks();
        return bookIssueList;
    }


    @PostMapping(value = "/issueHandleForm")
    public BookIssue handleForm(@RequestBody BookIssue bookIssue) {
        List<Book> bookList = bookService.getBookById(bookIssue.getBookId());

        BookIssue bookIssueList = null;

        if (bookList.get(0).getStock() > 0) {
            bookList.get(0).setStock(bookList.get(0).getStock() - 1);
            bookService.createBook(bookList.get(0));
            Date d = bookIssue.getIssueDate();
            LocalDate date = LocalDate.parse(d.toString());
            LocalDate return_Date = date.plusDays(15);
            bookIssue.setReturnDate(java.sql.Date.valueOf(return_Date));

            bookIssueList = bookIssueService.crateIssueBook(bookIssue);
        }
        return bookIssueList;
    }

    @PutMapping("/renewFormHandle")
    public BookIssue renewFormHandle(@RequestBody BookIssue bookIssue) {
        BookIssue bookIssue1 = bookIssueService.crateIssueBook(bookIssue);
        return bookIssue1;
    }

    @RequestMapping("/bookIssues/{id}")
    public List<BookIssue> getBookIssueByKey(@PathVariable("id") String id) {
        System.out.println(id);
        return bookIssueService.getIssuedBookAnyID(id);
    }

    @RequestMapping("/bookIssues")
    public List<BookIssue> bookIssuesDetails() {
        List<BookIssue> bookIssueList = bookIssueService.getIssuedBooks();
        return bookIssueList;
    }

    @RequestMapping("/bookIssue/{id}")
    public List<BookIssue> bookIssuedByBookId(@PathVariable("id") int id) {
        return bookIssueService.getIssuedBookByBookId(id);
    }

    @RequestMapping(value = "/issueFineHandleForm", method = RequestMethod.PUT)
    public BookIssue handleFineForm(@RequestBody BookIssue bookIssue) {
        System.out.println(bookIssue);
        Book book = null;
        int bookId = bookIssue.getBookId();
        List<Book> bookList = bookService.getBookById(bookId);
        Book book1 = new Book();
        book1.setBookId(bookList.get(0).getBookId());
        book1.setStock(bookList.get(0).getStock() + 1);
        book1.setId(bookList.get(0).getId());
        book1.setAuthor(bookList.get(0).getAuthor());
        book1.setBookName(bookList.get(0).getBookName());
        book1.setCategory(bookList.get(0).getCategory());
        book1.setShelfNumber(bookList.get(0).getShelfNumber());
        bookService.createBook(book1);
        return bookIssueService.crateIssueBook(bookIssue);
    }

    @RequestMapping(value = "/getMostReadUser", method = RequestMethod.GET)
    public List<User> getMostReadUser() {
        return bookService.getUserMostLent();
    }

    @RequestMapping("/totalFine")
    public List<BookIssue> totalFine() {
        return bookIssueService.getTotalFine();
    }
    @RequestMapping("/bookissuedtoday")
    public int bookIssuedToday() {
        return bookIssueService.bookIssuedToday().size();
    }

    @RequestMapping("/issuedBooksMonthly")
    public List<BookIssue> issuedBooksMonthly() {
        return bookIssueService.issuedBooksMonthly();
    }




}
