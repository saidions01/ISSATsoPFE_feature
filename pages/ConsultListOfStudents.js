import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";

import BottomNav from "./components/BottomNav";
import Header from "./Header";

const ConsultListOfStudents = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/students");
      const json = await response.json();
      setStudents(json);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const TableHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.headerText, styles.column]}>Nom</Text>
      <Text style={[styles.headerText, styles.column]}>Prenom</Text>
      <Text style={[styles.headerText, styles.column]}>CIN</Text>
      <Text style={[styles.headerText, styles.column]}>Filière</Text>
    </View>
  );

  const TableRow = ({ item, index }) => (
    <View
      style={[
        styles.row,
        index % 2 === 0 ? styles.rowEven : styles.rowOdd,
        styles.rowBody,
      ]}
    >
      <Text style={[styles.cell, styles.column]}>{item.lastName}</Text>
      <Text style={[styles.cell, styles.column]}>{item.name}</Text>
      <Text style={[styles.cell, styles.column]}>{item.cin}</Text>
      <Text style={[styles.cell, styles.column]}>{item.fieldOfStudy}</Text>
    </View>
  );

  const toggleShowAll = () => setShowAll((prev) => !prev);

  const displayedStudents = showAll ? students : students.slice(0, 10);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header navigation={navigation} />

        <Text style={styles.title}>Liste des Étudiants</Text>

        <View style={styles.tableContainer}>
          <TableHeader />
          <FlatList
            data={displayedStudents}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <TableRow item={item} index={index} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          {students.length > 10 && (
            <TouchableOpacity onPress={toggleShowAll} style={styles.showMoreBtn}>
              <Text style={styles.showMoreText}>
                {showAll ? "Voir moins" : "Voir plus"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <View style={styles.bottomNavWrapper}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "#e6f0ff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  rowBody: {
    borderBottomWidth: 1,
    borderColor: "#f2f2f2",
  },
  rowEven: {
    backgroundColor: "#f9f9f9",
  },
  rowOdd: {
    backgroundColor: "#ffffff",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  cell: {
    fontSize: 14,
    color: "#444",
  },
  column: {
    flex: 1,
    textAlign: "center",
    minWidth: 80,
  },
  listContent: {
    paddingBottom: 20,
  },
  showMoreBtn: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  showMoreText: {
    color: "#0066cc",
    fontWeight: "bold",
  },
});

export default ConsultListOfStudents;
