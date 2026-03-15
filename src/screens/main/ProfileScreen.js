import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const ProfileScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    locationTracking: true,
    autoSOS: true,
    notifications: true,
    journeyAlerts: true,
    nightMode: false,
    biometric: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsGroups = [
    {
      title: 'Safety Settings',
      items: [
        { key: 'locationTracking', icon: 'location', label: 'Live Location Tracking', desc: 'Share your location with trusted contacts', color: colors.primary },
        { key: 'autoSOS', icon: 'alert-circle', label: 'Auto SOS Detection', desc: 'Detect emergencies automatically', color: colors.emergency },
        { key: 'journeyAlerts', icon: 'navigate', label: 'Journey Alerts', desc: 'Notify contacts during journeys', color: colors.success },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { key: 'notifications', icon: 'notifications', label: 'Push Notifications', desc: 'Receive important alerts', color: colors.warning },
        { key: 'nightMode', icon: 'moon', label: 'Night Mode', desc: 'Switch to dark theme', color: colors.textSecondary },
        { key: 'biometric', icon: 'finger-print', label: 'Biometric Lock', desc: 'Use fingerprint or face ID', color: colors.primary },
      ],
    },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', screen: null, color: colors.primary },
    { icon: 'lock-closed-outline', label: 'Change Password', screen: null, color: colors.textSecondary },
    { icon: 'people-outline', label: 'Emergency Contacts', screen: 'Contacts', color: colors.success },
    { icon: 'document-text-outline', label: 'My Reports', screen: 'Report', color: colors.warning },
    { icon: 'time-outline', label: 'Alert History', screen: 'AlertHistory', color: colors.primary },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: null, color: colors.textMuted },
    { icon: 'shield-outline', label: 'Privacy Policy', screen: null, color: colors.textMuted },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color={colors.textLight} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Priya Sharma</Text>
          <Text style={styles.profileEmail}>priya.sharma@email.com</Text>
          <Text style={styles.profilePhone}>+91 98765 43210</Text>

          <View style={styles.profileStats}>
            {[
              { value: '3', label: 'Contacts' },
              { value: '5', label: 'Alerts' },
              { value: '12', label: 'Journeys' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Safety Score */}
        <Card style={styles.safetyScore}>
          <View style={styles.safetyScoreLeft}>
            <Text style={styles.safetyScoreTitle}>Safety Score</Text>
            <Text style={styles.safetyScoreSubtitle}>Your profile completeness</Text>
          </View>
          <View style={styles.safetyScoreRight}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreValue}>85</Text>
              <Text style={styles.scorePercent}>%</Text>
            </View>
          </View>
          <View style={styles.scoreBarContainer}>
            <View style={[styles.scoreBar, { width: '85%' }]} />
          </View>
        </Card>

        {/* Settings */}
        {settingsGroups.map((group, gi) => (
          <View key={gi}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <Card style={styles.settingsCard}>
              {group.items.map((item, i) => (
                <View key={item.key} style={[styles.settingRow, i > 0 && styles.settingDivider]}>
                  <View style={[styles.settingIcon, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingDesc}>{item.desc}</Text>
                  </View>
                  <Switch
                    value={settings[item.key]}
                    onValueChange={() => toggleSetting(item.key)}
                    trackColor={{ false: colors.border, true: colors.primary + '60' }}
                    thumbColor={settings[item.key] ? colors.primary : colors.textMuted}
                  />
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Account</Text>
        <Card style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuRow, i > 0 && styles.menuDivider]}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout */}
        <Button
          title="Sign Out"
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          size="lg"
          icon={<Ionicons name="log-out-outline" size={20} color={colors.primary} />}
          style={styles.logoutButton}
        />

        <Text style={styles.version}>SafeGuard v1.0.0 • Women & Child Safety Platform</Text>
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
    paddingBottom: spacing['3xl'],
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    ...shadows.sm,
    marginBottom: spacing.base,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.purple[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    ...shadows.md,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  profileName: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    fontSize: typography.fontSizes.sm,
    color: colors.textMuted,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: typography.fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  profileStats: {
    flexDirection: 'row',
    gap: spacing['2xl'],
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  safetyScore: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.base,
    overflow: 'hidden',
  },
  safetyScoreLeft: {
    marginBottom: spacing.md,
  },
  safetyScoreTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  safetyScoreSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  safetyScoreRight: {
    position: 'absolute',
    top: spacing.base,
    right: spacing.base,
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  scoreValue: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.primary,
  },
  scorePercent: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginTop: 4,
  },
  scoreBarContainer: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.sm,
    marginTop: spacing.base,
  },
  settingsCard: {
    marginHorizontal: spacing.xl,
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  settingDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  settingDesc: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  menuCard: {
    marginHorizontal: spacing.xl,
    padding: 0,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  menuDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: typography.fontSizes.base,
    color: colors.textPrimary,
  },
  logoutButton: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  version: {
    textAlign: 'center',
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
});

export default ProfileScreen;
