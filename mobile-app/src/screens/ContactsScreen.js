import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import ContactCard from "../components/ContactCard";
import { colors, screenStyles, spacing } from "../utils/theme";

const contacts = [
  { id: "1", name: "Asha Singh", relation: "Mother", phone: "+91 98765 11111" },
  { id: "2", name: "Neha Verma", relation: "Friend", phone: "+91 98765 22222" },
  {
    id: "3",
    name: "Rohit Kumar",
    relation: "Guardian",
    phone: "+91 98765 33333",
  },
];

export default function ContactsScreen() {
  return (
    <ScrollView
      style={screenStyles.container}
      contentContainerStyle={screenStyles.content}
    >
      <Text style={screenStyles.title}>Emergency Contacts</Text>
      <Text style={screenStyles.subtitle}>
        Manage the trusted contacts who should receive SOS alerts and journey
        updates.
      </Text>

      {contacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}

      <Text style={styles.footerText}>
        Starter UI only. Add backend sync and CRUD flows next.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footerText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.sm,
  },
});
