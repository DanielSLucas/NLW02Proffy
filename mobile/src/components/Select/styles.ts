import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  input: {
    height: 56,
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
  },

  dropDownStyle: {
    backgroundColor: '#F8F8FC',
  },

  placeholderStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#C1BCCC"
  },

  option: {
    justifyContent: "flex-start",
    borderBottomColor: "#E6E6F0",
    borderBottomWidth: 1,
  },

  activeOption: {
    borderLeftWidth: 1,
    borderLeftColor: "#8257E5",
    backgroundColor: "#EBEBF5",
  },

  optionLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A6180",
    marginLeft: 10,
  },
});

export default styles;