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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={screenStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[screenStyles.content, styles.wrapper]}>
        <View style={styles.hero}>
          <Text style={screenStyles.title}>Stay connected to safety.</Text>
          <Text style={screenStyles.subtitle}>
            Login to access SOS, journey tracking, unsafe area reports, and
            alert history.
          </Text>
        </View>

        <View style={screenStyles.card}>
          <TextInput
            style={screenStyles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[screenStyles.input, styles.inputSpacing]}
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            style={[screenStyles.button, styles.inputSpacing]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={screenStyles.buttonText}>Login</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>New here? Create an account</Text>
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
