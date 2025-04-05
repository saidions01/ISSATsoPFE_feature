import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "./components/BottomNav";

const data = [
  { id: '1', lastName: 'Mansour', firstName: 'Tesnim',  cin: '14614980', field: 'Ingenierie' },
  { id: '2', lastName: 'Saidi', firstName: 'Ons',  cin: '12345678', field: 'Licence' },
  { id: '3', lastName: 'Kraiem', firstName: 'Wassim',  cin: '45678912', field: 'Ingenierie' },
];

const ConsultListOfStudents = ({ navigation }) => {
  const TableHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.headerText, styles.column]}>Nom</Text>
      <Text style={[styles.headerText, styles.column]}>Prenom</Text>
      <Text style={[styles.headerText, styles.column]}>CIN</Text>
      <Text style={[styles.headerText, styles.column]}>Filiere</Text>
    </View>
  );

  const TableRow = ({ item }) => (
    <View style={[styles.row, styles.rowBackground]}>
      <Text style={[styles.cell, styles.column]}>{item.lastName}</Text>
      <Text style={[styles.cell, styles.column]}>{item.firstName}</Text>
      <Text style={[styles.cell, styles.column]}>{item.cin}</Text>
      <Text style={[styles.cell, styles.column]}>{item.field}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("MenuPage")} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Liste des Etudiants</Text>

      <View style={styles.tableContainer}>
        <TableHeader />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TableRow item={item} />}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNavWrapper}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6091BA",
    flex: 1,
    padding: 16,
    
  },
  menuButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 20,
    textAlign: "center",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  header: {
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rowBackground: {
    backgroundColor: "white",
  },
  headerText: {
    fontWeight: "bold",
    color: "#333",
  },
  cell: {
    color: "#666",
  },
  column: {
    flex: 1,
    textAlign: "center",
    minWidth: 80,
  },
  listContent: {
    paddingBottom: 16,
  },
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
  },
});

export default ConsultListOfStudents;