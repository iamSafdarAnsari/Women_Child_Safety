import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/main/HomeScreen';
import MapScreen from '../screens/main/MapScreen';
import ReportScreen from '../screens/main/ReportScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SOSScreen from '../screens/main/SOSScreen';
import JourneyScreen from '../screens/main/JourneyScreen';
import HeatmapScreen from '../screens/main/HeatmapScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import AlertHistoryScreen from '../screens/main/AlertHistoryScreen';

import { colors } from '../theme/colors';
import { typography, borderRadius, shadows } from '../theme/typography';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SOS" component={SOSScreen} />
    <Stack.Screen name="Journey" component={JourneyScreen} />
    <Stack.Screen name="Contacts" component={ContactsScreen} />
    <Stack.Screen name="AlertHistory" component={AlertHistoryScreen} />
    <Stack.Screen name="Heatmap" component={HeatmapScreen} />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Map" component={MapScreen} />
    <Stack.Screen name="Journey" component={JourneyScreen} />
    <Stack.Screen name="Heatmap" component={HeatmapScreen} />
  </Stack.Navigator>
);

const ReportStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Report" component={ReportScreen} />
    <Stack.Screen name="Heatmap" component={HeatmapScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Contacts" component={ContactsScreen} />
    <Stack.Screen name="AlertHistory" component={AlertHistoryScreen} />
    <Stack.Screen name="Report" component={ReportScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.navActive,
      tabBarInactiveTintColor: colors.navInactive,
      tabBarLabelStyle: styles.tabLabel,
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          HomeTab: focused ? 'home' : 'home-outline',
          MapTab: focused ? 'map' : 'map-outline',
          ReportTab: focused ? 'flag' : 'flag-outline',
          ProfileTab: focused ? 'person' : 'person-outline',
        };
        const iconName = icons[route.name] || 'ellipse-outline';
        return (
          <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
            <Ionicons name={iconName} size={22} color={color} />
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
    <Tab.Screen name="MapTab" component={MapStack} options={{ title: 'Map' }} />
    <Tab.Screen name="ReportTab" component={ReportStack} options={{ title: 'Reports' }} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navBackground,
    borderTopWidth: 0,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
    borderRadius: borderRadius['2xl'],
    marginHorizontal: 12,
    marginBottom: 8,
    position: 'absolute',
    ...shadows.lg,
  },
  tabLabel: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    marginTop: 2,
  },
  tabIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerActive: {
    backgroundColor: colors.purple[100],
  },
});

export default MainNavigator;
