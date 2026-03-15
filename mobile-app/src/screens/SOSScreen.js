import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import PanicButton from "../components/PanicButton";
import { colors, screenStyles, spacing } from "../utils/theme";

export default function SOSScreen() {
  const [statusMessage, setStatusMessage] = useState(
    "Press the panic button to share your current GPS location with the backend alert service.",
  );

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Emergency SOS</Text>
      <Text style={screenStyles.subtitle}>
        Send an emergency signal, share your location, and notify trusted
        contacts immediately.
      </Text>

      <View style={screenStyles.card}>
        <Text style={styles.cardTitle}>One tap emergency trigger</Text>
        <Text style={styles.cardBody}>
          This button requests GPS access, sends your live coordinates to the
          SOS API, and confirms the result on screen.
        </Text>
        <PanicButton
          apiBaseUrl="http://10.0.2.2:5000"
          userId="REPLACE_WITH_LOGGED_IN_USER_ID"
          onSuccess={({ message, location }) => {
            setStatusMessage(
              `${message} Location: ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`,
            );
          }}
          onError={(message) => {
            setStatusMessage(message);
          }}
        />
        <View style={styles.statusPanel}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      </View>

      <View style={screenStyles.card}>
        <Text style={styles.cardTitle}>Safety workflow</Text>
        <Text style={styles.cardBody}>1. Share live location</Text>
        <Text style={styles.cardBody}>2. Notify emergency contacts</Text>
        <Text style={styles.cardBody}>
          3. Create alert record for responders
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
  },
  statusPanel: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: "#fff4f5",
    borderWidth: 1,
    borderColor: "#f2c7cc",
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.primaryDark,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
});
