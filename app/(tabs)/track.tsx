import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform, Animated, Easing } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Theme } from '../../constants/Theme';
import { Bus, Phone, Star, CheckCircle, Clock, MapPin, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { LivingBlueprintBackground } from '../../components/LivingBlueprintBackground';

const { width, height } = Dimensions.get('window');

export default function TrackScreen() {
  const { colors, isDark } = useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const animValue = React.useRef(new Animated.Value(0)).current; // Start minimized for the entrance pop

  // Auto-expand every time the user lands on this tab
  useFocusEffect(
    React.useCallback(() => {
      // Balanced delay (200ms) for a premium transition
      const timeout = setTimeout(() => {
        setIsExpanded(true);
        Animated.spring(animValue, {
          toValue: 1,
          friction: 10,  // Slightly more dampened for 'good slowly' landing
          tension: 50,   // Higher tension for 'speed'
          useNativeDriver: true,
        }).start();
      }, 200);

      return () => {
        clearTimeout(timeout);
        // Reset state on blur so it pops out again next time
        setIsExpanded(false);
        animValue.setValue(0);
      };
    }, [animValue])
  );

  const toggleSheet = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    Animated.spring(animValue, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const sheetTranslateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [240, -220], // Perfectly seats the handle ON the menu
  });

  const sheetWidth = animValue.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [80, 320, width - 32], 
  });

  const sheetScaleY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 1], // Just enough height for the handle when docked
  });

  const sheetRadius = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 48], // Morphing curves
  });

  const contentOpacity = animValue.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1], // Staggered reveal
  });

  const contentScale = animValue.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.5, 0.5, 1], // Unfolding effect
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Interactive Map Backdrop */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXB34OkuPT54wbYB_0LtkcFYDkbTRdzP1cP6HymqQ3zjM4UAU5fPIDe_0OKydNQPOnVAEDUILziL2wMimz7xGV3M4d2krScSb5txJcxaTNqrLD74ClnmTBJZLETLTsR9F02bVHSM8e7FkHPdvJLJaLnwlkzK7484rhithakXZz0y8IvVp6VLu9OhDHYFx72CVfigQxqOAO4iNgWBYNE1tBBRXpmXzsRs8uL6L1tAPnNyWwhU-MJeco2H1f_PjXwsbq4NzQjyjEVSqoT2' }}
          style={[styles.mapBase, { opacity: isDark ? 0.05 : 0.1 }]}
          resizeMode="cover"
        />
        <View style={[styles.mapOverlay, { backgroundColor: isDark ? '#000000' : '#F8FAFC', opacity: 0.7 }]} />
        
        {/* Iridescent Background for depth under map */}
        <LivingBlueprintBackground />
        
        {/* Tracking Marker - High Contrast Reference Style */}
        <View style={[styles.busMarkerRoot, { top: '40%', left: '50%' }]}>
          <View style={[styles.markerGlow, { backgroundColor: colors.primary, opacity: 0.4 }]} />
          <View style={[styles.busMarker, { shadowColor: colors.primary }]}>
            <LinearGradient
              colors={[colors.primary, '#FF9E00']}
              style={[styles.markerPill, { borderColor: '#FFF', borderWidth: 2 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Bus size={24} color="#FFF" />
            </LinearGradient>
          </View>
        </View>

        {/* User Location Marker */}
        <View style={[styles.userLocRoot, { top: '65%', left: '30%' }]}>
          <View style={[styles.markerGlow, { backgroundColor: colors.accentLavender }]} />
          <View style={[styles.userLocDot, { backgroundColor: colors.accentLavender, borderColor: colors.text }]} />
        </View>
      </View>

      {/* Top Floating Header */}
      <View style={styles.topBar}>
        <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.header}>
          <View style={[styles.innerBorder, { borderColor: colors.glassBorder, borderWidth: 1.5, backgroundColor: colors.glass }]} />
          <View style={[styles.glossRim, { backgroundColor: colors.glassGloss }]} />
          <View style={styles.headerContent}>
            <ShieldCheck size={20} color={colors.accentGreen} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>SECURE NODE #09</Text>
            <View style={[styles.liveBadge, { backgroundColor: 'rgba(255, 107, 0, 0.12)', borderColor: 'rgba(255, 107, 0, 0.4)', borderWidth: 1 }]}>
              <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.liveText, { color: colors.primary }]}>LIVE TRACKING</Text>
            </View>
          </View>
        </BlurView>
        
        <TouchableOpacity style={[styles.sosButton, { shadowColor: colors.accentRed }]}>
          <AlertTriangle size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Obsidian Bottom Sheet - True Morph Dynamic Island */}
      <View style={styles.sheetContainer}>
        <Animated.View 
          style={[
            styles.islandInner, 
            { 
              width: sheetWidth,
              transform: [
                { translateY: sheetTranslateY },
                { scaleY: sheetScaleY }
              ] 
            }
          ]}
        >
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={toggleSheet}
            style={styles.sheetTouchable}
          >
            <Animated.View style={[
              styles.bottomSheet, 
              { 
                borderRadius: sheetRadius, 
                height: 460,
              }
            ]}>
              <Animated.View style={[StyleSheet.absoluteFill, { opacity: animValue.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1, 1] }) }]}>
                <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                <View style={[styles.innerBorder, { borderRadius: 48, borderColor: colors.glassBorder, borderWidth: 1.5, backgroundColor: colors.glass }]} />
                <View style={[styles.glossRim, { backgroundColor: colors.glassGloss }]} />
              </Animated.View>

              {/* Ghost Handle - Always accessible */}
              <Animated.View style={[styles.sheetHandle, { backgroundColor: colors.textSecondary }]} />
              
              <Animated.View style={[
                styles.sheetContent, 
                { 
                  opacity: contentOpacity,
                  transform: [{ scale: contentScale }]
                }
              ]}>
            {/* ETA Section */}
            <View style={styles.etaRow}>
              <View>
                <Text style={[styles.label, { color: colors.textMuted }]}>NEXT ARRIVAL</Text>
                <View style={styles.etaValueContainer}>
                  <Text style={[styles.etaText, { color: colors.text }]}>08</Text>
                  <Text style={[styles.etaMins, { color: colors.accentCyan }]}>MINS</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.3)', borderWidth: 1 }]}>
                  <CheckCircle size={12} color={colors.primary} />
                  <Text style={[styles.statusText, { color: colors.primary }]}>SYNCHRONIZED</Text>
                </View>
              </View>
              <View style={styles.distCol}>
                <Text style={[styles.label, { color: colors.textMuted }]}>DISTANCE</Text>
                <Text style={[styles.distText, { color: colors.text }]}>1.4 <Text style={{ fontSize: 14, opacity: 0.5 }}>KM</Text></Text>
              </View>
            </View>

            {/* Driver Card - Refined Pill */}
            <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={styles.driverCard}>
              <View style={[styles.innerBorder, { borderRadius: 28, borderColor: colors.glassBorder, borderWidth: 1.5, backgroundColor: colors.glass }]} />
              <View style={styles.driverInfo}>
                <View style={styles.avatarRoot}>
                  <Image 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANkHIIkgxvm6gDo9d8Dh8E5ytSihA8QgZAlILZKRUNWEcqVxbGq1Z4ewgsfWMbGxw6RrOvOkSrbE8IVTvs90SXPZPnOvaUGSA_0DRpcfNgt-1KJNx33kdB_kmIBTIp4Yoqx2ku0GZY2LKY9ACuWeJnbY9uz2jJdkwEKh107c_znnLd85nyhPmaSloraQu7xrTFiWTdsTr9_8x7fgLXLmsN0tmhCso62vMIMW2vECNQR1oRr5oQdSUmwlKNWupT9mfM908rzA0CIWR5' }}
                    style={[styles.avatar, { borderColor: colors.glassBorder }]}
                  />
                  <View style={[styles.ratingBadge, { backgroundColor: colors.accentGreen }]}>
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.driverName, { color: colors.text }]}>Rajesh Kumar</Text>
                  <Text style={[styles.busPlate, { color: colors.textMuted }]}>KA-01 • ELECTRI-X</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.callButton, { backgroundColor: colors.surface, borderColor: colors.glassInnerBorder, borderWidth: 1 }]}>
                <Phone size={20} color={colors.accentCyan} />
              </TouchableOpacity>
            </BlurView>

            {/* Tracking Path */}
            <View style={styles.timeline}>
              <View style={[styles.timelineLine, { backgroundColor: colors.glassBorder }]} />
              
              <View style={styles.timelineItem}>
                <View style={[styles.stopDotInactive, { backgroundColor: colors.surface }]} />
                <View>
                  <Text style={[styles.stopLabel, { color: colors.textMuted }]}>LAST HUB</Text>
                  <Text style={[styles.stopName, { color: colors.textSecondary }]}>North Gate Complex</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={[styles.stopDotActive, { backgroundColor: colors.accentCyan, shadowColor: colors.accentCyan }]} />
                <View>
                  <Text style={[styles.stopLabelActive, { color: colors.accentCyan }]}>TARGET STOP</Text>
                  <Text style={[styles.stopNameActive, { color: colors.text }]}>Innovation Plaza <Text style={{ color: colors.primary }}>• PROXIMITY</Text></Text>
                  <View style={styles.timeTag}>
                    <Clock size={12} color={colors.textMuted} />
                    <Text style={[styles.timeLabel, { color: colors.textMuted }]}>Arrival Sync: 08:42 AM</Text>
                  </View>
                </View>
              </View>
            </View>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  mapBase: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  busMarkerRoot: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  busMarker: {
    zIndex: 10,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  markerPill: {
    width: 64,
    height: 64,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  markerGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    filter: 'blur(30px)',
    opacity: 0.3,
  },
  userLocRoot: {
    position: 'absolute',
    alignItems: 'center',
  },
  userLocDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  header: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 48,
    borderWidth: 1.5,
  },
  glossRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    opacity: 0.95,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    letterSpacing: 1,
  },
  sosButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF4D94',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    height: 460, // Fixed frame to anchor the growth
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1, 
    pointerEvents: 'box-none', // Allow map interaction through the container
  },
  islandInner: {
    overflow: 'visible',
    alignItems: 'center',
  },
  sheetTouchable: {
    width: '100%',
  },
  bottomSheet: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
  },
  sheetHandle: {
    position: 'absolute',
    top: 10,
    width: 64,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'center',
    zIndex: 100,
  },
  sheetContent: {
    padding: 24,
    paddingTop: 24, // Balanced headroom (not too lowered)
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  statusLabel: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    letterSpacing: 1.5,
    marginBottom: 4,
    opacity: 0.5,
  },
  etaValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  etaText: {
    fontSize: 72,
    fontFamily: Theme.typography.black,
    letterSpacing: -3,
    lineHeight: 72,
  },
  etaMins: {
    fontSize: 20,
    fontFamily: Theme.typography.black,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    letterSpacing: 1,
  },
  distCol: {
    alignItems: 'flex-end',
  },
  distText: {
    fontSize: 28,
    fontFamily: Theme.typography.black,
    fontStyle: 'italic',
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 28,
    marginBottom: 32,
    overflow: 'hidden',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarRoot: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    color: '#000',
  },
  infoLabel: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    opacity: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 18,
    fontFamily: Theme.typography.black,
    letterSpacing: -0.5,
  },
  driverName: {
    fontSize: 18,
    fontFamily: Theme.typography.black,
  },
  busPlate: {
    fontSize: 11,
    fontFamily: Theme.typography.black,
    letterSpacing: 1,
    marginTop: 4,
    opacity: 0.5,
  },
  callButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  timeline: {
    gap: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 7,
    top: 10,
    bottom: 10,
    width: 1,
    opacity: 0.5,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-start',
  },
  stopDotInactive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    marginTop: 2,
  },
  stopDotActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginTop: 4,
  },
  stopLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    opacity: 0.5,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  stopLabelActive: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  stopNameActive: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '900',
    opacity: 0.5,
  },
});
