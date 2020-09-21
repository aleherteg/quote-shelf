import React from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';

import Spacer from '../../components/Spacer';
import Loading from '../../components/Loading';

import {icons} from '../../assets';

import styles from './styles';

const Book = ({title, author, onPress, onEditPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
      <Image style={styles.editIcon} source={icons.edit} />
    </TouchableOpacity>

    <View style={styles.itemContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  </TouchableOpacity>
);

const renderSeparator = () => {
  return <Spacer size={20} />;
};

const Books = (props) => {
  const {books, loading, navigation} = props;

  const renderBook = ({item}) => (
    <Book
      title={item.title}
      author={item.author}
      onPress={() => navigation.navigate('Quotes', {book: item})}
      onEditPress={() => navigation.navigate('Book', {book: item})}
    />
  );

  if (loading) {
    return <Loading />;
  }

  if (!books?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No books yet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.base}>
      <FlatList
        data={books}
        renderItem={renderBook}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(_item, index) => `${index}`}
      />
    </View>
  );
};

export default Books;
