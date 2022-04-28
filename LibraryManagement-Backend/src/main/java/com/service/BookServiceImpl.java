package com.service;

import com.model.Book;
import com.model.BookIssue;
import com.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service("database")
public class BookServiceImpl implements BookService {
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Book> getBooks() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        List<Book> bookList = session.createQuery("from Book", Book.class).list();
        transaction.commit();
        session.close();
        return bookList;
    }

    @Override
    public List<User> getUsers() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        List<User> userList = session.createQuery("from User", User.class).list();
        transaction.commit();
        session.close();
        return userList;
    }



    @Override
    public List<Book> getBookById(int book) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT B FROM Book B WHERE B.bookId =:book ");
        query.setParameter("book", book);
        List<Book> bookList = query.list();
        System.out.println(query);
        return bookList;
    }

    @Override
    public Book createBook(Book book) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(book);
        transaction.commit();
        session.close();
        return book;
    }

    @Override
    public int getMostReadBookId() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("  SELECT  bookId FROM BookIssue GROUP BY bookId   ORDER BY COUNT(*) DESC  ");
        List<Integer> bookList = query.list();
        System.out.println(bookList);
        int bookId = bookList.get(0);
        transaction.commit();
        session.close();
        return bookId;
    }

    @Override
    public List<Book> getBookByName(String bookName) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT B FROM Book B WHERE B.bookName LIKE :search OR  B.author LIKE :search Or B.category LIKE :search or B.bookId LIKE :search or B.shelfNumber LIKE :search ");
        query.setParameter("search", "%" + bookName + "%");
        List<Book> bookList = query.list();
        transaction.commit();
        session.close();
        return bookList;
    }

    @Override
    public List<User> getUserMostLent() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT  userId FROM BookIssue GROUP BY userId   ORDER BY COUNT(*) DESC  ");
        List<Integer> userList = query.list();
        System.out.println(userList);
        int userId = userList.get(0);
        Query query1 = session.createQuery("from User where userId=:userId");
        query1.setParameter("userId", userId);
        List<User> userList1 = query1.list();
        transaction.commit();
        session.close();
        return userList1;
    }



    @Override
    public Book deleteBook(int bookId) {
        Session session= sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Book book = session.get(Book.class,bookId);
        session.delete(book);
        transaction.commit();
        session.close();
        return book;
    }


    @Override
    public int lastAddedBooks() {
        Session session= sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("FROM Book AS B WHERE B.issueDate BETWEEN :before AND :today");
        LocalDate today = LocalDate.now();
        LocalDate d2 = today.minusDays(30);
        java.sql.Date.valueOf(today);
        query.setParameter("today", java.sql.Date.valueOf(today));
        query.setParameter("before", java.sql.Date.valueOf(d2));
        System.out.println(query.list());
        transaction.commit();
        session.close();
        return 0;
    }

    @Override
    public List<User> searchUsers(String key) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("SELECT U FROM User U WHERE U.username LIKE :search OR  U.userId LIKE :search Or U.dob LIKE :search or U.mobile LIKE :search or U.address LIKE :search ");
        query.setParameter("search", "%" + key + "%");
        List<User> bookList = query.list();
        transaction.commit();
        session.close();
        return bookList;
    }

    @Override
    public List<Book> categoryWiseBooks() {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createNativeQuery("select distinct(category) , count(id) from book group by category;");
        List<Book> bookList = query.list();
        transaction.commit();
        session.close();
        return bookList;
    }
}
