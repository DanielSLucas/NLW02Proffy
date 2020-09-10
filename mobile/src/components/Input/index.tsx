import React from 'react';

import styles from './styles';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({label, style, ...rest}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput 
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
};

export default Input;