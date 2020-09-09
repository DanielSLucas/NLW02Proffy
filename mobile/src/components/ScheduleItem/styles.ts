import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 340,

    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,

    backgroundColor: "#FAFAFC",

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    marginTop: 10,
  },

  text: {
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    color: "#6A6180",
  },

  disabled: {
    opacity: 0.4,
  },
});

export default styles;