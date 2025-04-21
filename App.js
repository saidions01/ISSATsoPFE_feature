import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./pages/OnboardingScreen.js";
import ProfessorLoginScreen from "./pages/ProfessorLoginScreen.js";
import AdminLoginScreen from "./pages/AdminLoginScreen.js";
import SignupScreen from "./pages/SignupScreen";
import HomeScreen from "./pages/HomeScreen.js";
import MenuPage from "./pages/MenuPage.js";
import UploadScreen from "./pages/UploadScreen.js";
import Messagerie from "./pages/Messagerie.js";
import EditProfile from "./pages/EditProfile.js";
import AddTimeConstraint from "./pages/AddTimeConstraint.js";
import ConsultListOfStudents from "./pages/ConsultListOfStudents.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import ProfessorsListScreen from "./pages/ProfessorsListScreen.js";
import UploadProfessors from "./pages/UploadProfessors.js";
import ModifyEventsScreen from "./pages/ModifyEventsScreen.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="ProfessorLogin" component={ProfessorLoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="MenuPage" component={MenuPage} />
        <Stack.Screen name="Messagerie" component={Messagerie} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddTimeConstraint" component={AddTimeConstraint} />
        <Stack.Screen
          name="ConsultListOfStudents"
          component={ConsultListOfStudents}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen
          name="ProfessorsListScreen"
          component={ProfessorsListScreen}
        />
        <Stack.Screen name="UploadProfessors" component={UploadProfessors} />
        <Stack.Screen name="ModifyEvents" component={ModifyEventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
