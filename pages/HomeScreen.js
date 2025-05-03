import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Import axios to make API calls
import MenuPage from "./MenuPage";
import BottomNav from "./components/BottomNav";

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [soutenances, setSoutenances] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const fetchSoutenances = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/api/soutenances");
      if (response.data && response.data.soutenances) {
        setSoutenances(response.data.soutenances);
      } else {
        Alert.alert("Error", "No soutenances found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch soutenances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoutenances();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Events List */}
      {loading ? (
        <Text style={styles.loadingText}>Loading soutenances...</Text>
      ) : (
        <FlatList
          style={styles.eventsContainer}
          data={soutenances}
          keyExtractor={(item, index) =>
            item?.id?.toString() ?? index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.eventTitle}>
                {item.sujetPfeId?.title || "Unknown Title"}{" "}
                <Ionicons name="chevron-down" size={16} />
              </Text>
              <View style={styles.eventInfo}>
                <Ionicons name="calendar" size={16} />
                <Text> {item.date}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="location" size={16} />
                <Text> {item.salleId?.name || "Unknown Salle"}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Ionicons name="time" size={16} />
                <Text> {item.time}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} />

      {menuVisible && (
        <MenuPage
          onClose={() => setMenuVisible(false)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7da6cf",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    top: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eventsContainer: {
    top: 40,
  },
  card: {
    backgroundColor: "#aac4e4",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default HomeScreen;
