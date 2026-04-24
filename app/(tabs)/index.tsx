import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Theme } from '../../constants/Theme';
import { Bus, Clock, Bell, Settings, ChevronRight, Zap, Target, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { LivingBlueprintBackground } from '../../components/LivingBlueprintBackground';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  interpolate,
  useDerivedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const RECENT_UPDATES = [
  {
    id: '1',
    title: 'System optimization complete',
    subtitle: 'Enterprise Node • 2m ago',
    icon: Clock,
    color: '#00D1FF' // Cyan
  },
  {
    id: '2',
    title: 'NFC validation active',
    subtitle: 'Security Hub • 1h ago',
    icon: Zap,
    color: '#A855F7' // Lavender
  },
  {
    id: '3',
    title: 'Bus #24 Fuel Level Nominal',
    subtitle: 'Telemetry • 3h ago',
    icon: Target,
    color: '#FF6B00' // Orange
  },
  {
    id: '4',
    title: 'Weekly Schedule Updated',
    subtitle: 'Admin • 5h ago',
    icon: Bell,
    color: '#10B981' // Emerald
  }
];

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  
  const userFallbackName = user?.email ? user.email.split('@')[0] : 'User';
  const displayName = user?.displayName || userFallbackName;
  const displayInitials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const stackExpanded = useSharedValue(0); // 0 = stacked, 1 = expanded
  
  const toggleStack = () => {
    stackExpanded.value = withTiming(stackExpanded.value === 0 ? 1 : 0, {
      duration: 400
    });
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LivingBlueprintBackground />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Bar / Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingText, { color: colors.textSecondary }]}>SYNCED • ONLINE</Text>
            <Text style={[styles.nameText, { color: colors.text }]}>{displayName}</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(tabs)/profile')}>
            <View style={[styles.avatarBorder, { borderColor: colors.glassBorder }]}>
              <View style={[styles.avatarInner, { backgroundColor: colors.surface }]}>
                <Text style={[styles.avatarText, { color: colors.text }]}>{displayInitials}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Major Hero Card - Obsidian Specular Style */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={isDark ? ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.4)'] : ['rgba(255, 255, 255, 0.5)', 'transparent', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 1.0, borderRadius: 48 }}
          >
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.heroGlass, {
              backgroundColor: isDark ? 'rgba(0,0,0,0.60)' : 'rgba(255,255,255,0.85)',
              borderRadius: 47,
              overflow: 'hidden',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
            }]}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.12)', 'transparent'] : ['rgba(255,255,255,0.4)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.6, y: 1 }}
              />
              <View style={styles.heroTop}>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 107, 0, 0.12)', borderColor: 'rgba(255, 107, 0, 0.4)', borderWidth: 1 }]}>
                  <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.statusText, { color: colors.primary }]}>NODE ACTIVE</Text>
                </View>
              <Text style={[styles.busModel, { color: colors.text }]}>E-Class • Route #24</Text>
            </View>

            <View style={styles.etaSection}>
              <View>
                <Text style={[styles.etaLabel, { color: colors.textMuted }]}>APPROX. ARRIVAL</Text>
                <View style={styles.etaValueRow}>
                  <Text style={[styles.etaMainText, { color: colors.text }]}>08</Text>
                  <Text style={[styles.etaSubText, { color: colors.textMuted }]}>MINS</Text>
                </View>
              </View>
              
              <LinearGradient
                colors={[colors.primary, '#FF9E00']}
                style={styles.busHeroIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <LinearGradient 
                  colors={['rgba(255,255,255,0.4)', 'transparent']}
                  style={[StyleSheet.absoluteFill, { borderRadius: 32 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.5, y: 0.5 }}
                />
                <Bus size={32} color="#FFF" />
              </LinearGradient>
            </View>

            <View style={styles.trackMinimal}>
              <View style={[styles.progressTrack, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)' }]}>
                <LinearGradient
                  colors={[colors.primary, '#FF9E00']}
                  style={[styles.progressBar, { width: '65%' }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
                <View style={[styles.progressHead, { left: '65%', backgroundColor: '#FFF', shadowColor: colors.primary, shadowRadius: 10, shadowOpacity: 0.5 }]} />
              </View>
              <View style={styles.stopsRow}>
                <Text style={[styles.stopText, { color: colors.textMuted }]}>North Gate</Text>
                <Text style={[styles.stopText, { color: colors.text, fontWeight: '800' }]}>Innovation Plaza</Text>
              </View>
            </View>
          </BlurView>
          </LinearGradient>
        </View>

        {/* Multi-Accent Service Hub */}
        <View style={styles.hubHeader}>
          <Text style={[styles.hubTitle, { color: colors.text }]}>Service Hub</Text>
        </View>

        <View style={styles.hubGrid}>
          <TouchableOpacity style={styles.hubWrapper} onPress={() => router.push('/(tabs)/track')}>
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.hubItem, {
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(255, 255, 255, 0.65)',
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.7)',
              borderWidth: StyleSheet.hairlineWidth,
              overflow: 'hidden'
            }]}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.25)', borderWidth: 1 }]}>
                <Target size={24} color={colors.primary} />
              </View>
              <Text style={[styles.hubLabel, { color: colors.text }]}>Live Map</Text>
              <Text style={[styles.hubSubtitle, { color: colors.textMuted }]}>2 buses nearby</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hubWrapper} onPress={() => console.log('Schedules coming soon...')}>
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.hubItem, {
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(255, 255, 255, 0.65)',
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.7)',
              borderWidth: StyleSheet.hairlineWidth,
              overflow: 'hidden'
            }]}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.25)', borderWidth: 1 }]}>
                <Zap size={24} color={colors.primary} />
              </View>
              <Text style={[styles.hubLabel, { color: colors.text }]}>Schedules</Text>
              <Text style={[styles.hubSubtitle, { color: colors.textMuted }]}>Next in 15 mins</Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hubWrapper} onPress={() => router.push('/(tabs)/alerts')}>
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.hubItemCompact, {
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(255, 255, 255, 0.65)',
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.7)',
              borderWidth: StyleSheet.hairlineWidth,
              overflow: 'hidden'
            }]}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <View style={[styles.iconBoxCompact, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.25)', borderWidth: 1 }]}>
                <Bell size={20} color={colors.primary} />
              </View>
              <Text style={[styles.hubLabel, { color: colors.text, flex: 1 }]}>Alerts</Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.hubWrapper} onPress={() => router.push('/(tabs)/profile')}>
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.hubItemCompact, {
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(255, 255, 255, 0.65)',
              borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.7)',
              borderWidth: StyleSheet.hairlineWidth,
              overflow: 'hidden'
            }]}>
              <LinearGradient 
                colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
              <View style={[styles.iconBoxCompact, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.25)', borderWidth: 1 }]}>
                <Settings size={20} color={colors.primary} />
              </View>
              <Text style={[styles.hubLabel, { color: colors.text, flex: 1 }]}>Profile</Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </BlurView>
          </TouchableOpacity>
        </View>

        <View style={styles.hubHeader}>
          <Text style={[styles.hubTitle, { color: colors.text }]}>Recent Updates</Text>
        </View>

        <TouchableOpacity activeOpacity={1} onPress={toggleStack}>
          <Animated.View style={[styles.feedStack, useAnimatedStyle(() => ({
            height: interpolate(stackExpanded.value, [0, 1], [84, RECENT_UPDATES.length * 84 + 12]),
            marginTop: interpolate(stackExpanded.value, [0, 1], [24, 0]), // Buffer for upward stack
          }))]}>
            <View style={StyleSheet.absoluteFill}>
              {RECENT_UPDATES.map((update, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                  const isExpanded = stackExpanded.value;
                  
                  // Collapsed values (Piling UPWARDS)
                  const collapsedY = -index * 8;
                  const collapsedScale = 1 - (index * 0.04);
                  const collapsedOpacity = index === 0 ? 1 : Math.max(0.4, 0.9 - (index * 0.2));
                  
                  // Expanded values (Flowing DOWNWARDS)
                  const expandedY = index * 84;
                  
                  return {
                    transform: [
                      { translateY: interpolate(isExpanded, [0, 1], [collapsedY, expandedY]) },
                      { scale: interpolate(isExpanded, [0, 1], [collapsedScale, 1]) }
                    ],
                    opacity: interpolate(isExpanded, [0, 1], [collapsedOpacity, 1]),
                    zIndex: RECENT_UPDATES.length - index,
                    position: 'absolute',
                    width: '100%',
                  };
                });

                return (
                  <Animated.View key={update.id} style={animatedStyle}>
                    <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={[styles.feedCard, {
                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(255, 255, 255, 0.65)',
                      borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.7)',
                      borderWidth: StyleSheet.hairlineWidth,
                    }]}>
                      <LinearGradient 
                        colors={isDark ? ['rgba(255,255,255,0.1)', 'transparent'] : ['rgba(255,255,255,0.3)', 'transparent']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                      />
                      <View style={[styles.feedIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                        <update.icon size={18} color={update.color} />
                      </View>
                      <View style={styles.feedContent}>
                        <Text style={[styles.feedText, { color: colors.text }]}>{update.title}</Text>
                        <Text style={[styles.feedTime, { color: colors.textMuted }]}>{update.subtitle}</Text>
                      </View>
                      <ChevronRight size={16} color={colors.textMuted} />
                    </BlurView>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 14,
    fontFamily: Theme.typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.6,
  },
  title: {
    fontSize: 32,
    fontFamily: Theme.typography.black,
    letterSpacing: -1.2,
    marginTop: 2,
  },
  profileBtn: {
    padding: 2,
  },
  avatarBorder: {
    padding: 2,
    borderRadius: 20,
    borderWidth: 1.2,
  },
  avatarInner: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: Theme.typography.black,
    fontSize: 16,
  },
  heroContainer: {
    marginBottom: 40,
    borderRadius: 48,
    overflow: 'hidden',
  },
  heroGlass: {
    padding: 32,
  },
  heroInnerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 48,
    borderWidth: 0,
  },
  sheetHandle: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Subtle interactive cue
    alignSelf: 'center',
    marginBottom: 16,
  },
  heroTop: {
    marginBottom: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    letterSpacing: 1,
  },
  busModel: {
    fontSize: 22,
    fontFamily: Theme.typography.black,
    marginTop: 12,
  },
  etaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  etaLabel: {
    fontSize: 11,
    fontFamily: Theme.typography.black,
    letterSpacing: 1.5,
  },
  etaValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  etaMainText: {
    fontFamily: Theme.typography.black,
    fontSize: 72,
    letterSpacing: -3.5,
  },
  etaSubText: {
    fontSize: 18,
    fontFamily: Theme.typography.black,
  },
  busHeroIcon: {
    width: 86,
    height: 86,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  trackMinimal: {
    marginTop: 8,
  },
  trackLine: {
    height: 6,
    borderRadius: 3,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  trackProgress: {
    width: '55%',
    height: '100%',
    opacity: 0.3,
  },
  indicator: {
    position: 'absolute',
    top: -3,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  stopsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopText: {
    fontSize: 10,
    fontFamily: Theme.typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  updateTime: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hubHeader: {
    marginBottom: 20,
  },
  hubTitle: {
    fontFamily: Theme.typography.black,
    fontSize: 22,
    letterSpacing: -0.5,
  },
  hubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
  },
  hubWrapper: {
    width: (width - 48 - 16) / 2,
    borderRadius: 36,
  },
  hubItem: {
    padding: 20,
    alignItems: 'center',
    gap: 12,
    minHeight: 140,
    justifyContent: 'center',
    borderRadius: 36,
  },
  hubItemCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    minHeight: 74,
    borderRadius: 36,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 0,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxCompact: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hubLabel: {
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : 'System',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  hubSubtitle: {
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : 'System',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    opacity: 0.8,
  },
  feedStack: {
    gap: 12,
  },
  feedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 28,
    gap: 16,
    overflow: 'hidden',
  },
  feedIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContent: {
    flex: 1,
  },
  feedText: {
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : 'System',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  feedTime: {
    fontFamily: Platform.OS === 'ios' ? '-apple-system' : 'System',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    fontWeight: '800',
    opacity: 0.5,
  },
});
