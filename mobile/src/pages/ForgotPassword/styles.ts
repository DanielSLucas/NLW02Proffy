import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  header: {
    backgroundColor: '#8257E5',
    width: "100%",
    height: "45%",
  },

  headerBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    marginLeft: -10,
    marginBottom: 40,
  },

  form: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },

  formHeader: {
    width: 311,
  },

  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#32264D",
  },

  description: {
    marginVertical: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A6180",
  },

  signUpButton: {
    marginLeft: "auto",
  },

  signUpButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8257E5",
  },

  inputsContainer: {
    width: 311,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default styles;