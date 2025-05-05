import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtomNav from "./components/BottomNav";
import Header from "./Header";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("Melissa Peters");
  const [email, setEmail] = useState("melpeters@gmail.com");
  const [password, setPassword] = useState("********");
  const [dob, setDob] = useState("23/05/1995");
  const [department, setDepartment] = useState("CIS");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Header navigation={navigation} />

          {/* Profile Picture */}
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Input Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput style={styles.input} value={dob} onChangeText={setDob} />

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              value={department}
              onChangeText={setDepartment}
            />

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <ButtomNav navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120, // so last content is not hidden by bottom nav
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "#e5e7eb",
    elevation: 5,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 120 / 2 - 15,
    backgroundColor: "#2563eb",
    borderRadius: 15,
    padding: 6,
    elevation: 3,
  },
  form: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  label: {
    marginBottom: 6,
    color: "#374151",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfile;
