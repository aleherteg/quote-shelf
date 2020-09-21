import React, {useLayoutEffect, useState, useContext} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import NavButton from '../../components/nav-button';
import Input from '../../components/input';
import SubmitButton from '../../components/submit-button';

import styles from './styles';
import {QuotesContext} from '../../context/quotes';

const Book = (props) => {
  const {navigation, route, addBook, removeBook, updateBook} = props;
  const book = route?.params?.book;

  const [title, setTitle] = useState(book?.title);
  const [author, setAuthor] = useState(book?.author);
  const [image, setImage] = useState(book?.image);
  const quotesContext = useContext(QuotesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (book) {
          return (
            <NavButton
              onPress={async () => {
                await quotesContext.removeByBookId(book.id);
                removeBook(book.id);
                navigation.goBack();
              }}
              text="Delete"
              textStyle={styles.deleteText}
            />
          );
        }
      },
      title: book ? 'Edit Book' : 'New Book',
    });
  }, []);

  const validateInput = (title, author) => {
    let ok = 1;
    if (title === null || title === undefined || title === '') {
      Alert.alert(
        'Invalid input',
        'You must enter a title!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      ok = 0;
    } else {
      if (author === null || author === undefined || author === '') {
        Alert.alert(
          'Invalid input',
          'You must enter an author!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
        ok = 0;
      }
    }
    return ok;
  };

  const onSubmit = async () => {
    const ok = validateInput(title, author);

    if (ok === 1) {
      if (book) {
        await updateBook({
          ...book,
          title,
          author,
          image,
        });

        quotesContext.refresh();
      } else {
        addBook({title, author, image});
      }
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View>
        <Input label="Title" value={title} onChange={setTitle} />
        <Input label="Author" value={author} onChange={setAuthor} />
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton onPress={onSubmit} text="Done" />
      </View>
    </ScrollView>
  );
};

export default Book;
