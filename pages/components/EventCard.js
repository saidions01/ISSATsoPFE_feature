import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, Book, User, Clock } from "lucide-react-native";

const EventCard = ({ event }) => {
  const isEventTomorrow =
    new Date(event.date).toDateString() ===
    new Date(Date.now() + 86400000).toDateString();

  const getEventIcon = (type) => {
    switch (type) {
      case "session":
        return <Calendar size={20} color="#3b82f6" />;
      case "project":
        return <Book size={20} color="#22c55e" />;
      case "pfe":
        return <User size={20} color="#eab308" />;
      default:
        return <Calendar size={20} color="#6b7280" />;
    }
  };

  const getEventBgColor = (type) => {
    switch (type) {
      case "session":
        return "#dbeafe"; // Tailwind's bg-blue-100
      case "project":
        return "#dcfce7"; // bg-green-100
      case "pfe":
        return "#fef9c3"; // bg-yellow-100
      default:
        return "#f3f4f6"; // bg-gray-100
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: getEventBgColor(event.type) },
            ]}
          >
            {getEventIcon(event.type)}
          </View>
          <Text style={styles.typeText}>{event.type}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={16} color="#6b7280" />
          <Text style={styles.timeText}>
            {isEventTomorrow ? "Tomorrow, " : ""}
            {event.time} - {event.endTime}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.location}>{event.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  typeText: {
    textTransform: "capitalize",
    color: "#4b5563", // text-gray-600
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    color: "#6b7280", // text-gray-500
    fontSize: 12,
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default EventCard;
