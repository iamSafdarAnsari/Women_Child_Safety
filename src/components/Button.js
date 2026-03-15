import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius, shadows } from '../theme/typography';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    shadows.sm,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`size_${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textLight} />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  emergency: {
    backgroundColor: colors.emergency,
    ...shadows.emergency,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  success: {
    backgroundColor: colors.success,
  },
  size_sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  size_md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  size_lg: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing['2xl'],
  },
  disabled: {
    opacity: 0.5,
  },
  baseText: {
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.textLight,
    fontSize: typography.fontSizes.base,
  },
  secondaryText: {
    color: colors.textLight,
    fontSize: typography.fontSizes.base,
  },
  emergencyText: {
    color: colors.textLight,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
  },
  outlineText: {
    color: colors.primary,
    fontSize: typography.fontSizes.base,
  },
  ghostText: {
    color: colors.primary,
    fontSize: typography.fontSizes.base,
  },
  successText: {
    color: colors.textLight,
    fontSize: typography.fontSizes.base,
  },
  size_smText: {
    fontSize: typography.fontSizes.sm,
  },
  size_mdText: {
    fontSize: typography.fontSizes.base,
  },
  size_lgText: {
    fontSize: typography.fontSizes.md,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;
