import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const alerts = [
  {
    id: 1,
    type: 'sos',
    title: 'SOS Alert Sent',
    location: 'Civil Lines, Delhi',
    date: 'Today, 2:30 PM',
    status: 'resolved',
    respondedBy: 'Mom, Dad',
  },
  {
    id: 2,
    type: 'journey',
    title: 'Journey Alert',
    location: 'Connaught Place → Home',
    date: 'Yesterday, 9:15 PM',
    status: 'resolved',
    respondedBy: 'Auto',
  },
  {
    id: 3,
    type: 'sos',
    title: 'SOS Alert Sent',
    location: 'Khan Market, Delhi',
    date: 'Mar 10, 11:45 PM',
    status: 'resolved',
    respondedBy: 'Police, Mom',
  },
  {
    id: 4,
    type: 'location',
    title: 'Location Shared',
    location: 'Lajpat Nagar, Delhi',
    date: 'Mar 8, 7:00 PM',
    status: 'completed',
    respondedBy: '—',
  },
  {
    id: 5,
    type: 'journey',
    title: 'Late Arrival Alert',
    location: 'Home Route',
    date: 'Mar 5, 10:30 PM',
    status: 'resolved',
    respondedBy: 'Dad',
  },
];

const alertConfig = {
  sos: { icon: 'alert-circle', color: colors.emergency, bg: colors.emergencyLight, label: 'SOS' },
  journey: { icon: 'navigate', color: colors.primary, bg: colors.purple[50], label: 'Journey' },
  location: { icon: 'location', color: colors.success, bg: colors.successLight, label: 'Location' },
};

const statusConfig = {
  resolved: { color: colors.success, bg: colors.successLight, label: 'Resolved' },
  completed: { color: colors.primary, bg: colors.purple[50], label: 'Completed' },
  pending: { color: colors.warning, bg: colors.warningLight, label: 'Pending' },
};

const AlertHistoryScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.type === filter);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alert History</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{alerts.length}</Text>
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { label: 'Total Alerts', value: alerts.length, color: colors.primary },
          { label: 'SOS Sent', value: alerts.filter((a) => a.type === 'sos').length, color: colors.emergency },
          { label: 'All Resolved', value: alerts.filter((a) => a.status === 'resolved').length, color: colors.success },
        ].map((stat, i) => (
          <View key={i} style={styles.statItem}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {['all', 'sos', 'journey', 'location'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alert List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No alerts found</Text>
          </View>
        ) : (
          filtered.map((alert, index) => {
            const config = alertConfig[alert.type];
            const sConfig = statusConfig[alert.status];
            return (
              <Card key={alert.id} style={styles.alertCard}>
                {/* Timeline dot */}
                <View style={styles.timelineColumn}>
                  <View style={[styles.typeDot, { backgroundColor: config.bg, borderColor: config.color }]}>
                    <Ionicons name={config.icon} size={18} color={config.color} />
                  </View>
                  {index < filtered.length - 1 && <View style={styles.timelineLine} />}
                </View>

                {/* Content */}
                <View style={styles.alertContent}>
                  <View style={styles.alertHeader}>
                    <View style={[styles.typeBadge, { backgroundColor: config.bg, borderColor: config.color }]}>
                      <Text style={[styles.typeBadgeText, { color: config.color }]}>{config.label}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: sConfig.bg, borderColor: sConfig.color }]}>
                      <Ionicons name="checkmark-circle" size={12} color={sConfig.color} />
                      <Text style={[styles.statusText, { color: sConfig.color }]}>{sConfig.label}</Text>
                    </View>
                  </View>

                  <Text style={styles.alertTitle}>{alert.title}</Text>

                  <View style={styles.alertMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.metaText}>{alert.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                      <Text style={styles.metaText}>{alert.date}</Text>
                    </View>
                    {alert.respondedBy !== '—' && (
                      <View style={styles.metaItem}>
                        <Ionicons name="people-outline" size={13} color={colors.textMuted} />
                        <Text style={styles.metaText}>Responded: {alert.respondedBy}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </Card>
            );
          })
        )}
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
    flex: 1,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  headerBadge: {
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.textLight,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  statValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  filterRow: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxHeight: 52,
  },
  filterContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.full,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  filterTextActive: {
    color: colors.textLight,
    fontWeight: typography.fontWeights.semibold,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    paddingBottom: spacing['3xl'],
  },
  alertCard: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.base,
    overflow: 'visible',
  },
  timelineColumn: {
    alignItems: 'center',
  },
  typeDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
    minHeight: spacing.xl,
  },
  alertContent: {
    flex: 1,
    paddingBottom: spacing.xs,
  },
  alertHeader: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
  },
  typeBadge: {
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
  },
  statusText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
  },
  alertTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  alertMeta: {
    gap: spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    gap: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSizes.base,
    color: colors.textMuted,
  },
});

export default AlertHistoryScreen;
