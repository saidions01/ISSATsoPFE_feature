import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

import ProfessorsListScreen from "./ProfessorsListScreen";
import { useNavigation } from "@react-navigation/native";
import AdminNav from "./components/AdminNav";

const AdminDashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AdminNav navigation={navigation} />
      <ProfessorsListScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7da6cf",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AdminDashboard;
