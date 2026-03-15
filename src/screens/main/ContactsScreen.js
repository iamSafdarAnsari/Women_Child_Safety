import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const initialContacts = [
  { id: 1, name: 'Mom', phone: '+91 98765 43210', relation: 'Parent', color: colors.emergency, initials: 'M' },
  { id: 2, name: 'Dad', phone: '+91 87654 32109', relation: 'Parent', color: colors.primary, initials: 'D' },
  { id: 3, name: 'Rahul (Brother)', phone: '+91 76543 21098', relation: 'Sibling', color: colors.success, initials: 'R' },
];

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');

  const handleAddContact = () => {
    if (!newName || !newPhone) return;
    const colors_arr = [colors.primary, colors.success, colors.warning, colors.secondary];
    const newContact = {
      id: Date.now(),
      name: newName,
      phone: newPhone,
      relation: newRelation || 'Friend',
      color: colors_arr[contacts.length % colors_arr.length],
      initials: newName.charAt(0).toUpperCase(),
    };
    setContacts([...contacts, newContact]);
    setShowAdd(false);
    setNewName('');
    setNewPhone('');
    setNewRelation('');
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity
          style={styles.addHeaderBtn}
          onPress={() => setShowAdd(true)}
        >
          <Ionicons name="add" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <Card style={styles.infoCard} variant="default">
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="people" size={20} color={colors.primary} />
            </View>
            <Text style={styles.infoText}>
              {contacts.length} trusted contact{contacts.length !== 1 ? 's' : ''} will be notified during emergencies
            </Text>
          </View>
        </Card>

        {/* Contact Cards */}
        <Text style={styles.sectionTitle}>Trusted Contacts ({contacts.length}/10)</Text>
        {contacts.map((contact) => (
          <Card key={contact.id} style={styles.contactCard}>
            {/* Avatar */}
            <View style={[styles.avatar, { backgroundColor: contact.color }]}>
              <Text style={styles.avatarText}>{contact.initials}</Text>
            </View>

            {/* Info */}
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
              <View style={[styles.relationBadge, { backgroundColor: contact.color + '20', borderColor: contact.color }]}>
                <Text style={[styles.relationText, { color: contact.color }]}>{contact.relation}</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.contactActions}>
              <TouchableOpacity style={[styles.actionBtn, styles.callBtn]}>
                <Ionicons name="call" size={18} color={colors.success} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, styles.messageBtn]}>
                <Ionicons name="chatbubble" size={18} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.deleteBtn]}
                onPress={() => handleDelete(contact.id)}
              >
                <Ionicons name="trash-outline" size={18} color={colors.emergency} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        {/* Add Contact Button */}
        <TouchableOpacity
          style={styles.addContactBtn}
          onPress={() => setShowAdd(true)}
        >
          <View style={styles.addContactIcon}>
            <Ionicons name="add" size={24} color={colors.primary} />
          </View>
          <Text style={styles.addContactText}>Add Emergency Contact</Text>
        </TouchableOpacity>

        {/* SOS Note */}
        <Card style={styles.sosNote} variant="default">
          <View style={styles.sosNoteHeader}>
            <Ionicons name="alert-circle" size={18} color={colors.emergency} />
            <Text style={styles.sosNoteTitle}>During Emergency</Text>
          </View>
          <Text style={styles.sosNoteText}>
            All contacts will receive your live location and an emergency alert message via SMS and notification when you press SOS.
          </Text>
        </Card>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={showAdd}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAdd(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <TouchableOpacity onPress={() => setShowAdd(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Full Name"
              value={newName}
              onChangeText={setNewName}
              placeholder="Contact's name"
              leftIcon="person-outline"
              autoCapitalize="words"
            />
            <Input
              label="Phone Number"
              value={newPhone}
              onChangeText={setNewPhone}
              placeholder="+91 98765 43210"
              keyboardType="phone-pad"
              leftIcon="call-outline"
            />
            <Input
              label="Relationship"
              value={newRelation}
              onChangeText={setNewRelation}
              placeholder="e.g., Parent, Friend, Sibling"
              leftIcon="heart-outline"
              autoCapitalize="words"
            />

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowAdd(false)}
                variant="outline"
                size="md"
                style={{ flex: 1 }}
              />
              <Button
                title="Add Contact"
                onPress={handleAddContact}
                variant="primary"
                size="md"
                disabled={!newName || !newPhone}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    gap: spacing.md,
    ...shadows.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.purple[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  addHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.purple[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    paddingBottom: spacing['3xl'],
  },
  infoCard: {
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.successLight,
    backgroundColor: colors.successLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.purple[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.base,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textLight,
  },
  contactInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  contactName: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  contactPhone: {
    fontSize: typography.fontSizes.sm,
    color: colors.textMuted,
  },
  relationBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  relationText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
  },
  contactActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtn: {
    backgroundColor: colors.successLight,
  },
  messageBtn: {
    backgroundColor: colors.purple[50],
  },
  deleteBtn: {
    backgroundColor: colors.emergencyLight,
  },
  addContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.base,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    backgroundColor: colors.purple[50],
    marginBottom: spacing.xl,
  },
  addContactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.purple[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContactText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
  sosNote: {
    borderLeftWidth: 4,
    borderLeftColor: colors.emergency,
    backgroundColor: colors.emergencyLight,
  },
  sosNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sosNoteTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.emergency,
  },
  sosNoteText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    padding: spacing.xl,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.base,
  },
});

export default ContactsScreen;
