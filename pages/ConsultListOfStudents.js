import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConsultListOfStudents = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ListOfStudents")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>List of Students</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});

export default ConsultListOfStudents;