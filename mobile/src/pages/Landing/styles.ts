import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F7',
  },

  header: {
    width: "100%",
    height: "45%",
    backgroundColor: "#8257E5"
  },

  head: {
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  userName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#D4C2FF",
  },

  signOutButton: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#774DD6",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    width: '100%',
    resizeMode: 'contain',
  },

  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 40,
    paddingHorizontal: 40,
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#8257E5',
  },

  buttonSecondary: {
    backgroundColor: '#04D361',
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
    marginLeft: 40,
  }

});

export default styles;