import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, radius, shadow } from "../utils/theme";

export default function PanicButton({
  apiBaseUrl,
  userId,
  label = "SOS",
  triggerType = "button",
  onSuccess,
  onError,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePress = async () => {
    if (isSubmitting) {
      return;
    }

    if (!apiBaseUrl || !userId) {
      const message = "Set apiBaseUrl and userId before triggering SOS.";
      Alert.alert("SOS unavailable", message);
      onError?.(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        const message = "Location permission is required to send an SOS alert.";
        Alert.alert("Permission required", message);
        onError?.(message);
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const response = await axios.post(`${apiBaseUrl}/api/alerts/sos`, {
        userId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        triggerType,
      });

      const message = response.data?.message || "SOS alert sent successfully.";

      Alert.alert("SOS sent", message);
      onSuccess?.({
        message,
        alert: response.data?.alert,
        location: position.coords,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send SOS alert.";

      Alert.alert("SOS failed", message);
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          isSubmitting && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={handlePress}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <MaterialIcons name="warning" size={42} color="#ffffff" />
        )}
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.caption}>
          {isSubmitting ? "Sending alert..." : "Tap once for emergency help"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  button: {
    width: 220,
    height: 220,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    ...shadow,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.85,
  },
  label: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  caption: {
    color: "#ffe4e7",
    fontSize: 13,
    fontWeight: "600",
  },
});
