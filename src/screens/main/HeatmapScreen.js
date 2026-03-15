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
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const zones = [
  { id: 1, label: 'High Risk Zone', type: 'unsafe', x: '12%', y: '20%', w: 80, h: 60, reports: 12 },
  { id: 2, label: 'Safe Area', type: 'safe', x: '55%', y: '35%', w: 90, h: 70, reports: 0 },
  { id: 3, label: 'Moderate Risk', type: 'moderate', x: '30%', y: '60%', w: 70, h: 55, reports: 4 },
  { id: 4, label: 'Safe Area', type: 'safe', x: '65%', y: '15%', w: 75, h: 60, reports: 0 },
  { id: 5, label: 'High Risk Zone', type: 'unsafe', x: '5%', y: '65%', w: 65, h: 50, reports: 8 },
];

const zoneColors = {
  safe: { bg: colors.safeZone + '50', border: colors.safeZone, text: colors.safeZone },
  unsafe: { bg: colors.unsafeZone + '40', border: colors.unsafeZone, text: colors.unsafeZone },
  moderate: { bg: colors.moderateZone + '40', border: colors.moderateZone, text: colors.moderateZone },
};

const HeatmapScreen = ({ navigation }) => {
  const [selectedZone, setSelectedZone] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Heatmap</Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {[
          { type: 'safe', label: 'Safe Zone' },
          { type: 'moderate', label: 'Moderate Risk' },
          { type: 'unsafe', label: 'High Risk' },
        ].map((item) => (
          <View key={item.type} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: zoneColors[item.type].bg, borderColor: zoneColors[item.type].border }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Heatmap */}
      <View style={styles.mapContainer}>
        <View style={styles.mapBg}>
          {/* Grid */}
          {[25, 50, 75].map((p) => (
            <View key={`h${p}`} style={[styles.gridH, { top: `${p}%` }]} />
          ))}
          {[33, 66].map((p) => (
            <View key={`v${p}`} style={[styles.gridV, { left: `${p}%` }]} />
          ))}

          {/* Zones */}
          {zones.map((zone) => (
            <TouchableOpacity
              key={zone.id}
              style={[
                styles.zone,
                {
                  left: zone.x,
                  top: zone.y,
                  width: zone.w,
                  height: zone.h,
                  backgroundColor: zoneColors[zone.type].bg,
                  borderColor: zoneColors[zone.type].border,
                },
              ]}
              onPress={() => setSelectedZone(zone)}
              activeOpacity={0.8}
            >
              {zone.type !== 'safe' && (
                <Text style={[styles.zoneReportCount, { color: zoneColors[zone.type].text }]}>
                  {zone.reports}
                </Text>
              )}
            </TouchableOpacity>
          ))}

          {/* User location */}
          <View style={styles.userLocation}>
            <View style={styles.userDot}>
              <Ionicons name="person" size={12} color={colors.textLight} />
            </View>
            <View style={styles.userPulse} />
          </View>
        </View>
      </View>

      {/* Zone Info List */}
      <ScrollView style={styles.zoneList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Area Reports</Text>
        {zones.filter((z) => z.type !== 'safe').map((zone, i) => (
          <Card key={i} style={styles.zoneCard}>
            <View style={styles.zoneCardLeft}>
              <View style={[styles.zoneTypeIcon, { backgroundColor: zoneColors[zone.type].bg, borderColor: zoneColors[zone.type].border }]}>
                <Ionicons
                  name={zone.type === 'unsafe' ? 'warning' : 'alert-circle'}
                  size={18}
                  color={zoneColors[zone.type].text}
                />
              </View>
              <View>
                <Text style={[styles.zoneTypeName, { color: zoneColors[zone.type].text }]}>
                  {zone.label}
                </Text>
                <Text style={styles.zoneReports}>{zone.reports} incidents reported</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setSelectedZone(zone)}>
              <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          </Card>
        ))}

        <Card style={styles.safeCard} variant="success">
          <View style={styles.zoneCardLeft}>
            <View style={[styles.zoneTypeIcon, { backgroundColor: colors.safeZone + '30', borderColor: colors.safeZone }]}>
              <Ionicons name="shield-checkmark" size={18} color={colors.safeZone} />
            </View>
            <View>
              <Text style={[styles.zoneTypeName, { color: colors.safeZone }]}>2 Safe Zones Nearby</Text>
              <Text style={styles.zoneReports}>No incidents reported in 30 days</Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      {/* Zone Detail Modal */}
      <Modal
        visible={!!selectedZone}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedZone(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedZone && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[
                    styles.modalIcon,
                    { backgroundColor: zoneColors[selectedZone.type]?.bg, borderColor: zoneColors[selectedZone.type]?.border }
                  ]}>
                    <Ionicons
                      name={selectedZone.type === 'unsafe' ? 'warning' : selectedZone.type === 'safe' ? 'shield-checkmark' : 'alert-circle'}
                      size={28}
                      color={zoneColors[selectedZone.type]?.text}
                    />
                  </View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{selectedZone.label}</Text>
                    <Text style={[styles.modalRisk, { color: zoneColors[selectedZone.type]?.text }]}>
                      {selectedZone.type === 'safe' ? 'Safe Area' : selectedZone.type === 'moderate' ? 'Exercise Caution' : 'Avoid if Possible'}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedZone(null)}>
                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalStats}>
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>{selectedZone.reports}</Text>
                    <Text style={styles.modalStatLabel}>Reports</Text>
                  </View>
                  <View style={styles.modalStatDivider} />
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>30d</Text>
                    <Text style={styles.modalStatLabel}>Period</Text>
                  </View>
                  <View style={styles.modalStatDivider} />
                  <View style={styles.modalStat}>
                    <Text style={styles.modalStatValue}>
                      {selectedZone.type === 'safe' ? 'Low' : selectedZone.type === 'moderate' ? 'Med' : 'High'}
                    </Text>
                    <Text style={styles.modalStatLabel}>Risk Level</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.reportButton}
                  onPress={() => {
                    setSelectedZone(null);
                    navigation.navigate('Report');
                  }}
                >
                  <Ionicons name="flag" size={18} color={colors.textLight} />
                  <Text style={styles.reportButtonText}>Report Incident Here</Text>
                </TouchableOpacity>
              </>
            )}
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
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  legendLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  mapContainer: {
    height: 250,
  },
  mapBg: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    position: 'relative',
    overflow: 'hidden',
  },
  gridH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  gridV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  zone: {
    position: 'absolute',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneReportCount: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
  },
  userLocation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.textLight,
    zIndex: 2,
    ...shadows.md,
  },
  userPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '30',
    borderWidth: 1,
    borderColor: colors.primary + '50',
  },
  zoneList: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  listTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  zoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  zoneCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  zoneTypeIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  zoneTypeName: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  zoneReports: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  safeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing['2xl'],
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
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  modalRisk: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    marginTop: 2,
  },
  modalStats: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  modalStat: {
    flex: 1,
    alignItems: 'center',
  },
  modalStatValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  modalStatLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  modalStatDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.base,
    ...shadows.md,
    marginBottom: spacing.base,
  },
  reportButtonText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textLight,
  },
});

export default HeatmapScreen;
