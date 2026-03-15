import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, screenStyles, spacing } from "../utils/theme";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  return (
    <KeyboardAvoidingView
      style={screenStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[screenStyles.content, styles.wrapper]}>
        <View style={styles.hero}>
          <Text style={screenStyles.title}>Create your safety profile.</Text>
          <Text style={screenStyles.subtitle}>
            Register to store emergency contacts, report unsafe areas, and
            manage live journeys.
          </Text>
        </View>

        <View style={screenStyles.card}>
          <TextInput
            style={screenStyles.input}
            placeholder="Full name"
            placeholderTextColor={colors.textMuted}
            value={form.name}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, name: value }))
            }
          />
          <TextInput
            style={[screenStyles.input, styles.inputSpacing]}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={form.email}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, email: value }))
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[screenStyles.input, styles.inputSpacing]}
            placeholder="Phone"
            placeholderTextColor={colors.textMuted}
            value={form.phone}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, phone: value }))
            }
            keyboardType="phone-pad"
          />
          <TextInput
            style={[screenStyles.input, styles.inputSpacing]}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            value={form.password}
            onChangeText={(value) =>
              setForm((current) => ({ ...current, password: value }))
            }
            secureTextEntry
          />
          <Pressable
            style={[screenStyles.button, styles.inputSpacing]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={screenStyles.buttonText}>Register</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  hero: {
    gap: spacing.sm,
  },
  inputSpacing: {
    marginTop: spacing.md,
  },
  link: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "700",
  },
});
