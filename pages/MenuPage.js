import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuPage = ({ onClose, navigation }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack} style={styles.closeButton}>
            <Ionicons name="close-outline" size={32} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Menu</Text>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("UploadScreen")}
        >
          <Ionicons name="cloud-upload-outline" size={22} color="#4A90E2" />
          <Text style={styles.text}>Upload Excel Sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("AddTimeConstraint")}
        >
          <Ionicons name="time-outline" size={22} color="#4A90E2" />
          <Text style={styles.text}>Identify Time Constraint</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("GenerateTimeTable")}
        >
          <Ionicons name="document-text-outline" size={22} color="#4A90E2" />
          <Text style={styles.text}>Generate Time Table</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ConsultListOfStudents")}
        >
          <Ionicons name="list-outline" size={22} color="#4A90E2" />
          <Text style={styles.text}>List of Students</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  menuContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 30,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
    fontWeight: "500",
  },
});

export default MenuPage;
