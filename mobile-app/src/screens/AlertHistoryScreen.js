import React from "react";
import { ScrollView, Text } from "react-native";

import AlertCard from "../components/AlertCard";
import { screenStyles } from "../utils/theme";

const alerts = [
  {
    id: "1",
    title: "SOS Triggered",
    timestamp: "Today, 4:20 PM",
    status: "Active",
    details: "Emergency alert sent with live coordinates to selected contacts.",
  },
  {
    id: "2",
    title: "Journey Overdue",
    timestamp: "Yesterday, 8:05 PM",
    status: "Monitoring",
    details: "Expected arrival was exceeded and an overdue alert was created.",
  },
  {
    id: "3",
    title: "Unsafe Area Report Logged",
    timestamp: "Mar 12, 6:45 PM",
    status: "Resolved",
    details: "Suspicious activity report was saved for safety map analysis.",
  },
];

export default function AlertHistoryScreen() {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Alert History</Text>
      <Text style={screenStyles.subtitle}>
        Review past SOS alerts, unsafe area reports, and automated journey
        warnings.
      </Text>

      {alerts.map((alert) => (
        <AlertCard key={alert.id} {...alert} />
      ))}
    </ScrollView>
  );
}
