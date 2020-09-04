import React from 'react'
import { Text } from 'react-native';

import styles from './styles';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';


const Button: React.FC<RectButtonProperties> = ({ children, enabled, style, ...rest }) => {
  return(
    <RectButton   
      enabled={enabled}
      {...rest}
      style={[styles.button, !enabled ? styles.buttonDisabled : style ]}
    >
      <Text 
        style={[styles.buttonText, !enabled ? styles.buttonDisabledText: {}]}
      > 
        {children}
      </Text>
    </RectButton>
  )
};

export default Button;