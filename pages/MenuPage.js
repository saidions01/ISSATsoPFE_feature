import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UploadScreen from "./UploadScreen.js";
import AddTimeConstraint from "./AddTimeConstraint.js";
const MenuPage = ({ onClose, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("UploadScreen")}
      >
        <Ionicons name="cloud-upload-outline" size={20} color="black" />
        <Text style={styles.text}>Upload Excel Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("AddTimeConstraint")}
      >
        <Ionicons name="time-outline" size={20} color="black" />
        <Text style={styles.text}>Identify Time Constraint</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="document-text-outline" size={20} color="black" />
        <Text style={styles.text}>Consult Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="list-outline" size={20} color="black" />
        <Text style={styles.text}>List of Students</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#aac4e4",
    paddingTop: 60,
    paddingLeft: 20,
    zIndex: 20,
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginTop: 10,
    marginLeft: 13,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default MenuPage;
