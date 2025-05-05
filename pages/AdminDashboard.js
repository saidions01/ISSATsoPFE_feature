import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ProfessorsListScreen from "./ProfessorsListScreen";
import { useNavigation } from "@react-navigation/native";
import AdminNav from "./components/AdminNav";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <AdminHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfessorsListScreen />
      </ScrollView>

      <AdminNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingBottom: 20, // leave space for bottom nav
  },
});

export default AdminDashboard;
