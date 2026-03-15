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
import Button from '../../components/Button';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const markers = [
  { id: 1, type: 'police', label: 'Police Station', x: '15%', y: '25%', color: colors.primary },
  { id: 2, type: 'hospital', label: 'Hospital', x: '70%', y: '40%', color: colors.success },
  { id: 3, type: 'guardian', label: 'Mom', x: '45%', y: '60%', color: colors.warning },
  { id: 4, type: 'user', label: 'You', x: '52%', y: '50%', color: colors.emergency },
];

const MapScreen = ({ navigation }) => {
  const [sharing, setSharing] = useState(false);

  const handleShare = () => {
    setSharing(true);
    setTimeout(() => setSharing(false), 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Location</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          {/* Grid lines */}
          {[20, 40, 60, 80].map((p) => (
            <View key={`h${p}`} style={[styles.gridLineH, { top: `${p}%` }]} />
          ))}
          {[25, 50, 75].map((p) => (
            <View key={`v${p}`} style={[styles.gridLineV, { left: `${p}%` }]} />
          ))}

          {/* Road-like shapes */}
          <View style={[styles.road, { top: '50%', left: 0, right: 0, height: 8 }]} />
          <View style={[styles.road, { left: '40%', top: 0, bottom: 0, width: 8 }]} />

          {/* Markers */}
          {markers.map((marker) => (
            <View
              key={marker.id}
              style={[styles.markerWrapper, { top: marker.y, left: marker.x }]}
            >
              <View style={[styles.marker, { backgroundColor: marker.color }]}>
                <Ionicons
                  name={
                    marker.type === 'user'
                      ? 'person'
                      : marker.type === 'police'
                      ? 'shield'
                      : marker.type === 'hospital'
                      ? 'medical'
                      : 'heart'
                  }
                  size={14}
                  color={colors.textLight}
                />
              </View>
              <View style={[styles.markerLabel, { backgroundColor: marker.color }]}>
                <Text style={styles.markerLabelText}>{marker.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Ionicons name="add" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Ionicons name="remove" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Ionicons name="locate" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Panel */}
      <ScrollView style={styles.bottomPanel} showsVerticalScrollIndicator={false}>
        {/* Location Info */}
        <Card style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIconBg}>
              <Ionicons name="location" size={20} color={colors.primary} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>Civil Lines, Delhi</Text>
              <Text style={styles.locationCoords}>28.6792° N, 77.2318° E</Text>
            </View>
            <View style={styles.accuracyBadge}>
              <Text style={styles.accuracyText}>±5m</Text>
            </View>
          </View>
        </Card>

        {/* Nearby Services */}
        <Text style={styles.nearbyTitle}>Nearby Safety Services</Text>
        <View style={styles.servicesList}>
          {[
            { icon: 'shield', label: 'Police Station', dist: '0.4 km', color: colors.primary },
            { icon: 'medical', label: 'Hospital', dist: '1.2 km', color: colors.success },
            { icon: 'call', label: 'Women Helpline', dist: 'Dial 1091', color: colors.emergency },
          ].map((s, i) => (
            <Card key={i} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: s.color + '20' }]}>
                <Ionicons name={s.icon} size={20} color={s.color} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLabel}>{s.label}</Text>
                <Text style={styles.serviceDist}>{s.dist}</Text>
              </View>
              <TouchableOpacity style={styles.serviceAction}>
                <Ionicons name="navigate" size={18} color={colors.primary} />
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Share Button */}
        <Button
          title={sharing ? 'Sharing Location...' : 'Share Live Location'}
          onPress={handleShare}
          variant={sharing ? 'success' : 'primary'}
          size="lg"
          icon={<Ionicons name="share-outline" size={20} color={colors.textLight} />}
          style={styles.shareButton}
          loading={sharing}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  headerTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.emergencyLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.emergency + '40',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emergency,
  },
  liveText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
    color: colors.emergency,
    letterSpacing: 1,
  },
  mapContainer: {
    height: 260,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    overflow: 'hidden',
    position: 'relative',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  road: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  markerWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.textLight,
    ...shadows.md,
  },
  markerLabel: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.sm,
    marginTop: 2,
  },
  markerLabelText: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: typography.fontWeights.bold,
  },
  mapControls: {
    position: 'absolute',
    right: spacing.base,
    top: spacing.base,
    gap: spacing.xs,
  },
  mapControlBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  bottomPanel: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
  },
  locationCard: {
    marginBottom: spacing.base,
  },
  locationHeader: {
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
  locationCoords: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  accuracyBadge: {
    backgroundColor: colors.successLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.success,
  },
  accuracyText: {
    fontSize: typography.fontSizes.xs,
    color: colors.success,
    fontWeight: typography.fontWeights.bold,
  },
  nearbyTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  servicesList: {
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  serviceDist: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  serviceAction: {
    padding: spacing.xs,
  },
  shareButton: {
    marginBottom: spacing['2xl'],
  },
});

export default MapScreen;
