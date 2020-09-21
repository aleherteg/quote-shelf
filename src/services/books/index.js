import localBooks from './local-books';
import dbBooks from './db-books';

const books = {
  _userID: null,

  setUserID: (id) => {
    books._userID = id;
  },

  getAll: () => {
    return books._userID ? dbBooks.getAll(books._userID) : localBooks.getAll();
  },

  add: (book) => {
    return books._userID
      ? dbBooks.add(books._userID, book)
      : localBooks.add(book);
  },

  update: (book) => {
    return books._userID
      ? dbBooks.update(books._userID, book)
      : localBooks.update(book);
  },

  remove: (bookID) => {
    return books._userID
      ? dbBooks.remove(books._userID, bookID)
      : localBooks.remove(bookID);
  },

  merge: async (userID) => {
    if (userID) {
      const books = await localBooks.getAll();
      const booksObj = books.reduce((acc, book) => {
        const {id, ...rest} = book;
        return {
          ...acc,
          [id]: rest,
        };
      }, {});

      return dbBooks.merge(userID, booksObj);
    }
  },
};

export default books;
