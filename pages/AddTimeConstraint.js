import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import ChooseDate from "./components/ChooseDate";
import ChooseTime from "./components/ChooseTime";
import Header from "./Header";
import BottomNav from "./components/BottomNav";

const AddTimeConstraint = ({ navigation }) => {
  const [reason, setReason] = useState("Sickness");
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState("13:30");
  const [toTime, setToTime] = useState("15:00");
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [timeType, setTimeType] = useState("from");

  const handleSave = async () => {
    if (!reason || !date || !fromTime || !toTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/time-constraints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, date, fromTime, toTime }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Saved successfully!");
        navigation.goBack();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <View style={styles.page}>
    <Header navigation={navigation} />

      {/* Form Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Reason</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={reason}
            onValueChange={(val) => setReason(val)}
            style={Platform.OS === "android" ? styles.picker : undefined}
            itemStyle={{ fontSize: 20}}
          >
            <Picker.Item label="Sickness" value="Sickness" />
            <Picker.Item label="Meeting" value="Meeting" />
            <Picker.Item label="Break" value="Break" />
            <Picker.Item label="Engagement" value="Engagement" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setOpenDateModal(true)}
        >
          <Text style={styles.selectText}>{date || "Choose Date"}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>From</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setTimeType("from");
            setOpenTimeModal(true);
          }}
        >
          <Text style={styles.selectText}>{fromTime}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>To</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setTimeType("to");
            setOpenTimeModal(true);
          }}
        >
          <Text style={styles.selectText}>{toTime}</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <ChooseDate
        visible={openDateModal}
        onClose={() => setOpenDateModal(false)}
        onDateSelected={(pickedDate) => {
          setDate(pickedDate);
          setOpenDateModal(false);
        }}
      />
      <ChooseTime
        visible={openTimeModal}
        onClose={() => setOpenTimeModal(false)}
        onTimeSelected={(pickedTime) => {
          timeType === "from" ? setFromTime(pickedTime) : setToTime(pickedTime);
          setOpenTimeModal(false);
        }}
      />

<View style={styles.bottomNavWrapper}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: "#4A90E2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  pickerBox: {
   
   height: 20 ,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: 55,
    width: "100%",
  },
  selectButton: {
    backgroundColor: "#EEF2F7",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginTop: 5,
  },
  selectText: {
    fontSize: 16,
    color: "#111827",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    flex: 0.48,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#EF4444",
  },
  save: {
    backgroundColor: "#10B981",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTimeConstraint;
