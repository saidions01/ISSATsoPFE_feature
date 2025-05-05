import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AdminHeader from "./AdminHeader";
import AdminNav from "./components/AdminNav";

const ModifyEventsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 , backgroundColor:"#fff"}}>
       <AdminHeader />
    <View style={styles.container}>
     
      <View style={styles.content}>
        <Text style={styles.title}>Modify Events</Text>
        <Text style={styles.subtitle}>
          Manage and update your upcoming events here.
        </Text>

        {/* You can add event management components here later */}
      </View>
      <AdminNav navigation={navigation} />
    </View>
    </View>
  );
};

export default ModifyEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    width: "100%",
  },
  content: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 20,
  },
});
