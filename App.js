import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./pages/OnboardingScreen.js";
import LoginScreen from "./pages/LoginScreen.js";
import SignupScreen from "./pages/SignupScreen";
import HomeScreen from "./pages/HomeScreen.js";
import MenuPage from "./pages/MenuPage.js";
import UploadScreen from "./pages/UploadScreen.js";
import Messagerie from "./pages/Messagerie.js";
import EditProfile from "./pages/EditProfile.js";
import AddTimeConstraint from "./pages/AddTimeConstraint.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="MenuPage" component={MenuPage} />
        <Stack.Screen name="Messagerie" component={Messagerie} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddTimeConstraint" component={AddTimeConstraint} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
