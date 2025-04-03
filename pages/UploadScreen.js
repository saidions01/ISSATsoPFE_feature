import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UploadScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Students</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>Upload sheet</Text>
        <View style={styles.uploadBox}>
          <Ionicons name="cloud-upload-outline" size={40} color="#7d7d7d" />
          <Text style={styles.uploadText}>
            Drag & drop files or <Text style={styles.browseText}>Browse</Text>
          </Text>
          <Text style={styles.supportedFormats}>
            Supported formats: .xls, .xlsx
          </Text>
        </View>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7d7d7d",
  },
  uploadContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7d7d7d",
    marginBottom: 15,
  },
  uploadBox: {
    width: "90%",
    height: 180,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdeede",
    padding: 15,
  },
  uploadText: {
    fontSize: 16,
    color: "#7d7d7d",
    marginTop: 10,
  },
  browseText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  supportedFormats: {
    fontSize: 12,
    color: "#7d7d7d",
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: "#aac4e4",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default UploadScreen;
