import React from 'react';
import { TextInput, View, Text } from 'react-native';

import styles from './styles';

const Input = (props) => {
  const { inputRef, onFocus, onChange, label, value, ...rest } = props;

  const onInputFocus = () => {
    if (onFocus) {
      onFocus();
    }
  }

  const onChangeText = (text) => {
    if (onChange) {
      onChange(text);
    }
  }

  return (
    <View style={styles.base}>
      {
        label ?
          (
            <Text style={styles.label}>
              {label}
            </Text>
          ) : null
      }

      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onFocus={onInputFocus}
          onChangeText={onChangeText}
          value={value}
          {...rest}
        />
      </View>
    </View>
  );
}

export default Input;
