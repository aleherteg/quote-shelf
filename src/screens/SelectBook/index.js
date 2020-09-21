import React, {useContext, useState, useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';

import Spacer from '../../components/Spacer';
import {BooksContext} from '../../context/books';

import styles from './styles';

const SelectBook = (props) => {
  const {navigation, route} = props;
  const onSelectBook = route?.params?.onSelectBook;
  const [searchValue, setSearchValue] = useState('');

  const {books} = useContext(BooksContext);

  const data = useMemo(
    () =>
      books.filter((item) =>
        `${item.author} ${item.title}`
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    [data?.length, searchValue],
  );

  const renderBook = ({item}) => {
    return (
      <View style={styles.base}>
        <TouchableOpacity
          style={styles.bookContainer}
          onPress={() => {
            onSelectBook(item);
            navigation.goBack();
          }}>
          <Text style={styles.bookTitleText}>{item.title}</Text>
          <Text style={styles.bookAuthorText}>{item.author}</Text>
        </TouchableOpacity>
        <Spacer size={8} />
      </View>
    );
  };

  return (
    <View style={styles.base}>
      <SearchBar
        platform="android"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        clearIcon={styles.searchIcon}
        searchIcon={styles.searchIcon}
        cancelIcon={styles.searchIcon}
        placeholder="Search by author or book title"
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={renderBook}
        keyExtractor={(_item, index) => `${index}`}
      />
    </View>
  );
};

export default SelectBook;
