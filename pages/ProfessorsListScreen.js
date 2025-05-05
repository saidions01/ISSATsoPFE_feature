import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
  Platform,
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
    Alert.alert("Confirm", "Are you sure you want to delete this professor?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://127.0.0.1:5000/api/professors/${id}`);
            setProfessors((prev) => prev.filter((prof) => prof._id !== id));
            Alert.alert("Success", "Professor deleted.");
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to delete professor.");
          }
        },
      },
    ]);
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
      Alert.alert("Success", "Professor updated successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update professor.");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professors</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3A7CA5" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {professors.map((prof, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.name}>
                  {prof.firstName} {prof.lastName}
                </Text>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => handleUpdate(prof)}>
                    <Icon name="create-outline" size={22} color="#3A7CA5" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(prof._id)}>
                    <Icon
                      name="trash-outline"
                      size={22}
                      color="#E63946"
                      style={{ marginLeft: 12 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.detail}>CIN: {prof.cin}</Text>
              <Text style={styles.detail}>Subject: {prof.subject}</Text>
              <Text style={styles.detail}>Department: {prof.department}</Text>
              <Text style={styles.detail}>Email: {prof.email}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Update Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Professor</Text>

            {["firstName", "lastName", "cin", "subject", "department", "email"].map(
              (field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field}
                  value={form[field]}
                  onChangeText={(text) => handleChange(field, text)}
                />
              )
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveUpdate}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfessorsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 10 : 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3A7CA5",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  detail: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 2,
  },
  iconRow: {
    flexDirection: "row",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#3A7CA5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#3A7CA5",
  },
  cancelButton: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
