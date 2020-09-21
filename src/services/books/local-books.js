const uuidv4 = require('uuid/v4');

import storage from '../storage';

const KEY = 'quotes_app__books';

const localBooks = {
  getAll: async () => {
    const list = await storage.get(KEY);
    return list || [];
  },

  getByID: async (id) => {
    const list = await localBooks.getAll();
    return list.find((book) => book.id === id);
  },

  add: async (book) => {
    const list = await localBooks.getAll();
    list.push({...book, id: uuidv4()});

    return storage.store(KEY, list);
  },

  update: async (book) => {
    const list = await localBooks.getAll();
    const updatedList = list.map((item) => {
      if (item.id === book.id) {
        return book;
      }
      return item;
    });

    return storage.store(KEY, updatedList);
  },

  remove: async (id) => {
    const list = await localBooks.getAll();
    const updatedList = list.filter((item) => item.id !== id);

    return storage.store(KEY, updatedList);
  },
};

export default localBooks;
