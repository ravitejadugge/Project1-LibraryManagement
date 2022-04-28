package com.service;

import com.model.BookIssue;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service("database2")
public class BookIssueServiceImpl implements BookIssueService {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<BookIssue> getIssuedBooks() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        List<BookIssue> bookIssueList = session.createQuery("from BookIssue B ORDER BY B.isReturned ASC", BookIssue.class).list();
        transaction.commit();
        session.close();
        return bookIssueList;
    }

    @Override
    public List<BookIssue> getIssuedBookAnyID(String key) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("FROM BookIssue B WHERE B.isReturned LIKE :key OR B.issueId LIKE :key  OR B.bookId LIKE :key OR B.userId LIKE :key OR B.issueDate LIKE :key OR B.returnDate LIKE :key ");
        query.setParameter("key", "%" + key + "%");
        List<BookIssue> bookIssueList = query.list();
        transaction.commit();
        session.close();
        return bookIssueList;
    }


    @Override
    public BookIssue crateIssueBook(BookIssue bookIssue) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(bookIssue);
        transaction.commit();
        session.close();
        return bookIssue;
    }

    @Override
    public BookIssue updateIssueBook(BookIssue bookIssue) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.update(bookIssue);
        transaction.commit();
        session.close();
        return bookIssue;
    }

    @Override
    public List<BookIssue> getIssuedBookByBookId(int issueId) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT B FROM BookIssue B WHERE B.issueId = :issueId ");
        query.setParameter("issueId", issueId);
        List<BookIssue> bookIssueList = query.list();
        transaction.commit();
        session.close();
        return bookIssueList;
    }

    @Override
    public List<BookIssue> getTotalFine() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT SUM(fine) FROM BookIssue ");
        List<BookIssue> bookIssueList = query.list();
        transaction.commit();
        session.close();
        return bookIssueList;
    }

    @Override
    public List<BookIssue> bookIssuedToday() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        LocalDate date = LocalDate.now();
        Query query = session.createQuery("FROM BookIssue B WHERE B.issueDate = :date ");
        query.setParameter("date", java.sql.Date.valueOf(date));
        List<BookIssue> bookIssueList = query.list();
        transaction.commit();
        session.close();
        return bookIssueList;
    }


    @Override
     public  List<BookIssue> issuedBooksMonthly() {
         Session session = sessionFactory.openSession();
         Transaction transaction = session.beginTransaction();
         Query query = session.createNativeQuery("SELECT DATE_FORMAT(LAST_DAY(issue_date), '%M %Y') month,\n" +
                 "COUNT(issue_date) counter\n" +
                 "FROM issuedBook \n" +
                 "WHERE  issue_date >= NOW() - INTERVAL 1 YEAR \n" +
                 "GROUP BY month, LAST_DAY(issue_date)\n" +
                 "ORDER BY LAST_DAY(issue_date); ");
         List<BookIssue> bookIssueList = query.list();
         transaction.commit();
         session.close();
         return bookIssueList;
     }
}
