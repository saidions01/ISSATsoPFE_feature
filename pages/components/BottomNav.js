import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <Ionicons name="home" size={28} color="gray" />

      <TouchableOpacity onPress={() => navigation.navigate("Messagerie")}>
        <Ionicons name="chatbubble-outline" size={28} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
        <Ionicons name="person-outline" size={28} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default BottomNav;
