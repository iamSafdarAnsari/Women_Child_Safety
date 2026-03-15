import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, screenStyles, spacing } from "../utils/theme";

export default function ProfileScreen() {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Profile</Text>
      <Text style={screenStyles.subtitle}>
        View your account details, emergency preferences, and connected safety
        modules.
      </Text>

      <View style={screenStyles.card}>
        <Text style={styles.name}>Priya Sharma</Text>
        <Text style={styles.meta}>priya@example.com</Text>
        <Text style={styles.meta}>+91 98765 00000</Text>
      </View>

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Safety settings</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Emergency contacts</Text>
          <Text style={styles.value}>3 linked</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Journey tracking</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Text style={styles.value}>On</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  meta: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
  },
  value: {
    color: colors.text,
    fontWeight: "700",
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
});
