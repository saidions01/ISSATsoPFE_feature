import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./components/BottomNav";
import Header from "./Header";

const messages = [
  {
    id: "1",
    name: "Zander",
    message: "Honestly, your energy is infectious. I wish I...",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Neil",
    message: "I neglected to mention that I definitely won’t...",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Mitch",
    message: "Monsieur, I have a question about your...",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Sam Bee",
    message: "You: On excellent!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const Messagerie = ({ navigation }) => {
  return (
    <View style={styles.container}>
   <Header navigation={navigation} />

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.messageInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
         <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6c91bf",
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    color: "gray",
  },
});

export default Messagerie;
