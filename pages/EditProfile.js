import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("Melissa Peters");
  const [email, setEmail] = useState("melpeters@gmail.com");
  const [password, setPassword] = useState("********");
  const [dob, setDob] = useState("23/05/1995");
  const [department, setDepartment] = useState("CIS");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="camera-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View name="form" style={styles.form}>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} value={password} secureTextEntry />
        <TextInput style={styles.input} value={dob} onChangeText={setDob} />
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDECE2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6c91bf",
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
    margin: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  form: {
    padding: 20,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfile;
