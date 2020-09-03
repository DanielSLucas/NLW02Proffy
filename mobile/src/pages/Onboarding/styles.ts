import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  wrapper: {},

  slide: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    backgroundColor: '#8257E5',
    width: "100%",
    height: "40%",
  },

  headerBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  
  pageIcon: { 
    width: 120,
    height: 120,
  },

  main: {
    justifyContent: "center",
    height: "40%",
    width: "80%",
  },

  pageNumber: {
    fontFamily: "Archivo_400Regular",
    fontSize: 40,
    color: "#6A6180",
    opacity: 0.2,
    marginBottom: 20,
  },

  description: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#6A6180",
  },

  nextButton: {
    position: "absolute",
    right: 60,
    bottom: 50,
  },

  dot: {
    backgroundColor:'rgba(0,0,0,.2)', 
    width: 6, 
    height: 6,
    borderRadius: 3, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3,
  },

  activeDot: {
    backgroundColor: '#8257E5', 
    width: 6, 
    height: 6, 
    borderRadius: 3,
  },

  pagination: {
    position: "absolute",
    bottom: 60,
    right: "auto",
    left: 50,
    // height: 100,
    // width: "30%",
  },
});

export default styles;