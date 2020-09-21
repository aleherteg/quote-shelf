import React, {useState, createContext, useEffect, useContext} from 'react';

import BooksService from '../services/books';
import {AuthContext} from './auth';

export const BooksContext = createContext();

export const BooksProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {initialized, user} = useContext(AuthContext);

  const loadBooks = async () => {
    setLoading(true);
    const bookList = await BooksService.getAll();
    setBooks(bookList);
    setLoading(false);
  };

  useEffect(() => {
    if (initialized) {
      loadBooks();
    }
  }, [initialized, user]);

  const addBook = async (book) => {
    await BooksService.add(book);
    loadBooks();
  };

  const removeBook = async (bookId) => {
    await BooksService.remove(bookId);
    loadBooks();
  };

  const updateBook = async (book) => {
    await BooksService.update(book);
    loadBooks();
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        addBook,
        removeBook,
        updateBook,
        refresh: loadBooks,
      }}>
      {props.children}
    </BooksContext.Provider>
  );
};

export function withBooksContext(Component) {
  return function WrapperComponent(props) {
    return (
      <BooksContext.Consumer>
        {(state) => <Component {...props} {...state} />}
      </BooksContext.Consumer>
    );
  };
}
