import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Home, Calendar,  User, MessageCircle , Upload, Clock  } from "lucide-react-native";

const navItems = [
  { label: "Dashboard", icon: Home, screen: "Home" },
  { label: "Messagerie", icon: MessageCircle, screen: "Messagerie" },
  { label: "PFE", icon: User, screen: "ConsultListOfStudents" },
  { label: "Upload", icon: Upload, screen: "UploadScreen" },
  { label: "Timetable", icon: Calendar, screen: "TimeTable" },
  { label: "Time-Conflict", icon: Clock, screen: "AddTimeConstraint" },

];

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.navContainer}>
      {navItems.map(({ label, icon: Icon, screen }) => (
        <TouchableOpacity
          key={screen}
          style={styles.navItem}
          onPress={() => navigation.navigate(screen)}
        >
          <Icon size={22} color="#888" />
          <Text style={styles.navLabel}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#d1d1d1",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100, // Ensures it's on top of other views
    elevation: 10, // For Android shadow
  },
  
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    color: "#888",
  },
});

export default BottomNav;
