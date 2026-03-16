import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";

import AlertCard from "../components/AlertCard";
import { fetchAlerts } from "../services/reportService";
import { screenStyles } from "../utils/theme";

export default function AlertHistoryScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();
  }, []);

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

      {loading ? <ActivityIndicator size="large" /> : null}

      {!loading
        ? alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              id={alert.id}
              title={`${alert.triggerType} SOS`}
              timestamp={new Date(alert.timestamp).toLocaleString()}
              status={alert.status}
              details={`User ${alert.userId} at ${alert.latitude.toFixed(5)}, ${alert.longitude.toFixed(5)}`}
            />
          ))
        : null}
    </ScrollView>
  );
}
