import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';

import NavButton from '../../components/nav-button';
import Spacer from '../../components/Spacer';
import Line from '../../components/Line';
import SubmitButton from '../../components/submit-button';

import textDetector from '../../services/text-detecor';
import image from '../../services/image';

import styles from './styles';

const Quote = (props) => {
  const {navigation, route, addQuote} = props;
  const givenBook = route?.params?.book;

  const [text, setText] = useState('');
  const [page, setPage] = useState(-1);
  const [book, setBook] = useState();

  const getTextFromImage = async () => {
    const imgURI = await image.select();
    const detectedText = await textDetector.detect(imgURI);
    setText(detectedText);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <NavButton onPress={getTextFromImage} text="Scan" />;
      },
    });
  }, []);

  const onSubmit = () => {
    const ok = ValidateInput(page, text);
    if (ok) {
      if (givenBook) {
        addQuote({
          text,
          page,
          bookId: givenBook.id,
        });
        navigation.goBack();
      } else {
        addQuote({
          text,
          page,
          bookId: book.id,
        });
        navigation.goBack();
      }
    }
  };

  const ValidateInput = (pageNumber, text) => {
    let ok = true;

    if (!text.trim()) {
      Alert.alert(
        'Invalid input',
        'You must enter some text for the quote!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      ok = false;
    } else if (!book && !givenBook) {
      Alert.alert(
        'Invalid input',
        'You must choose a book!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      ok = false;
    } else if (!page || page < 0) {
      Alert.alert(
        'Invalid input',
        'You must enter a positive number for page!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      ok = false;
    }

    return ok;
  };

  return (
    <View style={styles.base}>
      {givenBook ? (
        <>
          <Text style={styles.titleText}>{givenBook.title}</Text>
          <Line marginHorizontal={20} marginVertical={5} size={0.5} />
          <Spacer size={20} />
        </>
      ) : null}

      <TextInput
        style={styles.textInput}
        multiline={true}
        onChangeText={setText}
        value={text}
      />
      {givenBook ? null : (
        <>
          <Spacer size={20} />
          <View style={styles.selectBookContainer}>
            <Text style={styles.label}>Book</Text>
            <Spacer size={20} />
            <TouchableOpacity
              style={styles.selectBook}
              onPress={() => {
                navigation.navigate('SelectBook', {
                  onSelectBook: (selectedBook) => setBook(selectedBook),
                });
              }}>
              <Text
                style={[
                  styles.selectBookText,
                  book ? null : styles.placeholder,
                ]}>
                {book ? book.title : 'Please Select a Book'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Spacer size={20} />
      <View style={styles.pageNumberContainer}>
        <Text style={styles.label}>Page</Text>
        <Spacer size={20} />
        <TextInput
          style={styles.pageInput}
          onChangeText={setPage}
          keyboardType={'number-pad'}
          value={page}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton onPress={onSubmit} text="Submit" />
      </View>
    </View>
  );
};

export default Quote;
