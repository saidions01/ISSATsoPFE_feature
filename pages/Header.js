import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Settings } from "lucide-react-native";
import EditProfile from "./EditProfile";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
 
      <View style={styles.left}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri:
                "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.title}>Teacher Dashboard</Text>
      </View>


      <TouchableOpacity onPress={() => navigation.navigate(EditProfile)}>
        <Settings size={24} color="#374151" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3b82f6",
    overflow: "hidden",
    marginRight: 12,
  },
  avatar: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
});

export default Header;
