import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const navItems = [
  { icon: "home-outline", label: "Dashboard", route: "AdminDashboard" },
  { icon: "calendar-outline", label: "Timetable", route: "GenerateTimeTable" },
  { icon: "cloud-upload-outline", label: "Professors", route: "UploadProfessors" },
  { icon: "create-outline", label: "Events", route: "ModifyEvents" },
 
];

const AdminNav = ({ navigation, activeRoute }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 4 }]}>
      {navItems.map((item) => {
        const isActive = activeRoute === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.tab}
            onPress={() => navigation.navigate(item.route)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={isActive ? "#3A7CA5" : "#999"}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? "#3A7CA5" : "#999" },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopColor: "#e5e5e5",
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "500",
  },
});

export default AdminNav;
