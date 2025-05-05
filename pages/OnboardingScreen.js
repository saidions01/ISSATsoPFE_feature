import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E4E4E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoIssat.png")}
        style={styles.logo}
      />

      <Text style={styles.selectText}>Please select your role:</Text>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => navigation.navigate("ProfessorLogin")}
      >
        <Text style={styles.roleButtonText}>I'm a Professor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => navigation.navigate("AdminLogin")}
      >
        <Text style={styles.roleButtonText}>I'm an Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  level1Dots: {
    top: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    marginBottom: 40,
    color: "#4E4E4E",
  },
  selectText: {
    fontSize: 20,
    fontWeight: "bold",

    marginBottom: 30,
    color: "#4E4E4E",
    fontFamily: "Roboto",
  },
  roleButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4E4E4E",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E4E4E",
    fontFamily: "Roboto",
  },
  getStartedButton: {
    backgroundColor: "#FFEFE0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    position: "absolute",
    bottom: 60,
    borderWidth: 2,
    borderColor: "#4E4E4E",
  },
  buttonText: {
    color: "#4E4E4E",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default OnboardingScreen;
