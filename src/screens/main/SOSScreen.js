import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../../theme/typography';

const SOSScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState(5);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const startPulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startPulse();
  }, []);

  useEffect(() => {
    if (sending) return;
    if (countdown <= 0) {
      setSending(true);
      setTimeout(() => {
        setSent(true);
      }, 2000);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, sending]);

  const handleCancel = () => {
    navigation.goBack();
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.sentContainer}>
        <Animated.View style={[styles.sentContent, { opacity: fadeAnim }]}>
          <View style={styles.sentIcon}>
            <Ionicons name="checkmark-circle" size={80} color={colors.textLight} />
          </View>
          <Text style={styles.sentTitle}>Alert Sent!</Text>
          <Text style={styles.sentSubtitle}>
            Emergency alert has been sent to all your trusted contacts
          </Text>

          <View style={styles.sentDetails}>
            {[
              { icon: 'location', text: 'Location shared: Civil Lines, Delhi' },
              { icon: 'people', text: '3 contacts notified' },
              { icon: 'call', text: 'Emergency services alerted' },
            ].map((item, i) => (
              <View key={i} style={styles.sentDetailItem}>
                <Ionicons name={item.icon} size={18} color={colors.textLight} />
                <Text style={styles.sentDetailText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.safeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="checkmark" size={22} color={colors.emergency} />
            <Text style={styles.safeButtonText}>I Am Safe Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.alertBadge}>
            <Ionicons name="alert-circle" size={18} color={colors.textLight} />
            <Text style={styles.alertBadgeText}>EMERGENCY ALERT</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {sending ? (
            <View style={styles.sendingContent}>
              <Animated.View style={[styles.sendingCircle, { transform: [{ scale: pulseAnim }] }]}>
                <Ionicons name="wifi" size={48} color={colors.textLight} />
              </Animated.View>
              <Text style={styles.sendingTitle}>Sending Emergency Alert</Text>
              <Text style={styles.sendingSubtitle}>Please wait while we notify your contacts...</Text>

              <View style={styles.sendingSteps}>
                {[
                  { label: 'Getting Location', done: true },
                  { label: 'Notifying Contacts', done: false },
                  { label: 'Alerting Services', done: false },
                ].map((step, i) => (
                  <View key={i} style={styles.stepItem}>
                    <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                      {step.done && <Ionicons name="checkmark" size={12} color={colors.textLight} />}
                    </View>
                    <Text style={styles.stepLabel}>{step.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.countdownContent}>
              <Animated.View
                style={[styles.countdownCircle, { transform: [{ scale: pulseAnim }] }]}
              >
                <View style={styles.countdownInner}>
                  <Text style={styles.countdownNumber}>{countdown}</Text>
                  <Text style={styles.countdownLabel}>seconds</Text>
                </View>
              </Animated.View>

              <Text style={styles.countdownTitle}>Sending Emergency Alert</Text>
              <Text style={styles.countdownSubtitle}>
                Alert will be sent automatically in {countdown} second{countdown !== 1 ? 's' : ''}.{'\n'}
                Tap <Text style={styles.cancelHighlight}>Cancel</Text> to stop.
              </Text>

              <View style={styles.alertInfo}>
                <View style={styles.alertInfoItem}>
                  <Ionicons name="location" size={16} color={colors.emergency} />
                  <Text style={styles.alertInfoText}>Current location will be shared</Text>
                </View>
                <View style={styles.alertInfoItem}>
                  <Ionicons name="people" size={16} color={colors.emergency} />
                  <Text style={styles.alertInfoText}>3 trusted contacts will be notified</Text>
                </View>
                <View style={styles.alertInfoItem}>
                  <Ionicons name="call" size={16} color={colors.emergency} />
                  <Text style={styles.alertInfoText}>Emergency call will be initiated</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Cancel Button */}
        {!sending && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Ionicons name="close-circle" size={24} color={colors.emergency} />
            <Text style={styles.cancelButtonText}>Cancel Emergency</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.emergency,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  alertBadgeText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.textLight,
    letterSpacing: 1.5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContent: {
    alignItems: 'center',
    width: '100%',
  },
  countdownCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  countdownInner: {
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 72,
    fontWeight: typography.fontWeights.extrabold,
    color: colors.textLight,
    lineHeight: 80,
  },
  countdownLabel: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: typography.fontWeights.medium,
  },
  countdownTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  countdownSubtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing['2xl'],
  },
  cancelHighlight: {
    fontWeight: typography.fontWeights.bold,
    textDecorationLine: 'underline',
  },
  alertInfo: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    width: '100%',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  alertInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  alertInfoText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.textLight,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['2xl'],
    marginBottom: spacing.base,
    ...shadows.lg,
  },
  cancelButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.emergency,
  },
  sendingContent: {
    alignItems: 'center',
    width: '100%',
  },
  sendingCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  sendingTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  sendingSubtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  sendingSteps: {
    width: '100%',
    gap: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  stepDotDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  stepLabel: {
    fontSize: typography.fontSizes.base,
    color: colors.textLight,
    fontWeight: typography.fontWeights.medium,
  },
  sentContainer: {
    flex: 1,
    backgroundColor: colors.emergency,
  },
  sentContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  sentIcon: {
    marginBottom: spacing.xl,
  },
  sentTitle: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.extrabold,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  sentSubtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing['2xl'],
  },
  sentDetails: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sentDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sentDetailText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
  },
  safeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.textLight,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['2xl'],
    ...shadows.lg,
  },
  safeButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.emergency,
  },
});

export default SOSScreen;
