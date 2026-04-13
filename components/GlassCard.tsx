import React from 'react';
import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Theme } from '../constants/Theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  intensity = 40,
  tint = 'dark' 
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView 
        intensity={intensity} 
        tint={tint} 
        style={StyleSheet.absoluteFill} 
      />
      <View style={styles.borderOverlay} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  content: {
    padding: Theme.spacing.md,
  },
});
