import localQuotes from './local-quotes';
import dbQuotes from './db-quotes';

const quotes = {
  _userID: null,

  setUserID: (id) => {
    quotes._userID = id;
  },

  getAll: () => {
    quotes.merge(quotes._userID);

    return quotes._userID
      ? dbQuotes.getAll(quotes._userID)
      : localQuotes.getAll();
  },

  add: (quote) => {
    return quotes._userID
      ? dbQuotes.add(quotes._userID, quote)
      : localQuotes.add(quote);
  },

  update: (quote) => {
    return quotes._userID
      ? dbQuotes.update(quotes._userID, quote)
      : localQuotes.update(quote);
  },

  remove: (quote) => {
    return quotes._userID
      ? dbQuotes.remove(quotes._userID, quote)
      : localQuotes.remove(quote);
  },

  getByBookId: (bookId) => {
    return quotes._userID
      ? dbQuotes.getByBookId(quotes._userID, bookId)
      : localQuotes.getByBookId(bookId);
  },

  removeByBookId: (bookId) => {
    return quotes._userID
      ? dbQuotes.removeByBookId(quotes._userID, bookId)
      : localQuotes.removeByBookId(bookId);
  },

  merge: async (userID) => {
    if (userID) {
      const quotes = await localQuotes.getAll();
      const quotesObj = quotes.reduce((acc, quote) => {
        const {id, bookId, ...rest} = quote;
        const bookObj = acc[bookId] || {};
        return {
          ...acc,
          [bookId]: {
            ...bookObj,
            [id]: {
              text: rest.text,
              page: rest.page,
            },
          },
        };
      }, {});

      return dbQuotes.merge(userID, quotesObj);
    }
  },
};

export default quotes;
