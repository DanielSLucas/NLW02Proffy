import React, { useState, useCallback, useRef } from 'react';
import { View, TextInput, TextInputProps, Text } from 'react-native';

import styles from './sytles';

interface InputProps extends TextInputProps {
  placeholder: string;
  password?: boolean;
  first?: boolean;
  last?: boolean;
}

const CustomizedInput: React.FC<InputProps> = ({ placeholder, password, first, last, value, ...rest }) => {  
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if(value === "") {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [value]);

  return (
    <View style={[styles.container, first? styles.firstInput : {}, last? styles.lastInput : {}]}>
      {isFocused && <View style={styles.inputFocus}></View>}
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        {...rest}
      />
      <Text 
        style={[
          styles.label,
          isFocused || isFilled ? styles.focusedInputLabel : {}
        ]}
      >
        {placeholder}
      </Text>
    </View>
  );
}

export default CustomizedInput;