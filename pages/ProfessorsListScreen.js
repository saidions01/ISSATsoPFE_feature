import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const ProfessorsListScreen = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    subject: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/professors")
      .then((res) => {
        setProfessors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching professors:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/professors/${id}`);
      setProfessors((prev) => prev.filter((prof) => prof._id !== id));
      alert("Professor deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete professor.");
    }
  };

  const handleUpdate = (professor) => {
    setSelectedProfessor(professor);
    setForm(professor);
    setModalVisible(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:5000/api/professors/${selectedProfessor._id}`,

        form
      );
      const updated = res.data;
      setProfessors((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setModalVisible(false);
      alert("Professor updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update professor.");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Professors List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {professors.map((prof, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.name}>
                  {prof.firstName} {prof.lastName}
                </Text>
                <View style={styles.iconRow}>
                  <Icon
                    name="create-outline"
                    size={24}
                    color="#4CAF50"
                    style={styles.icon}
                    onPress={() => handleUpdate(prof)}
                  />
                  <Icon
                    name="trash-outline"
                    size={24}
                    color="#F44336"
                    onPress={() => handleDelete(prof._id)}
                  />
                </View>
              </View>
              <Text style={styles.detail}>CIN: {prof.cin}</Text>
              <Text style={styles.detail}>Subject: {prof.subject}</Text>
              <Text style={styles.detail}>Department: {prof.department}</Text>
              <Text style={styles.detail}>Email: {prof.email}</Text>
              <View style={styles.separator} />
            </View>
          ))}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Professor</Text>

            {[
              "firstName",
              "lastName",
              "cin",
              "subject",
              "department",
              "email",
            ].map((field) => (
              <TextInput
                key={field}
                style={styles.input}
                placeholder={field}
                value={form[field]}
                onChangeText={(text) => handleChange(field, text)}
              />
            ))}

            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveUpdate} />
              <Button
                title="Cancel"
                color="gray"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfessorsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7da6cf",
    padding: 20,

    margin: 40,
    width: "95%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  scrollContainer: {
    maxHeight: 500,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    width: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
