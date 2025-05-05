import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor = "#e6f0ff" }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
          {icon}
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: "#4B5563", // gray-700
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937", // gray-800
  },
});

export default StatCard;
