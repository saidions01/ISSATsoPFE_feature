import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      console.log("Trying to login with:", { email, password });

      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Logged in!", res.data);
      navigation.navigate("AdminDashboard");
    } catch (err) {
      const error =
        err.response?.data?.message || "Something went wrong. Try again.";
      setErrorMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/imageISSAT.jpg")}
        style={styles.image}
      />

      <View style={styles.form}>
        <Text style={styles.title}>ADMIN LOGIN</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* 🆕 Error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AdminDashboard")}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
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
});

export default AdminLoginScreen;
