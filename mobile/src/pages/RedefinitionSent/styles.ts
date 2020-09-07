import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    marginBottom: 30,
  },

  title: {
    fontFamily: "Archivo_700Bold",
    fontSize: 32,
    textAlign: "center",
    color: "#FFF",
    marginBottom: 15,
  },

  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#D4C2FF"
  },

  button: {
    alignSelf:"center",
    marginBottom: 35,
  },
});

export default styles;