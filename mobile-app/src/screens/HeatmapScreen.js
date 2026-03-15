import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MapComponent, { defaultRegion } from "../components/MapComponent";
import { defaultBaseUrl, fetchSafetyReports } from "../services/reportService";
import { colors, screenStyles, spacing } from "../utils/theme";

const riskConfig = {
  safe: { label: "Safe", color: "#16a34a" },
  medium: { label: "Medium risk", color: "#facc15" },
  high: { label: "High risk", color: "#dc2626" },
};

const distanceThreshold = 0.008;

const getNearbyReportCount = (reports, currentReport) => {
  return reports.filter((report) => {
    const latitudeGap = Math.abs(
      report.location.latitude - currentReport.location.latitude,
    );
    const longitudeGap = Math.abs(
      report.location.longitude - currentReport.location.longitude,
    );

    return (
      latitudeGap <= distanceThreshold && longitudeGap <= distanceThreshold
    );
  }).length;
};

const getRiskLevel = (reports, report) => {
  const nearbyReportCount = getNearbyReportCount(reports, report);

  if (nearbyReportCount >= 3 || report.type === "harassment") {
    return "high";
  }

  if (nearbyReportCount >= 2 || report.type === "suspicious activity") {
    return "medium";
  }

  return "safe";
};

const buildRegion = (reports) => {
  if (!reports.length) {
    return defaultRegion;
  }

  const latitudes = reports.map((report) => report.location.latitude);
  const longitudes = reports.map((report) => report.location.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2,
    latitudeDelta: Math.max((maxLatitude - minLatitude) * 1.8, 0.03),
    longitudeDelta: Math.max((maxLongitude - minLongitude) * 1.8, 0.03),
  };
};

export default function HeatmapScreen() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      try {
        setErrorMessage("");
        const apiReports = await fetchSafetyReports();

        if (!isMounted) {
          return;
        }

        const validReports = apiReports.filter(
          (report) =>
            report.location &&
            typeof report.location.latitude === "number" &&
            typeof report.location.longitude === "number",
        );

        const normalizedReports = validReports.map((report) => {
          const riskLevel = getRiskLevel(validReports, report);

          return {
            id: report._id,
            title: report.type,
            description: report.description,
            latitude: report.location.latitude,
            longitude: report.location.longitude,
            address: report.location.address,
            timestamp: report.timestamp,
            reporterName: report.userId?.name,
            riskLevel,
            riskLabel: riskConfig[riskLevel].label,
            color: riskConfig[riskLevel].color,
            intensity:
              riskLevel === "high" ? 1 : riskLevel === "medium" ? 0.6 : 0.25,
          };
        });

        setReports(normalizedReports);
        setSelectedReport(normalizedReports[0] || null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error.response?.data?.message ||
            `Unable to load safety reports from ${defaultBaseUrl}/api/reports/list`,
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

  const region = buildRegion(
    reports.map((report) => ({
      location: {
        latitude: report.latitude,
        longitude: report.longitude,
      },
    })),
  );

  const heatmapPoints = reports.map((report) => ({
    latitude: report.latitude,
    longitude: report.longitude,
    weight: report.intensity,
  }));

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Safety Heatmap</Text>
      <Text style={screenStyles.subtitle}>
        Live safety reports are plotted on the map with green, yellow, and red
        risk levels based on report type and nearby incident density.
      </Text>

      <View style={styles.legendRow}>
        {Object.entries(riskConfig).map(([key, risk]) => (
          <View key={key} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: risk.color }]} />
            <Text style={styles.legendText}>{risk.label}</Text>
          </View>
        ))}
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.stateText}>Loading safety reports...</Text>
        </View>
      ) : (
        <>
          <MapComponent
            region={region}
            markers={reports}
            heatmapPoints={heatmapPoints}
            onMarkerPress={setSelectedReport}
          />

          {errorMessage ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>Could not load reports</Text>
              <Text style={styles.errorBody}>{errorMessage}</Text>
              <Text style={styles.errorHint}>
                Confirm the backend is running and that the base URL in
                reportService matches your device.
              </Text>
            </View>
          ) : null}

          {!errorMessage && !reports.length ? (
            <View style={styles.centerState}>
              <Text style={styles.stateText}>
                No safety reports available yet.
              </Text>
            </View>
          ) : null}

          {selectedReport ? (
            <Pressable style={screenStyles.card}>
              <Text style={styles.sectionTitle}>Selected report</Text>
              <View style={styles.detailHeader}>
                <Text style={styles.reportTitle}>{selectedReport.title}</Text>
                <View
                  style={[
                    styles.riskBadge,
                    { backgroundColor: `${selectedReport.color}22` },
                  ]}
                >
                  <Text
                    style={[
                      styles.riskBadgeText,
                      { color: selectedReport.color },
                    ]}
                  >
                    {selectedReport.riskLabel}
                  </Text>
                </View>
              </View>
              <Text style={styles.body}>{selectedReport.description}</Text>
              {selectedReport.address ? (
                <Text style={styles.meta}>
                  Location: {selectedReport.address}
                </Text>
              ) : null}
              {selectedReport.reporterName ? (
                <Text style={styles.meta}>
                  Reported by: {selectedReport.reporterName}
                </Text>
              ) : null}
              <Text style={styles.meta}>
                Coordinates: {selectedReport.latitude.toFixed(5)},{" "}
                {selectedReport.longitude.toFixed(5)}
              </Text>
              {selectedReport.timestamp ? (
                <Text style={styles.meta}>
                  Reported at:{" "}
                  {new Date(selectedReport.timestamp).toLocaleString()}
                </Text>
              ) : null}
            </Pressable>
          ) : null}
        </>
      )}

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Heatmap data sources</Text>
        <Text style={styles.body}>
          Unsafe area reports with location coordinates
        </Text>
        <Text style={styles.body}>Alert density over time</Text>
        <Text style={styles.body}>Journey overdue hotspots</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
  },
  centerState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  stateText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  errorCard: {
    backgroundColor: "#fff4f4",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f4c9c9",
    padding: spacing.lg,
    gap: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  errorBody: {
    color: colors.text,
    lineHeight: 21,
  },
  errorHint: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  reportTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textTransform: "capitalize",
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: "800",
  },
  meta: {
    color: colors.textMuted,
    lineHeight: 21,
    marginTop: 4,
  },
});
