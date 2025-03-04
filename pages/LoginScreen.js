import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/imageISSAT.jpg")}
        style={styles.image}
      />

      {/* Form Container */}
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("Home")}
          >
            LOGIN
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeedc",
  },
  image: {
    position: "absolute",
    width: width,
    height: height * 0.4,
    top: 0,
    left: 0,
    opacity: 0.8,
  },
  form: {
    backgroundColor: "#fdeedc",
    width: "100%",
    height: "60%",
    padding: 20,
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    elevation: 5,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#4E4E4E",
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "500",
    color: "#4E4E4E",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#4E4E4E",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#555",
    marginBottom: 20,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
  },
  link: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default LoginScreen;
