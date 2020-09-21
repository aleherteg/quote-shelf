import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import styles from './styles';
import Spacer from '../../components/Spacer';
import IconButton from '../../components/icon-button';
import Modal from './Modal';
import {icons} from '../../assets';
import {colors} from '../../themes';

export const SORT_OPTIONS = {
  DEFAULT: 'default',
  BY_AUTHOR: 'author',
  BY_TITLE: 'title',
};

function compareByAuthor(item1, item2) {
  const author1 = item1.author.toUpperCase();
  const author2 = item2.author.toUpperCase();

  let comparison = 0;
  if (author1 > author2) {
    comparison = 1;
  } else if (author1 < author2) {
    comparison = -1;
  }
  return comparison;
}

function compareByTitle(item1, item2) {
  const title1 = item1.title.toUpperCase();
  const title2 = item2.title.toUpperCase();

  let comparison = 0;
  if (title1 > title2) {
    comparison = 1;
  } else if (title1 < title2) {
    comparison = -1;
  }
  return comparison;
}

const filterFlatList = (quotes, keyword, sortOption) => {
  let filtered = quotes;
  if (keyword) {
    filtered = quotes.filter((item) =>
      `${item.author} ${item.title} ${item.text}`
        .toLowerCase()
        .includes(keyword.toLowerCase()),
    );
  }

  if (sortOption === SORT_OPTIONS.BY_AUTHOR)
    return [...filtered].sort(compareByAuthor);
  if (sortOption === SORT_OPTIONS.BY_TITLE)
    return [...filtered].sort(compareByTitle);
  if (sortOption === SORT_OPTIONS.DEFAULT) return filtered;
};

const Quote = ({
  text,
  page,
  onDelete,
  isFavorite,
  updateFavorites,
  book,
  author,
  title,
}) => {
  const imageSource = isFavorite ? icons.filledHeart : icons.heart;
  if (book) {
    return (
      <View style={styles.quoteContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={updateFavorites}>
          <Image style={styles.favoriteImage} source={imageSource} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onDelete}>
          <Image style={styles.closeImage} source={icons.close} />
        </TouchableOpacity>
        <Text style={styles.quoteText}>{text}</Text>
        <Spacer size={10} />
        <Text style={styles.pageText}>page {page}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.quoteContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={updateFavorites}>
          <Image style={styles.favoriteImage} source={imageSource} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onDelete}>
          <Image style={styles.closeImage} source={icons.close} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <Text>{author}</Text>
        <Spacer size={10} />
        <Text style={styles.quoteText}>{text}</Text>
        <Spacer size={10} />
        <Text style={styles.pageText}>page {page}</Text>
      </View>
    );
  }
};

const renderSeparator = () => {
  return <Spacer size={15} />;
};

const Quotes = (props) => {
  const {
    navigation,
    route,
    getQuotesByBookId,
    quotes,
    removeQuote,
    updateQuote,
    loading: quotesLoading,
  } = props;
  const book = route?.params?.book;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const searchRef = useRef(null);

  const filteredData = useMemo(
    () => filterFlatList(data, searchValue, sortOption),
    [data, searchValue, sortOption],
  );

  const getBookQuotes = async () => {
    if (book) {
      setLoading(true);
      const quotesList = await getQuotesByBookId(book.id);
      setData(quotesList);
      setLoading(false);
    }
  };

  const onDelete = (quote) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this quote?',
      [
        {
          text: 'Delete',
          onPress: () => removeQuote(quote),
        },
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (book) {
      getBookQuotes();
    } else {
      setData(quotes);
    }
  }, [quotes]);

  const updateFavorites = ({author, title, ...rest}) => {
    updateQuote({
      ...rest,
      isFavorite: !rest.isFavorite,
    });
  };

  const renderQuote = ({item}) => (
    <Quote
      text={item.text}
      page={item.page}
      author={item.author}
      title={item.title}
      isFavorite={item.isFavorite}
      book={book}
      onDelete={() => onDelete(item)}
      updateFavorites={() => updateFavorites(item)}
    />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={() => {
              navigation.navigate('Quote', {book: book});
            }}
            source={icons.plus}
          />
        );
      },
    });
  });

  const displaySearch = () => {
    if (!searchValue) {
      setVisibleSearch(!visibleSearch);
    } else {
      setVisibleSearch(true);
    }
  };

  const hideSearch = () => {
    setVisibleSearch(false);
  };

  const onBlur = () => {
    if (!searchValue) {
      hideSearch();
    }
  };

  useEffect(() => {
    if (visibleSearch && searchRef.current?.focus) {
      searchRef.current.focus();
    }
  }, [visibleSearch]);

  if (loading || quotesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const renderEmptyState = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No quotes yet...</Text>
      </View>
    );
  };

  return (
    <View style={styles.base}>
      {book ? null : (
        <View style={styles.topBar}>
          <IconButton
            iconStyle={styles.iconStyle}
            onPress={displaySearch}
            source={icons.search}
          />
          <View style={styles.buttonsContainer}>
            <IconButton
              iconStyle={styles.iconStyle}
              onPress={() => setVisibleModal(true)}
              source={icons.sort}
            />
            <IconButton
              onPress={() => {
                navigation.navigate('Quote');
              }}
              source={icons.plus}
            />
          </View>
        </View>
      )}
      {visibleSearch && (
        <SearchBar
          ref={searchRef}
          platform="android"
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          clearIcon={styles.icon}
          searchIcon={styles.icon}
          cancelIcon={styles.icon}
          placeholder="Search by author or book title"
          onChangeText={setSearchValue}
          value={searchValue}
          onBlur={onBlur}
        />
      )}
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={filteredData}
        renderItem={renderQuote}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(_item, index) => `${index}`}
        ListEmptyComponent={renderEmptyState}
      />
      {visibleModal && (
        <Modal
          onClose={() => setVisibleModal(false)}
          onOptionPress={(option) => {
            setSortOption(option);
            setVisibleModal(false);
          }}
        />
      )}
    </View>
  );
};

export default Quotes;
