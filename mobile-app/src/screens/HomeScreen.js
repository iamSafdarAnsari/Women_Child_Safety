import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, screenStyles, shadow, spacing } from "../utils/theme";

const quickActions = [
  { title: "Emergency SOS", icon: "warning-outline", route: "SOS" },
  { title: "Track Journey", icon: "navigate-outline", route: "Journey" },
  { title: "Unsafe Area Map", icon: "map-outline", route: "Map" },
  { title: "Safety Heatmap", icon: "flame-outline", route: "Heatmap" },
  { title: "Emergency Contacts", icon: "people-outline", route: "Contacts" },
  { title: "Report Incident", icon: "flag-outline", route: "Report" },
  { title: "Alert History", icon: "notifications-outline", route: "Alerts" },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <View style={styles.hero}>
        <View style={screenStyles.chip}>
          <Text style={styles.chipText}>Live protection enabled</Text>
        </View>
        <Text style={screenStyles.title}>Women & Child Safety</Text>
        <Text style={screenStyles.subtitle}>
          Access emergency tools, route monitoring, unsafe area reports, and
          emergency contacts from one place.
        </Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Today&apos;s safety summary</Text>
        <Text style={styles.bannerMetric}>3 active contacts ready</Text>
        <Text style={styles.bannerMeta}>
          Journey alerts and unsafe area reports can feed future heatmap
          insights.
        </Text>
      </View>

      <View style={styles.grid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.route}
            style={styles.actionCard}
            onPress={() => navigation.navigate(action.route)}
          >
            <Ionicons name={action.icon} size={26} color={colors.primary} />
            <Text style={styles.actionTitle}>{action.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm,
  },
  chipText: {
    color: colors.accent,
    fontWeight: "700",
  },
  banner: {
    backgroundColor: "#17212b",
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: 8,
    ...shadow,
  },
  bannerTitle: {
    color: "#9ee7dd",
    fontSize: 14,
    fontWeight: "700",
  },
  bannerMetric: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
  },
  bannerMeta: {
    color: "#c2d0db",
    lineHeight: 21,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  actionCard: {
    width: "47%",
    minHeight: 126,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "space-between",
    ...shadow,
  },
  actionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
});
