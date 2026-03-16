import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { fetchJourneys, startJourney } from "../services/reportService";
import { colors, screenStyles, spacing } from "../utils/theme";

export default function JourneyScreen() {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJourneys = async () => {
    try {
      const result = await fetchJourneys();
      setJourneys(result);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch journeys.");
    }
  };

  useEffect(() => {
    loadJourneys();
  }, []);

  const handleStartJourney = async () => {
    if (!startLocation || !destination || !expectedArrival) {
      Alert.alert("Missing fields", "Please complete all journey details.");
      return;
    }

    setLoading(true);
    try {
      await startJourney({
        userId: "u1",
        startLocation,
        destination,
        expectedArrival,
      });
      setStartLocation("");
      setDestination("");
      setExpectedArrival("");
      await loadJourneys();
      Alert.alert("Journey started", "Journey has been saved successfully.");
    } catch (error) {
      Alert.alert(
        "Unable to start",
        error.response?.data?.message || "Journey could not be started.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Journey Tracking</Text>
      <Text style={screenStyles.subtitle}>
        Start a monitored trip, update your live location, and trigger overdue
        alerts if arrival time is missed.
      </Text>

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Start a new journey</Text>
        <TextInput
          style={screenStyles.input}
          placeholder="Start location"
          placeholderTextColor={colors.textMuted}
          value={startLocation}
          onChangeText={setStartLocation}
        />
        <TextInput
          style={[screenStyles.input, styles.inputSpacing]}
          placeholder="Destination"
          placeholderTextColor={colors.textMuted}
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={[screenStyles.input, styles.inputSpacing]}
          placeholder="Expected arrival time"
          placeholderTextColor={colors.textMuted}
          value={expectedArrival}
          onChangeText={setExpectedArrival}
        />
        <Pressable
          style={[screenStyles.button, styles.inputSpacing]}
          onPress={handleStartJourney}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={screenStyles.buttonText}>Start Journey</Text>
          )}
        </Pressable>
      </View>

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Journey history</Text>
        {journeys.slice(0, 4).map((journey) => (
          <View key={journey.id} style={styles.historyItem}>
            <Text style={styles.body}>
              {journey.startLocation} to {journey.destination}
            </Text>
            <Text style={styles.body}>Status: {journey.status}</Text>
            <Text style={styles.body}>ETA: {journey.expectedArrival}</Text>
          </View>
        ))}
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
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
  },
  inputSpacing: {
    marginTop: spacing.md,
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
