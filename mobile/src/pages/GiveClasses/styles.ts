import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F7',
    flex: 1,
  },
  
  headerDescription: {
    marginTop: -20,
    marginBottom: 30,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#D4C2FF"
  },

  giveClassesForm: {
    width: "90%",
    alignSelf: "center",
    marginTop: -40,
    padding: 20,
    
    backgroundColor: "#FFF",
    
    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,
  },

  legendContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6F0"
  },

  legend: {
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
    color: "#32264D",
    marginBottom: 10,
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },

  userAvatar : {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  userName: {
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
    color: "#32264D",
    marginLeft: 20,
  },

  inputContainer: {
    marginTop: 15,
  },

  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9C98A6",
    marginBottom: 5
  },

  input: {
    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,

    height: 56,
    backgroundColor: "#FAFAFC",
  },

  textArea: {
    height: 180,
    marginBottom: 30,

    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A6180",
  },
});

export default styles;