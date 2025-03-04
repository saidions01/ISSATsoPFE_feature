import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const events = [
  {
    id: "1",
    title: "Android Development",
    date: "20-02-2025",
    location: "M11",
    time: "08:00 - 10:00",
  },
  {
    id: "2",
    title: "Android Development",
    date: "21-02-2025",
    location: "G14",
    time: "08:00 - 10:00",
  },
  {
    id: "3",
    title: "Android Development",
    date: "22-02-2025",
    location: "M11",
    time: "08:00 - 10:00",
  },
  {
    id: "4",
    title: "Android Development",
    date: "22-02-2025",
    location: "M11",
    time: "08:00 - 10:00",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming events</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        style={styles.eventsContainer}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.eventTitle}>
              {item.title} <Ionicons name="chevron-down" size={16} />
            </Text>
            <View style={styles.eventInfo}>
              <Ionicons name="calendar" size={16} />
              <Text> {item.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Ionicons name="location" size={16} />
              <Text> {item.location}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Ionicons name="time" size={16} />
              <Text> {item.time}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} color="black" />
        <Ionicons name="briefcase-outline" size={28} color="gray" />
        <Ionicons name="ellipsis-horizontal" size={28} color="gray" />
      </View>
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
    marginRight: 20,
    marginLeft: 20,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
});

export default HomeScreen;
