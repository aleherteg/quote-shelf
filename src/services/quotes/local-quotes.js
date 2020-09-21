const uuidv4 = require('uuid/v4');

import storage from '../storage';
import localBooks from '../books/local-books';

const KEY = 'quotes_app__quotes';

const quotes = {
  getAll: async () => {
    const list = (await storage.get(KEY)) || [];
    const updatedList = await Promise.all(
      list.map(async (quote) => {
        const book = await localBooks.getByID(quote.bookId);
        return {...quote, author: book?.author, title: book?.title};
      }),
    );
    return updatedList;
  },

  add: async (quote) => {
    const list = await quotes.getAll();
    list.push({...quote, id: uuidv4()});

    return storage.store(KEY, list);
  },

  update: async (quote) => {
    const list = await quotes.getAll();
    const updatedList = list.map((item) => {
      if (item.id === quote.id) {
        return quote;
      }
      return item;
    });

    return storage.store(KEY, updatedList);
  },

  remove: async (quote) => {
    const {id} = quote;
    const list = await quotes.getAll();
    const updatedList = list.filter((item) => item.id !== id);

    return storage.store(KEY, updatedList);
  },

  getByBookId: async (bookId) => {
    const list = await quotes.getAll();
    return list.filter((item) => item.bookId === bookId);
  },

  removeByBookId: async (bookId) => {
    const list = await quotes.getAll();
    const updatedList = list.filter((item) => item.bookId !== bookId);

    return storage.store(KEY, updatedList);
  },
};

export default quotes;
