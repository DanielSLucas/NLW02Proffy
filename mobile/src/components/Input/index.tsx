import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import styles from './styles';

interface InputProps extends TextInputProps {
  label: string;
  isTel?: boolean;
}

const Input: React.FC<InputProps> = ({label, style, isTel,...rest}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      { isTel
        ? (
          <TextInputMask 
            type={"cel-phone"} 
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)'
            }}
            style={[styles.input, style]} 
            {...rest}
          />
        )
        : (<TextInput style={[styles.input, style]} {...rest} />)
      }
    </View>
  );
};

export default Input;