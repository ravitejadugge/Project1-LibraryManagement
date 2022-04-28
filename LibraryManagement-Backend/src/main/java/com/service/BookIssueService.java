package com.service;

import com.model.BookIssue;

import java.util.List;

public interface BookIssueService {
    List<BookIssue> getIssuedBooks();

    List<BookIssue> getIssuedBookAnyID(String issueId);

    BookIssue crateIssueBook(BookIssue bookIssue);

    BookIssue updateIssueBook(BookIssue bookIssue);

    List<BookIssue> getIssuedBookByBookId(int bookId);

     List<BookIssue> getTotalFine();
     List<BookIssue> bookIssuedToday();
     List<BookIssue> issuedBooksMonthly();
}

