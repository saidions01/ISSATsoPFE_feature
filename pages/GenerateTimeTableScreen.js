import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import AdminHeader from "./AdminHeader";
import AdminNav from "./components/AdminNav";

const GenerateTimetable = ({ navigation }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/generate-timetable"
      );
      if (response.data.success) {
        Alert.alert("Success", "Timetable generated successfully!");
      } else {
        Alert.alert("Error", "Failed to generate timetable. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please check your connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.screenTitle}>Generate Timetable</Text>

        {/* Description */}
        <View style={styles.card}>
          <Ionicons name="time-outline" size={40} color="#6C91BF" />
          <Text style={styles.infoText}>
            Press the button below to generate a new timetable automatically
            based on your constraints and preferences.
          </Text>

          <TouchableOpacity
            style={[styles.generateButton, isGenerating && { opacity: 0.7 }]}
            onPress={handleGenerateTimetable}
            disabled={isGenerating}
          >
            <Text style={styles.buttonText}>
              {isGenerating ? "Generating..." : "Generate Timetable"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AdminNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
    paddingBottom: 100, // to make space for AdminNav
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 16,
    padding: 25,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginVertical: 20,
  },
  generateButton: {
    backgroundColor: "#6C91BF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GenerateTimetable;
