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
    
    backgroundColor: "#FFF",
    
    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,
  },

  giveClassesFormContent: {
    padding: 20,
  },

  legendContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6F0",
    marginBottom: 20,
  },

  legend: {
    fontFamily: "Archivo_700Bold",
    fontSize: 20,
    color: "#32264D",
    marginBottom: 10,
  },

  labelStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9C98A6",
    marginBottom: 5
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: -10,
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

  textArea: {
    height: "auto",
    marginBottom: 30,
    paddingVertical: 10,

    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A6180",
  },

  timeLegendContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6F0",
    marginTop: 20,
    marginBottom: 20,
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addNewButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  addNewButtonText: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    color: "#8257E5",
  },

  scheduleItem: {
    marginBottom: 10,
    borderBottomColor: "#E6E6F0",
    borderBottomWidth: 1,
  },

  scheduleItemTime: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
  },

  timeItem: {
    width: "48%",
  },

  giveClassesFormFooter: {
    backgroundColor: "#FAFAFC",
    borderTopColor: "#E6E6F0",
    borderTopWidth: 1,
  },

  warningContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },

  warningTextContainer: {
    marginLeft: 15,
  },

  warningTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8257E5",
  },

  warningDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#A0A0B2",
  }
});

export default styles;