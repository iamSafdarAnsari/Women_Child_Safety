import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius, shadows } from '../theme/typography';

const Card = ({ children, style, variant = 'default', padding = 'md' }) => {
  return (
    <View style={[styles.card, styles[variant], styles[`padding_${padding}`], style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  default: {
    backgroundColor: colors.cardBackground,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  emergency: {
    backgroundColor: colors.emergencyLight,
    borderWidth: 1,
    borderColor: colors.emergency,
  },
  success: {
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: colors.success,
  },
  outlined: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  padding_sm: {
    padding: spacing.md,
  },
  padding_md: {
    padding: spacing.base,
  },
  padding_lg: {
    padding: spacing.xl,
  },
  padding_none: {
    padding: 0,
  },
});

export default Card;
