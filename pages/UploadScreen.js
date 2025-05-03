// UploadStudents.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import * as XLSX from "xlsx";
import { Ionicons } from "@expo/vector-icons";

const UploadStudents = ({ navigation }) => {
  const [fileData, setFileData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChangeWeb = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      try {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
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
      const response = await fetch(
        "http://localhost:5000/api/upload-students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ students: fileData }),
        }
      );

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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Upload your students' sheet</Text>

      <TouchableOpacity style={styles.button} onPress={selectFile}>
        <Text style={styles.buttonText}>Select Students File (.xlsx)</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Students</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7da6cf",
    paddingTop: 50,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
});

export default UploadStudents;
