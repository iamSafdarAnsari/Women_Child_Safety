import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const incidentTypes = [
  { id: 'harassment', label: 'Harassment', icon: 'person-remove', color: colors.emergency },
  { id: 'unsafe_road', label: 'Unsafe Road', icon: 'warning', color: colors.warning },
  { id: 'suspicious', label: 'Suspicious Activity', icon: 'eye', color: colors.primary },
  { id: 'poor_lighting', label: 'Poor Lighting', icon: 'flashlight-off', color: colors.textSecondary },
  { id: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: colors.textMuted },
];

const ReportScreen = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Civil Lines, Delhi');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedType || !description) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={72} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>Report Submitted!</Text>
          <Text style={styles.successSubtitle}>
            Thank you for helping keep the community safe. Your report has been submitted successfully.
          </Text>
          <View style={styles.reportIdBadge}>
            <Ionicons name="document-text" size={16} color={colors.primary} />
            <Text style={styles.reportIdText}>Report ID: #RPT2024031523</Text>
          </View>
          <Button
            title="Back to Home"
            onPress={() => {
              setSubmitted(false);
              navigation.navigate('Home');
            }}
            variant="primary"
            size="lg"
            style={styles.backButton}
          />
          <Button
            title="Submit Another Report"
            onPress={() => {
              setSubmitted(false);
              setSelectedType('');
              setDescription('');
            }}
            variant="outline"
            size="md"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Incident</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <Card style={styles.infoBanner} variant="default">
          <View style={styles.infoBannerRow}>
            <Ionicons name="shield" size={20} color={colors.primary} />
            <Text style={styles.infoBannerText}>
              Your report helps keep the community safer. All reports are reviewed by our safety team.
            </Text>
          </View>
        </Card>

        {/* Incident Type */}
        <Text style={styles.sectionLabel}>Type of Incident *</Text>
        <View style={styles.typeGrid}>
          {incidentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardSelected,
                selectedType === type.id && { borderColor: type.color },
              ]}
              onPress={() => setSelectedType(type.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.typeIcon,
                { backgroundColor: type.color + '20' },
                selectedType === type.id && { backgroundColor: type.color + '30' },
              ]}>
                <Ionicons name={type.icon} size={20} color={type.color} />
              </View>
              <Text style={[
                styles.typeLabel,
                selectedType === type.id && { color: type.color, fontWeight: typography.fontWeights.semibold },
              ]}>
                {type.label}
              </Text>
              {selectedType === type.id && (
                <View style={[styles.typeCheck, { backgroundColor: type.color }]}>
                  <Ionicons name="checkmark" size={10} color={colors.textLight} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Location */}
        <Text style={styles.sectionLabel}>Location *</Text>
        <Card style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={styles.locationIconBg}>
              <Ionicons name="location" size={20} color={colors.primary} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>{location}</Text>
              <Text style={styles.locationSubtitle}>GPS location detected</Text>
            </View>
            <TouchableOpacity
              style={styles.changeLocationBtn}
              onPress={() => setLocation('Connaught Place, Delhi')}
            >
              <Text style={styles.changeLocationText}>Change</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Description */}
        <Input
          label="Description *"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe what happened in detail..."
          multiline
          numberOfLines={4}
          leftIcon="document-text-outline"
          style={{ marginBottom: 0 }}
        />
        <Text style={styles.characterCount}>{description.length}/500 characters</Text>

        {/* Anonymous Toggle */}
        <Card style={styles.anonymousCard}>
          <View style={styles.anonymousRow}>
            <View style={styles.anonymousLeft}>
              <Ionicons name="person-circle-outline" size={22} color={colors.textSecondary} />
              <View>
                <Text style={styles.anonymousTitle}>Submit Anonymously</Text>
                <Text style={styles.anonymousSubtitle}>Your identity won't be shared</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, anonymous && styles.toggleActive]}
              onPress={() => setAnonymous(!anonymous)}
            >
              <View style={[styles.toggleThumb, anonymous && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Evidence Notice */}
        <Card style={styles.evidenceCard} variant="default">
          <View style={styles.evidenceRow}>
            <Ionicons name="camera-outline" size={20} color={colors.textMuted} />
            <View style={styles.evidenceInfo}>
              <Text style={styles.evidenceTitle}>Add Photo/Video Evidence</Text>
              <Text style={styles.evidenceSubtitle}>Optional - tap to attach media</Text>
            </View>
            <TouchableOpacity style={styles.evidenceButton}>
              <Ionicons name="add-circle" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Submit Button */}
        <Button
          title="Submit Report"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!selectedType || !description}
          icon={<Ionicons name="flag" size={20} color={colors.textLight} />}
          style={styles.submitButton}
        />
      </ScrollView>
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
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    paddingBottom: spacing['3xl'],
  },
  infoBanner: {
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.purple[50],
  },
  infoBannerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  infoBannerText: {
    flex: 1,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  typeCard: {
    width: '30%',
    flexGrow: 1,
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    position: 'relative',
    ...shadows.sm,
  },
  typeCardSelected: {
    borderWidth: 2,
  },
  typeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  typeCheck: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationCard: {
    marginBottom: spacing.xl,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locationIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.purple[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  locationSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  changeLocationBtn: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.purple[50],
    borderWidth: 1,
    borderColor: colors.primary,
  },
  changeLocationText: {
    fontSize: typography.fontSizes.xs,
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
  characterCount: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  anonymousCard: {
    marginBottom: spacing.base,
  },
  anonymousRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  anonymousLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  anonymousTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  anonymousSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.border,
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.textLight,
    ...shadows.sm,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  evidenceCard: {
    marginBottom: spacing.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  evidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  evidenceInfo: {
    flex: 1,
  },
  evidenceTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.textSecondary,
  },
  evidenceSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  evidenceButton: {},
  submitButton: {
    width: '100%',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  successIcon: {
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  successSubtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  reportIdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.purple[50],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: spacing['2xl'],
  },
  reportIdText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
  backButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
});

export default ReportScreen;
