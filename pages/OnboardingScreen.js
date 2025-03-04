import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
const loadFonts = async () => {
  await Font.loadAsync({
    "Italia-Moderna": require("../assets/fonts/GlobalFont.ttf"),
  });
};

const OnboardingScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoIssat.png")}
        style={styles.logo}
      />
      <Text style={styles.tagline}>Make your university experience easier</Text>
      <Image
        source={require("../assets/images/level1-dots.png")}
        style={styles.level1Dots}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  level1Dots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEFE0",
    fontFamily: "Baloo Thambi 2",
  },
  logo: {
    width: 340,
    height: 160,
    marginBottom: 20,
    position: "absolute",
    top: 100,
  },
  tagline: {
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 30,
    color: "#4E4E4E",
  },
  button: {
    backgroundColor: "#FFEFE0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    position: "absolute",
    bottom: 120,
    borderWidth: 2,
    borderColor: "4E4E4E",
  },
  buttonText: {
    color: "#4E4E4E",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default OnboardingScreen;
