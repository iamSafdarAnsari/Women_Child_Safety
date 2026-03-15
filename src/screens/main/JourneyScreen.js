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
import Input from '../../components/Input';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const JourneyScreen = ({ navigation }) => {
  const [destination, setDestination] = useState('');
  const [journeyActive, setJourneyActive] = useState(false);
  const [shareActive, setShareActive] = useState(false);

  const handleStartJourney = () => {
    if (!destination) return;
    setJourneyActive(true);
  };

  const handleShareJourney = () => {
    setShareActive(true);
    setTimeout(() => setShareActive(false), 3000);
  };

  const handleEndJourney = () => {
    setJourneyActive(false);
    setDestination('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Journey Tracking</Text>
        {journeyActive && (
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <View style={styles.mapContainer}>
          <View style={styles.mapBg}>
            {/* Route visualization */}
            <View style={styles.routeLine} />

            {/* Start Marker */}
            <View style={[styles.routeMarker, styles.startMarker]}>
              <Ionicons name="location" size={16} color={colors.textLight} />
            </View>

            {/* End Marker */}
            <View style={[styles.routeMarker, styles.endMarker]}>
              <Ionicons name="flag" size={16} color={colors.textLight} />
            </View>

            {/* User position on route */}
            {journeyActive && (
              <View style={styles.userPosition}>
                <View style={styles.userDot}>
                  <Ionicons name="navigate" size={12} color={colors.textLight} />
                </View>
                <View style={styles.userPulse} />
              </View>
            )}

            {/* Grid */}
            {[30, 60].map((p) => (
              <View key={p} style={[styles.gridH, { top: `${p}%` }]} />
            ))}
            {[33, 66].map((p) => (
              <View key={p} style={[styles.gridV, { left: `${p}%` }]} />
            ))}
          </View>
        </View>

        {/* Journey Info Cards */}
        {journeyActive && (
          <View style={styles.journeyStats}>
            {[
              { icon: 'time', label: 'ETA', value: '25 min', color: colors.primary },
              { icon: 'resize', label: 'Distance', value: '8.3 km', color: colors.success },
              { icon: 'speedometer', label: 'Speed', value: '22 km/h', color: colors.warning },
            ].map((stat, i) => (
              <Card key={i} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={18} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>
        )}

        {/* Journey Form */}
        <Card style={styles.journeyForm}>
          <Text style={styles.sectionTitle}>
            {journeyActive ? 'Current Journey' : 'Plan Your Journey'}
          </Text>

          <View style={styles.routeInputs}>
            <View style={styles.routePoint}>
              <View style={[styles.routePointDot, { backgroundColor: colors.success }]} />
              <View style={styles.routePointInput}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeValue}>Current Location</Text>
              </View>
            </View>

            <View style={styles.routeConnector}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.connectorDot} />
              ))}
            </View>

            <View style={styles.routePoint}>
              <View style={[styles.routePointDot, { backgroundColor: colors.emergency }]} />
              <View style={styles.routePointInput}>
                {journeyActive ? (
                  <>
                    <Text style={styles.routeLabel}>To</Text>
                    <Text style={styles.routeValue}>{destination || 'Destination'}</Text>
                  </>
                ) : (
                  <Input
                    label="Destination"
                    value={destination}
                    onChangeText={setDestination}
                    placeholder="Enter destination"
                    leftIcon="search-outline"
                    style={{ marginBottom: 0 }}
                  />
                )}
              </View>
            </View>
          </View>

          {!journeyActive && (
            <View style={styles.suggestions}>
              <Text style={styles.suggestionsLabel}>Recent Destinations</Text>
              {['Home', 'Office', 'City Center Mall'].map((place, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionItem}
                  onPress={() => setDestination(place)}
                >
                  <Ionicons name="time-outline" size={16} color={colors.textMuted} />
                  <Text style={styles.suggestionText}>{place}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {journeyActive ? (
            <View style={styles.journeyActions}>
              <Button
                title={shareActive ? 'Shared!' : 'Share Journey'}
                onPress={handleShareJourney}
                variant={shareActive ? 'success' : 'outline'}
                size="md"
                icon={<Ionicons name="share-outline" size={18} color={shareActive ? colors.textLight : colors.primary} />}
                style={{ flex: 1 }}
              />
              <Button
                title="End Journey"
                onPress={handleEndJourney}
                variant="emergency"
                size="md"
                icon={<Ionicons name="stop-circle" size={18} color={colors.textLight} />}
                style={{ flex: 1 }}
              />
            </View>
          ) : (
            <Button
              title="Start Journey"
              onPress={handleStartJourney}
              variant="primary"
              size="lg"
              icon={<Ionicons name="navigate-outline" size={20} color={colors.textLight} />}
              disabled={!destination}
              style={styles.startButton}
            />
          )}
        </Card>

        {/* Safety Notice */}
        <Card style={styles.safetyNotice} variant="default">
          <View style={styles.safetyNoticeHeader}>
            <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
            <Text style={styles.safetyNoticeTitle}>Journey Safety</Text>
          </View>
          <Text style={styles.safetyNoticeText}>
            Your trusted contacts will be automatically notified when you start and complete your journey.
          </Text>
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
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.successLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.success,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  activeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.success,
    fontWeight: typography.fontWeights.bold,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },
  mapContainer: {
    height: 200,
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
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  gridV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  routeLine: {
    position: 'absolute',
    left: '20%',
    right: '20%',
    top: '48%',
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  routeMarker: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.textLight,
    ...shadows.sm,
  },
  startMarker: {
    backgroundColor: colors.success,
    left: '16%',
    top: '35%',
  },
  endMarker: {
    backgroundColor: colors.emergency,
    right: '16%',
    top: '35%',
  },
  userPosition: {
    position: 'absolute',
    top: '36%',
    left: '48%',
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
    borderColor: colors.primary + '60',
  },
  journeyStats: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
  },
  journeyForm: {
    margin: spacing.xl,
    marginTop: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
  },
  routeInputs: {
    marginBottom: spacing.base,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  routePointDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: spacing.sm,
    borderWidth: 2,
    borderColor: colors.textLight,
    ...shadows.sm,
  },
  routePointInput: {
    flex: 1,
  },
  routeLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    fontWeight: typography.fontWeights.medium,
    marginBottom: spacing.xs,
  },
  routeValue: {
    fontSize: typography.fontSizes.base,
    color: colors.textPrimary,
    fontWeight: typography.fontWeights.medium,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  routeConnector: {
    marginLeft: 7,
    gap: 4,
    paddingVertical: spacing.xs,
  },
  connectorDot: {
    width: 2,
    height: 6,
    borderRadius: 1,
    backgroundColor: colors.border,
    marginLeft: 1,
  },
  suggestions: {
    marginBottom: spacing.base,
  },
  suggestionsLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textMuted,
    fontWeight: typography.fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    flex: 1,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  startButton: {
    width: '100%',
  },
  journeyActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  safetyNotice: {
    marginHorizontal: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: colors.purple[50],
  },
  safetyNoticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  safetyNoticeTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
  safetyNoticeText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default JourneyScreen;
