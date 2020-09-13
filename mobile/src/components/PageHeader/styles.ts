import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257e5',
    paddingBottom: 40,
  },

  topBar: {
    justifyContent: "center",
    height: 90,
    backgroundColor: '#6842C2'
  },

  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 40,      
  },

  topBarText: {
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
    color: "#D4C2FF",
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 260,
    marginVertical: 40,
  },

  content: {
    paddingHorizontal: 40,
  },

  contentWithBackground: {
    marginTop: -80,
    marginBottom: 30,
  }
});

export default styles;