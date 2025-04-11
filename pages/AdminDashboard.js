import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import * as XLSX from "xlsx";
import axios from "axios";
const AdminDashboard = () => {
  const [fileData, setFileData] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const fileInputRef = useRef(null);
  const [professors, setProfessors] = useState([]);
  const [showProfessors, setShowProfessors] = useState(false);
  const handleFileChangeWeb = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;

      console.log("ArrayBuffer:", arrayBuffer);

      try {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const data = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );
        setFileData(data);
        console.log("Parsed file data:", data);
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
  const handleViewProfessors = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/professors");
      setProfessors(response.data);
      setShowProfessors(true);
    } catch (error) {
      console.error("Error fetching professors:", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

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

      <View style={{ padding: 20 }}>
        <Button title="View Professors" onPress={handleViewProfessors} />

        {showProfessors && (
          <ScrollView style={{ marginTop: 20, maxHeight: 300 }}>
            {professors.map((prof, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text>
                  {prof.firstName} {prof.lastName}
                </Text>
                <Text>CIN: {prof.cin}</Text>
                <Text>Subject: {prof.subject}</Text>
                <Text>Department: {prof.department}</Text>
                <Text>Email: {prof.email}</Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#ccc",
                    marginVertical: 5,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    paddingHorizontal: 20,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    maxWidth: "100%",
  },
  dataText: {
    fontSize: 12,
    color: "#333",
  },
});

export default AdminDashboard;
