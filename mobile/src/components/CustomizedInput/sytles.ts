import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 15,
    height: 65,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E6E6F0",
    backgroundColor: "#FAFAFC",
  },

  firstInput: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },

  lastInput: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },

  inputFocus: {
    width: 2,
    height: 50,
    backgroundColor: "#8257E5",
    position: "absolute",
    top: 6,
    bottom: 5,
  },

  input: {
    width: "100%",
    height: "100%",
    marginLeft: 10,
  },

  label: {
    fontFamily: "Poppins_400Regular",
    color: "#9C98A6",
    width: 50,
    fontSize: 14,
    top: -40,
    marginLeft: 10,
  },

  focusedInputLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: 10,
  }

});

export default styles;