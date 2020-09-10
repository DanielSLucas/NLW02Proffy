import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f7',
    flex: 1,
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular'
  },

  input: {
    height: 54,
    backgroundColor: '#FAFAFC',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
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

  inputGroup: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },

  inputBlock: {
    width: '48%',
  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },
});

export default styles;