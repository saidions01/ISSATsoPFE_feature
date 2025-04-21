import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Button,
} from "react-native";
import * as XLSX from "xlsx";
import { Ionicons } from "@expo/vector-icons";

const UploadProfessors = ({ navigation }) => {
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
        const data = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        setFileData(data);
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
        "http://127.0.0.1:5000/api/upload-professors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ professors: fileData }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Data uploaded successfully.");
      } else {
        Alert.alert("Error", result.message || "Failed to upload data.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Error", "Failed to upload data.");
    }
  };
  const handleCreateAccounts = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/create-professor-accounts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${data.users.length} accounts created and emails sent!`);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminDashboard")}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Upload your professors' sheet </Text>

      <TouchableOpacity style={styles.button} onPress={selectFile}>
        <Text style={styles.buttonText}>Select Professors File (.xlsx)</Text>
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
        <Text style={styles.buttonText}>Upload Data</Text>
      </TouchableOpacity>

      <Button
        title="Create Professor Accounts"
        onPress={handleCreateAccounts}
      />
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

export default UploadProfessors;
