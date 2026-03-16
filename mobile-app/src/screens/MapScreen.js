import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";

import MapComponent from "../components/MapComponent";
import { fetchSafetyReports } from "../services/reportService";
import { colors, screenStyles, spacing } from "../utils/theme";

export default function MapScreen() {
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const reports = await fetchSafetyReports();
        const reportMarkers = reports.map((report) => ({
          id: report.id,
          latitude: report.latitude,
          longitude: report.longitude,
          title: report.type.replace("_", " "),
          description: report.description,
          color:
            report.riskLevel === "high"
              ? "#dc2626"
              : report.riskLevel === "medium"
                ? "#facc15"
                : "#16a34a",
        }));

        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status === "granted") {
          const position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          reportMarkers.unshift({
            id: "current-user",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            title: "You are here",
            description: "Live device location",
            color: "#2563eb",
          });
        }

        setMarkers(reportMarkers);
      } catch (error) {
        setMessage("Unable to load live map markers right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMapData();
  }, []);

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

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.line}>Loading map markers...</Text>
        </View>
      ) : (
        <MapComponent markers={markers} />
      )}

      {message ? (
        <View style={screenStyles.card}>
          <Text style={styles.line}>{message}</Text>
        </View>
      ) : null}

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
  centerState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
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
