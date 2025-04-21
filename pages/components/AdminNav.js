import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AdminNav = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("UploadProfessors")}
      >
        <Text style={styles.navButtonText}>Upload Professors</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("ModifyEvents")}
      >
        <Text style={styles.navButtonText}>Modify Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "right",
    backgroundColor: "#f0f0f0",
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 7,
    borderRadius: 6,
    color: "#7da6cf",
  },
  navButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default AdminNav;
