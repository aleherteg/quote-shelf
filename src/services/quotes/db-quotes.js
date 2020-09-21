import database from '@react-native-firebase/database';
const uuidv4 = require('uuid/v4');
const deepMerge = require('lodash.merge');

import dbBooks from '../books/db-books';

const REF_KEY = '/quotes';

const dbQuotes = {
  getAll: async (userID) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}`);
    const snapshot = await dbRef.once('value');
    const snapshotValue = snapshot.val() || {};

    return Object.keys(snapshotValue).reduce(async (acc, bookId) => {
      const bookQuotes = snapshotValue[bookId];
      const bookData = await dbBooks.getByID(userID, bookId);

      if (!bookQuotes) {
        return acc;
      }

      return [
        ...(await acc),
        ...Object.keys(bookQuotes).map((id) => ({
          ...bookQuotes[id],
          id,
          bookId,
          author: bookData?.author,
          title: bookData?.title,
        })),
      ];
    }, []);
  },

  add: (userID, quote) => {
    const quoteID = uuidv4();
    const {bookId: bookID, ...rest} = quote;
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}/${quoteID}`);
    return dbRef.set(rest);
  },

  update: (userID, quote) => {
    const {id: quoteID, bookId: bookID, ...rest} = quote;
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}/${quoteID}`);
    return dbRef.update(rest);
  },

  remove: (userID, quote) => {
    const {id: quoteID, bookId: bookID} = quote;
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}/${quoteID}`);
    return dbRef.remove();
  },

  getByBookId: async (userID, bookId) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookId}`);
    const snapshot = await dbRef.once('value');
    const snapshotValue = snapshot.val() || {};
    return Promise.all(
      Object.keys(snapshotValue).map(async (id) => {
        const bookData = await dbBooks.getByID(userID, bookId);
        return {
          ...snapshotValue[id],
          id,
          bookId,
          author: bookData?.author,
          title: bookData?.title,
        };
      }),
    );
  },

  removeByBookId: async (userID, bookId) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookId}`);
    return dbRef.remove();
  },

  merge: async (userID, localQuotes) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}`);
    const snapshot = await dbRef.once('value');
    const dbQuotes = snapshot.val() || {};

    const mergedQuotes = deepMerge(localQuotes, dbQuotes);

    return dbRef.update(mergedQuotes);
  },
};

export default dbQuotes;
