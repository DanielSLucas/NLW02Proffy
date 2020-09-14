import { StyleSheet } from 'react-native';
import { ceil } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F7',
    flex: 1,
  },
  
  headerBackground: {
    alignItems: "center",
    justifyContent: "center",
  },

  intro: {
    alignItems: "center",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#6842C2",
  },

  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#04D361",

    justifyContent: "center",

    position: "absolute",
    right: 0,
    bottom: 0,
  },

  uploadButtonIcon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },

  userName: {
    fontFamily: "Archivo_700Bold",
    fontSize: 24,
    color: "#FFF",
    marginTop: 10,
  },

  userSubject: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
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
  },

  scheduleItemTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timeItem: {
    width: "48%",
  },

  removeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal:20,
  },

  line: {
    height: 1,
    width: 92,
    backgroundColor: "#E6E6F0",
  },

  removeButton: {
    marginHorizontal: 20,
  },

  removeButtonText: {
    fontFamily: "Archivo_700Bold",
    fontSize: 12,
    color: "#E33D3D",
  },

  giveClassesFormFooter: {
    backgroundColor: "#FAFAFC",
    borderTopColor: "#E6E6F0",
    borderTopWidth: 1,
    zIndex: -1,
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