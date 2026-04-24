import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Theme } from '../../constants/Theme';
import { Bell, CheckCircle, AlertTriangle, Info, Clock, ChevronRight, Bus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { LivingBlueprintBackground } from '../../components/LivingBlueprintBackground';

export default function AlertsScreen() {
  const { colors, isDark } = useTheme();

  const ALERTS = [
    {
      id: '1',
      title: 'Proximity Alert',
      message: 'Bus #24 synced with Innovation Plaza node. Proximity: 400m.',
      time: '2 mins ago',
      icon: Bus,
      accent: colors.primary,
    },
    {
      id: '2',
      title: 'Validation Success',
      message: 'NFC credential accepted at Gate 4. Safe journey, candidate.',
      time: '15 mins ago',
      icon: CheckCircle,
      accent: colors.accentGreen,
    },
    {
      id: '3',
      title: 'Flow Congestion',
      message: 'High traffic density on Sector 7 bypass. Impact: +12m delay.',
      time: '45 mins ago',
      icon: Clock,
      accent: colors.primary,
    },
    {
      id: '4',
      title: 'Network Update',
      message: 'New charging port detected at Library West Wing. Status: Active.',
      time: '2 hours ago',
      icon: Info,
      accent: colors.primary,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LivingBlueprintBackground />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]}>Recent Notifications</Text>
          <TouchableOpacity style={[styles.clearBtn, { backgroundColor: colors.surface, borderColor: colors.glassBorder }]}>
            <Text style={[styles.clearText, { color: colors.text }]}>PURGE ALL</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Real-time system event log.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {ALERTS.map((alert) => {
          const Icon = alert.icon;
          return (
            <TouchableOpacity key={alert.id} style={styles.alertWrapper}>
              {/* Skeuomorphic Glass Capsule Shell */}
              <LinearGradient
                colors={isDark ? ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.4)'] : ['rgba(255, 255, 255, 0.8)', 'transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.capsuleBorder}
              >
                <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.alertCard, {
                  backgroundColor: isDark ? 'rgba(0,0,0,0.30)' : 'rgba(255,255,255,0.7)',
                  borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.6)',
                  borderWidth: StyleSheet.hairlineWidth,
                }]}>
                  <LinearGradient 
                    colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                  />
                  <View style={[styles.iconBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
                    <Icon size={20} color={isDark ? '#FFF' : colors.primary} />
                  </View>
                  
                  <View style={styles.content}>
                    <View style={styles.topRow}>
                      <Text style={[styles.alertTitle, { color: colors.text }]}>{alert.title}</Text>
                      <Text style={[styles.time, { color: colors.textMuted }]}>{alert.time}</Text>
                    </View>
                    <Text style={[styles.message, { color: colors.textSecondary }]} numberOfLines={1}>
                      {alert.message}
                    </Text>
                  </View>
                  
                  <View style={styles.chevronWrapper}>
                    <ChevronRight size={14} color={colors.textMuted} />
                  </View>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : 'System',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -1,
  },
  clearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  clearText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.6,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 150,
  },
  alertWrapper: {
    marginBottom: 12,
    borderRadius: 100, // Absolute Capsule
    overflow: 'hidden',
  },
  capsuleBorder: {
    padding: 1, // Hairline highlight rim
    borderRadius: 100,
  },
  alertCard: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 100,
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  alertTitle: {
    fontFamily: Theme.typography.black,
    fontSize: 15,
    letterSpacing: -0.3,
  },
  time: {
    fontSize: 9,
    fontFamily: Theme.typography.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.5,
  },
  message: {
    fontFamily: Theme.typography.medium,
    fontSize: 13,
    opacity: 0.7,
  },
  chevronWrapper: {
    marginLeft: 4,
    opacity: 0.4,
  },
});
