import database from '@react-native-firebase/database';
const uuidv4 = require('uuid/v4');

const REF_KEY = '/books';

const dbBooks = {
  getAll: async (userID) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}`);
    const snapshot = await dbRef.once('value');
    const snapshotValue = snapshot.val() || {};
    const bookList = Object.keys(snapshotValue).map((id) => ({
      id,
      ...snapshotValue[id],
    }));

    return bookList;
  },

  getByID: async (userID, id) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}/${id}`);
    const snapshot = await dbRef.once('value');
    const book = snapshot.val() || {};

    return {
      ...book,
      id,
    };
  },

  add: (userID, book) => {
    const bookID = uuidv4();
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}`);
    return dbRef.set(book);
  },

  update: (userID, book) => {
    const {id: bookID, ...rest} = book;
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}`);
    return dbRef.update(rest);
  },

  remove: (userID, bookID) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}/${bookID}`);
    return dbRef.remove();
  },

  merge: async (userID, localBooks) => {
    const dbRef = database().ref(`${REF_KEY}/${userID}`);
    const snapshot = await dbRef.once('value');
    const dbBooks = snapshot.val() || {};

    const mergedBooks = {
      ...localBooks,
      ...dbBooks,
    };

    return dbRef.update(mergedBooks);
  },
};

export default dbBooks;
