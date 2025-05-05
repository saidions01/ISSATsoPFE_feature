import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import * as XLSX from "xlsx";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import ButtomNav from "./components/BottomNav";

const UploadStudents = ({ navigation }) => {
  const [fileData, setFileData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChangeWeb = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        const formatted = data.map((student) => ({
          name: student.name || "",
          lastName: student.lastName || "",
          cin: student.cin || "",
          numInscription: student.numInscription || "",
          fieldOfStudy: student.fieldOfStudy || "",
          department: student.department || "",
        }));
        setFileData(formatted);
      } catch (error) {
        console.error("Error reading file:", error);
        Alert.alert("Error", "Failed to parse the file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const selectFile = async () => {
    if (Platform.OS === "web") {
      fileInputRef.current.click();
    } else {
      Alert.alert("Not supported", "Use a native file picker here.");
    }
  };

  const handleUpload = async () => {
    if (!fileData) {
      Alert.alert("No Data", "Please select a file first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/upload-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: fileData }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = contentType?.includes("application/json")
          ? (await response.json()).error
          : await response.text();
        Alert.alert("Error", errorText || "Upload failed.");
        return;
      }

      const data = await response.json();
      Alert.alert("Success", data.message || "Upload successful!");
    } catch (err) {
      console.error("Fetch error:", err);
      Alert.alert("Network Error", "Failed to connect to the server.");
    }
  };

  return (
    <View style={styles.screen}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upload Students Sheet</Text>
        <Text style={styles.subtitle}>
          Please upload an Excel file (.xlsx) containing the student data.
        </Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.actionButton} onPress={selectFile}>
            <Ionicons name="cloud-upload-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Select Students File</Text>
          </TouchableOpacity>

          {Platform.OS === "web" && (
            <input
              type="file"
              accept=".xlsx"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChangeWeb}
            />
          )}

          <TouchableOpacity style={styles.actionButton} onPress={handleUpload}>
            <Ionicons name="checkmark-done-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Upload Students</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ButtomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f7fc",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2b3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#5c6c7d",
    marginBottom: 25,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UploadStudents;
