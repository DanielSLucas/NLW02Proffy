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

  intro: {},
  logo: {},

  form: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },

  formHeader: {
    flexDirection: 'row',
    width: 311,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#32264D",
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

  formFooter: {
    width: 311,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  rememberMe: {
    flexDirection: "row",
    alignItems:"center",
  },

  checkbox: {
    margin: 0,
    padding: 0,
  },

  forgotPasswordButton: {},
  
  formFooterText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9C98A6",
  },
});

export default styles;