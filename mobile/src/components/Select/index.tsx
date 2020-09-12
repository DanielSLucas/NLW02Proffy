import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';
import { View, Text, StyleProp, TextStyle, Platform } from 'react-native';

interface SelectProps extends DropDownPicker {
  label: string;
  labelStyles?: StyleProp<TextStyle>
}

const Select: React.FC<SelectProps> = ({ label, labelStyles, ...rest }) => {
  return (
    <View style={Platform.OS !== 'android' && {zIndex: 10}}>
      <Text style={[styles.label, labelStyles]}>{label}</Text>
      <DropDownPicker
        style={styles.input}
        containerStyle={{ height: 74 }}
        dropDownStyle={styles.dropDownStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.optionLabel}
        itemStyle={styles.option}
        activeItemStyle={styles.activeOption}
        {...rest}
      />
    </View>
  );
}

export default Select;