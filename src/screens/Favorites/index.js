import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Spacer from '../../components/Spacer';

import {icons} from '../../assets';
import {colors} from '../../themes';

import styles from './styles';

const Quote = ({text, author, title, onPress}) => {
  return (
    <View style={styles.quoteContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.favoriteButton} onPress={onPress}>
          <Image style={styles.favoriteImage} source={icons.filledHeart} />
        </TouchableOpacity>
        <View>
          <Text style={styles.titleText}>{title} </Text>
          <Text>{author} </Text>
        </View>
      </View>
      <Spacer size={15} />
      <Text style={styles.quoteText}>{text}</Text>
    </View>
  );
};

const renderSeparator = () => {
  return <Spacer size={15} />;
};

const Favorites = (props) => {
  const {loading, favoriteQuotes, updateQuote} = props;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const onPress = async ({author, title, ...rest}) => {
    await updateQuote({
      ...rest,
      isFavorite: !rest.isFavorite,
    });
  };

  if (!favoriteQuotes?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favourite quotes yet...</Text>
      </View>
    );
  }

  const renderFavoriteQuote = ({item}) => (
    <Quote
      text={item.text}
      author={item.author}
      title={item.title}
      onPress={() => onPress(item)}
    />
  );

  return (
    <FlatList
      style={styles.base}
      contentContainerStyle={styles.listContent}
      data={favoriteQuotes}
      renderItem={renderFavoriteQuote}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(_item, index) => `${index}`}
    />
  );
};

export default Favorites;
