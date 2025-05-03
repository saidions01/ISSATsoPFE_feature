import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import ChooseDate from "./components/ChooseDate";
import ChooseTime from "./components/ChooseTime";

const AddTimeConstraint = ({ navigation }) => {
  const [reason, setReason] = useState("Reason");
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Time Constraint</Text>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* Form */}
      <View style={styles.card}>
        {/* Reason */}
        <Text style={styles.label}>Reason</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={reason}
            onValueChange={(val) => setReason(val)}
            style={styles.picker}
          >
            <Picker.Item label="Sickness" value="Sickness" />
            <Picker.Item label="Meeting" value="Meeting" />
            <Picker.Item label="Break" value="Break" />
            <Picker.Item label="Engagement" value="Engagement" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <Button
          title={date || "Choose Date"}
          onPress={() => setOpenDateModal(true)}
          color="#6C91BF"
        />

        {/* From Time */}
        <Text style={styles.label}>From</Text>
        <Button
          style={styles.button}
          title={fromTime}
          onPress={() => {
            setTimeType("from");
            setOpenTimeModal(true);
          }}
          color="#6C91BF"
        />

        {/* To Time */}
        <Text style={styles.label}>To</Text>
        <Button
          style={styles.button}
          title={toTime}
          onPress={() => {
            setTimeType("to");
            setOpenTimeModal(true);
          }}
          color="#6C91BF"
        />

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={handleSave}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F5E6DA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6C91BF",
    paddingTop: 50,
  },
  title: { fontSize: 18, color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  label: { marginVertical: 10, fontSize: 16, fontWeight: "600" },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: { height: 50, width: "100%" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  cancel: {
    backgroundColor: "red",
    padding: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  save: {
    backgroundColor: "green",
    padding: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: { color: "white", fontWeight: "bold" },
});

export default AddTimeConstraint;
