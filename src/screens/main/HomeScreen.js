import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const quickActions = [
  { id: 1, title: 'Start Journey', icon: 'navigate-outline', screen: 'Journey', color: colors.primary, bg: colors.purple[50] },
  { id: 2, title: 'Safety Map', icon: 'map-outline', screen: 'Map', color: colors.secondary, bg: colors.blue[50] },
  { id: 3, title: 'My Contacts', icon: 'people-outline', screen: 'Contacts', color: colors.success, bg: colors.successLight },
  { id: 4, title: 'Heatmap', icon: 'layers-outline', screen: 'Heatmap', color: colors.warning, bg: colors.warningLight },
  { id: 5, title: 'Report', icon: 'flag-outline', screen: 'Report', color: colors.emergency, bg: colors.emergencyLight },
  { id: 6, title: 'Alert History', icon: 'time-outline', screen: 'AlertHistory', color: colors.primaryDark, bg: colors.purple[100] },
];

const safetyTips = [
  'Share your live location with family before traveling at night.',
  'Save emergency contacts in your phone and SafeGuard app.',
  'Trust your instincts — if something feels wrong, seek help immediately.',
];

const HomeScreen = ({ navigation }) => {
  const [tipIndex] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.userName}>Stay Safe, Priya</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={22} color={colors.primary} />
            </View>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Status Banner */}
        <Card style={styles.statusBanner} variant="default" padding="md">
          <View style={styles.statusRow}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>SafeGuard is Active</Text>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
          </View>
          <Text style={styles.statusSubtext}>Your location is being monitored by 3 trusted contacts</Text>
        </Card>

        {/* SOS Button Section */}
        <View style={styles.sosSection}>
          <Text style={styles.sosSectionLabel}>Emergency SOS</Text>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => navigation.navigate('SOS')}
            activeOpacity={0.8}
          >
            <View style={styles.sosOuter}>
              <View style={styles.sosMiddle}>
                <View style={styles.sosInner}>
                  <Text style={styles.sosText}>SOS</Text>
                  <Text style={styles.sosSubText}>Hold for Emergency</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.sosHint}>
            Tap to send emergency alert to all contacts
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { backgroundColor: action.bg }]}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconBg, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={22} color={colors.textLight} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Tip */}
        <Card style={styles.safetyTipCard} variant="default">
          <View style={styles.safetyTipHeader}>
            <Ionicons name="bulb-outline" size={20} color={colors.warning} />
            <Text style={styles.safetyTipTitle}>Safety Tip</Text>
          </View>
          <Text style={styles.safetyTipText}>{safetyTips[tipIndex]}</Text>
        </Card>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AlertHistory')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <Card style={styles.activityCard}>
          {[
            { icon: 'navigate', color: colors.primary, title: 'Journey Completed', time: '2 hrs ago', desc: 'Home → College' },
            { icon: 'location', color: colors.success, title: 'Location Shared', time: '5 hrs ago', desc: 'Shared with Mom & Dad' },
          ].map((item, i) => (
            <View key={i} style={[styles.activityItem, i > 0 && styles.activityDivider]}>
              <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    paddingTop: spacing.base,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  greeting: {
    fontSize: typography.fontSizes.sm,
    color: colors.textMuted,
  },
  userName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  profileButton: {
    position: 'relative',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.purple[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.emergency,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  statusBanner: {
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.successLight,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    flex: 1,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  statusSubtext: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
  },
  sosSection: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius['2xl'],
    ...shadows.lg,
    marginHorizontal: -spacing.xs,
  },
  sosSectionLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.xl,
  },
  sosButton: {
    marginBottom: spacing.base,
  },
  sosOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.emergencyLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.emergency + '40',
  },
  sosMiddle: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: colors.emergency + '30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.emergency + '60',
  },
  sosInner: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: colors.emergency,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.emergency,
  },
  sosText: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.textLight,
    letterSpacing: 3,
  },
  sosSubText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textLight,
    opacity: 0.85,
    marginTop: 2,
  },
  sosHint: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  viewAll: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.medium,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  actionCard: {
    width: '30%',
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadows.sm,
  },
  actionIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  safetyTipCard: {
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    backgroundColor: colors.warningLight,
  },
  safetyTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  safetyTipTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.warning,
  },
  safetyTipText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  activityCard: {
    marginBottom: spacing.base,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  activityDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  activityDesc: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  activityTime: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
  },
});

export default HomeScreen;
