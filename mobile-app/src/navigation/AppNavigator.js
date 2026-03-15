import React from "react";
import { Pressable, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import SOSScreen from "../screens/SOSScreen";
import MapScreen from "../screens/MapScreen";
import JourneyScreen from "../screens/JourneyScreen";
import HeatmapScreen from "../screens/HeatmapScreen";
import ContactsScreen from "../screens/ContactsScreen";
import ReportScreen from "../screens/ReportScreen";
import AlertHistoryScreen from "../screens/AlertHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../utils/theme";

const Tab = createBottomTabNavigator();

const hiddenRoutes = [
  "Login",
  "Register",
  "Heatmap",
  "Contacts",
  "Report",
  "Alerts",
];

const iconMap = {
  Login: "log-in-outline",
  Register: "person-add-outline",
  Home: "home-outline",
  SOS: "warning-outline",
  Map: "map-outline",
  Journey: "navigate-outline",
  Heatmap: "flame-outline",
  Contacts: "people-outline",
  Report: "flag-outline",
  Alerts: "notifications-outline",
  Profile: "person-outline",
};

const HiddenTabButton = () => <View style={{ display: "none" }} />;

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: hiddenRoutes.includes(route.name)
          ? { display: "none" }
          : {
              height: 72,
              paddingTop: 8,
              paddingBottom: 12,
              borderTopColor: colors.border,
              backgroundColor: colors.surface,
            },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconMap[route.name]} size={size} color={color} />
        ),
        tabBarButton: hiddenRoutes.includes(route.name)
          ? HiddenTabButton
          : undefined,
        headerRight: () =>
          route.name === "Login" || route.name === "Register" ? null : (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  marginRight: 16,
                }}
              >
                Profile
              </Text>
            </Pressable>
          ),
      })}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Journey" component={JourneyScreen} />
      <Tab.Screen name="Heatmap" component={HeatmapScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Alerts" component={AlertHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
