import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
    position: "relative",
    zIndex: 1,
  },
  
  wrapper: {
    marginTop: -50,
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: 350,
    marginTop: 20,
    alignSelf:"center",
  },

  backIcon: {
    position: "absolute",
    top: 0,
  },

  pageIntro: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 50,
    marginBottom: 150,
    width: 311,
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
    width: 311,
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
    top: -560,
    left: "auto",
    right: 45,
    zIndex: 999,
  },
});

export default styles;