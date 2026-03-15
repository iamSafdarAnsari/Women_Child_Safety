import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import MapComponent from "../components/MapComponent";
import { colors, screenStyles, spacing } from "../utils/theme";

const markers = [
  {
    id: "1",
    latitude: 28.6139,
    longitude: 77.209,
    title: "Current area",
    description: "Live location preview",
  },
  {
    id: "2",
    latitude: 28.6229,
    longitude: 77.218,
    title: "Recent report",
    description: "Unsafe road report",
  },
];

export default function MapScreen() {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Safety Map</Text>
      <Text style={screenStyles.subtitle}>
        Explore nearby locations, current position, and marked unsafe area
        reports.
      </Text>

      <MapComponent markers={markers} />

      <View style={screenStyles.card}>
        <Text style={styles.cardTitle}>Map modules</Text>
        <Text style={styles.line}>Current user location</Text>
        <Text style={styles.line}>Journey route visualization</Text>
        <Text style={styles.line}>
          Unsafe area markers for later heatmap overlays
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
  line: {
    color: colors.textMuted,
    lineHeight: 22,
  },
});
