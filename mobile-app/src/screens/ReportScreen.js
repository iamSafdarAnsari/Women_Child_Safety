import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, radius, screenStyles, spacing } from "../utils/theme";

const types = ["harassment", "unsafe road", "suspicious activity"];

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState(types[0]);
  const [description, setDescription] = useState("");

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
                  {type}
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
          onPress={() => {}}
        >
          <Text style={screenStyles.buttonText}>Submit Report</Text>
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
