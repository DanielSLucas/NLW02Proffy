import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
    position: "relative",
  },
  
  wrapper: {
    flex: 1,
    flexDirection: "column",
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: 350,
    marginTop: 50,
    alignSelf:"center",
  },

  pageIntro: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 50,
    marginBottom: 150,
  },

  introTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    color: "#32264D",
  },
  
  introDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6A6180",
    marginTop: 15,
  },

  form: {
    marginBottom: 20,
  },

  formTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#32264D",
    marginBottom: 15,
  },

  inputsContainer: {},

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
    top: -564,
    left: "auto",
    right: 45,
  },
});

export default styles;