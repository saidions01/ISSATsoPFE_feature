import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Import axios for HTTP requests

const GenerateTimetable = ({ navigation }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);

    try {
      // Assuming you have a backend route to trigger the timetable generation
      const response = await axios.post(
        "http://localhost:5000/api/generate-timetable"
      ); // Adjust the URL accordingly
      if (response.data.success) {
        Alert.alert("Success", "Timetable generated successfully!");
      } else {
        Alert.alert("Error", "Failed to generate timetable. Please try again.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong. Please check your connection."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Generate Timetable</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="calendar-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content Card */}
      <View style={styles.card}>
        <Text style={styles.infoText}>
          Press the button below to generate a new timetable automatically based
          on your time constraints.
        </Text>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateTimetable}
          disabled={isGenerating} // Disable the button while generating
        >
          <Text style={styles.buttonText}>
            {isGenerating ? "Generating..." : "Generate Timetable"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5E6DA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6C91BF",
    paddingTop: 50,
  },
  title: { fontSize: 18, color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: "#6C91BF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default GenerateTimetable;
