import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 311,
    height: 56,
    backgroundColor: "#04D361",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },

  buttonDisabled: {
    backgroundColor: "#DCDCE5",
  },

  buttonDisabledText: {
    color: "#9C98A6",
  },

});

export default styles;