import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AddTimeConstraint = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState("Reason");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState("13:30");
  const [toTime, setToTime] = useState("15:00");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timeType, setTimeType] = useState("from");

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = (type) => {
    setTimeType(type);
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (timeType === "from") {
      setFromTime(formattedTime);
    } else {
      setToTime(formattedTime);
    }
    hideTimePicker();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5E6DA" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Add Time Constraint</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      <View style={{ margin: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text>Reason:</Text>
          <Picker
            selectedValue={selectedReason}
            onValueChange={(itemValue) => setSelectedReason(itemValue)}
            style={{ width: "50%" }}
          >
            <Picker.Item label="Reason" value="Reason" />
            <Picker.Item label="Meeting" value="Meeting" />
            <Picker.Item label="Break" value="Break" />
          </Picker>
        </View>

        <Text>Date:</Text>
        <TouchableOpacity
          onPress={showDatePicker}
          style={{ padding: 10, backgroundColor: "#fff", marginBottom: 10 }}
        >
          <Text style={{ marginTop: 20 }}>
            {selectedDate || "Choose your date"}
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20 }}>From:</Text>
        <TouchableOpacity
          onPress={() => showTimePicker("from")}
          style={{ padding: 10, backgroundColor: "#fff", marginBottom: 10 }}
        >
          <Text>{fromTime}</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20 }}>To:</Text>
        <TouchableOpacity
          onPress={() => showTimePicker("to")}
          style={{ padding: 10, backgroundColor: "#fff", marginBottom: 10 }}
        >
          <Text>{toTime}</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "blue" }} onPress={() => navigation.goBack()}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6c91bf",
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
export default AddTimeConstraint;
