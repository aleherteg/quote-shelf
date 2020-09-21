import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {SORT_OPTIONS} from '..';
import Spacer from '../../../components/Spacer';

const Modal = (props) => {
  const {onOptionPress, onClose} = props;
  return (
    <View style={styles.base}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onOptionPress(SORT_OPTIONS.BY_AUTHOR)}>
            <Text style={styles.buttonText}>Sort by Author</Text>
          </TouchableOpacity>
          <Spacer size={20} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onOptionPress(SORT_OPTIONS.BY_TITLE)}>
            <Text style={styles.buttonText}>Sorty by Title</Text>
          </TouchableOpacity>
          <Spacer size={20} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onOptionPress(SORT_OPTIONS.DEFAULT)}>
            <Text style={styles.buttonText}>Default</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Modal;
