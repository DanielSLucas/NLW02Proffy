import React, { useState, useCallback, useRef, RefObject, forwardRef } from 'react';
import { View, TextInput, TextInputProps, Text, TouchableOpacity, Image } from 'react-native';

import eyeIcon from '../../assets/images/icons/eye.png';
import closedEyeIcon from '../../assets/images/icons/closedEye.png';

import styles from './sytles';

interface InputProps extends TextInputProps {
  placeholder: string;
  password?: boolean;
  first?: boolean;
  last?: boolean;
  isPassword?: boolean;
}

const CustomizedInput: React.ForwardRefRenderFunction<TextInput, InputProps> = 
  ({ placeholder, password, first, last, value, isPassword, ...rest }, ref) => {  
  
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(isPassword)

  const toggleShowPassowd = useCallback((event) => {
    setShowPassword(!showPassword);

    if (!showPassword) {
      setIsPasswordInput(false)
    } else {
      setIsPasswordInput(true)
    }

  }, [showPassword]);
  
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
        ref={ref}
        style={styles.input}
        secureTextEntry={isPasswordInput}
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

      { isPassword && 
        <TouchableOpacity 
          style={styles.eyeButton}
          onPress={toggleShowPassowd}
        >
          { 
            showPassword
            ? <Image  source={closedEyeIcon} />
            : <Image  source={eyeIcon} />
          }  
        </TouchableOpacity>
      }

    </View>
  );
}

export default forwardRef(CustomizedInput);