import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Location from "expo-location";

import { createSafetyReport } from "../services/reportService";
import { colors, radius, screenStyles, spacing } from "../utils/theme";

const types = ["harassment", "unsafe_road", "suspicious_activity", "theft"];

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState(types[0]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("Missing details", "Please provide incident details.");
      return;
    }

    setIsSubmitting(true);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permission needed", "Location permission is required.");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      await createSafetyReport({
        type: selectedType,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        description: description.trim(),
        riskLevel:
          selectedType === "harassment" || selectedType === "theft"
            ? "high"
            : "medium",
      });

      setDescription("");
      Alert.alert("Submitted", "Unsafe area report has been saved.");
    } catch (error) {
      Alert.alert(
        "Submission failed",
        error.response?.data?.message || "Unable to create report.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Report Unsafe Area</Text>
      <Text style={screenStyles.subtitle}>
        Capture incidents with category, location, and description so the
        platform can build a better safety heatmap.
      </Text>

      <View style={screenStyles.card}>
        <Text style={styles.sectionTitle}>Report type</Text>
        <View style={styles.typeRow}>
          {types.map((type) => {
            const active = selectedType === type;
            return (
              <Pressable
                key={type}
                style={[styles.typeChip, active && styles.typeChipActive]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    active && styles.typeChipTextActive,
                  ]}
                >
                  {type.replace(/_/g, " ")}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={[screenStyles.input, styles.inputSpacing]}
          placeholder="Describe what happened"
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <Pressable
          style={[screenStyles.button, styles.inputSpacing]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={screenStyles.buttonText}>Submit Report</Text>
          )}
        </Pressable>
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
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
  typeChipActive: {
    backgroundColor: colors.primary,
  },
  typeChipText: {
    color: colors.text,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  typeChipTextActive: {
    color: "#ffffff",
  },
  inputSpacing: {
    marginTop: spacing.md,
  },
});
