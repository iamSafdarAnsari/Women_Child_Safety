import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, shadow } from "../utils/theme";

export default function AlertCard({ title, timestamp, status, details }) {
  const statusColor =
    status === "Resolved"
      ? colors.success
      : status === "Monitoring"
        ? colors.warning
        : colors.primary;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="alert-circle" size={20} color={statusColor} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          style={[styles.statusPill, { backgroundColor: `${statusColor}18` }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
  },
  details: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statusPill: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
