import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, screenStyles, spacing } from "../utils/theme";

export default function JourneyScreen() {
  const [destination, setDestination] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");

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
          onPress={() => {}}
        >
          <Text style={screenStyles.buttonText}>Start Journey</Text>
        </Pressable>
      </View>

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Live trip status</Text>
        <Text style={styles.body}>Destination: Central Park Drop Point</Text>
        <Text style={styles.body}>Expected arrival: 7:30 PM</Text>
        <Text style={styles.body}>Current status: Monitoring in progress</Text>
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
});
