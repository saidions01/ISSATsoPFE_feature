import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import StatCard from "./components/StatCard";
import BottomNavigation from "./components/BottomNav";
import Header from "./Header";


const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [soutenances, setSoutenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pfeProjects: 0, weeklyHours: 0 });

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

  const today = new Date().toDateString();
  const todayEvents = soutenances.filter(
    (item) => new Date(item.date).toDateString() === today
  );

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("http://127.0.0.1:5000/api/soutenances/stats");
      const data = await response.json();
      setStats({
        totalHours: data.totalHours,
        numberOfProjects: data.numberOfProjects,
      });
    };
    fetchStats();
  }, []);
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

     <Header navigation={navigation}/>

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Overview</Text>

            <View style={styles.statsContainer}>
  <View style={styles.statsRow}>
    <StatCard
      icon={<Ionicons name="person" size={24} color="#ffaa33" />}
      title="PFE Projects"
      value={stats.numberOfProjects}
      bgColor="#fff6e6"
    />
    <StatCard
      icon={<Ionicons name="time" size={24} color="#aa80ff" />}
      title="Total Hours"
      value={`${stats.totalHours}h`}
      bgColor="#f2e6ff"
    />
  </View>
</View>

            <View style={styles.scheduleHeader}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scheduleCard}>
              {todayEvents.length > 0 ? (
                todayEvents.map((event, index) => (
                  <View key={index} style={styles.scheduleItem}>
                    <Text style={styles.scheduleTime}>{event.time}</Text>
                    <Text style={styles.scheduleTitle}>
                      {event.sujetPfeId?.title || "Unknown Title"}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No events scheduled for today
                </Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Upcoming Activities</Text>
          </>
        }
        data={soutenances}
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>
              {item.sujetPfeId?.title || "Unknown Title"}
            </Text>
            <Text style={styles.eventDate}>
              {new Date(item.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}{" "}
              - {item.time}
            </Text>
            <Text style={styles.eventLocation}>
              {item.salleId?.name || "Unknown Location"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No events found</Text>
        }
      />

      
<BottomNavigation navigation={navigation} />

    </View>
   

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    paddingBottom: 70, // Add enough space for the bottom nav
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationContainer: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 10,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  viewAllText: {
    color: "#4080ff",
  },
  scheduleCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15,
    marginTop: 10,
  },
  scheduleItem: {
    marginBottom: 10,
  },
  scheduleTime: {
    fontWeight: "bold",
    color: "#333",
  },
  scheduleTitle: {
    color: "#666",
  },
  eventCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDate: {
    color: "#555",
  },
  eventLocation: {
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#aaa",
  },
});

export default HomeScreen;
