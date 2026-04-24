import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing,
  interpolate
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SystemNode = ({ x, y, delay = 0 }: { x: number, y: number, delay?: number }) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    setTimeout(() => {
      scale.value = withRepeat(withTiming(1.2, { duration: 3000, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) }), -1, true);
      opacity.value = withRepeat(withTiming(0.8, { duration: 3000, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) }), -1, true);
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.nodeContainer, { left: x, top: y }, animatedStyle]}>
      <View style={styles.nodeCore} />
      <View style={styles.nodeRing} />
    </Animated.View>
  );
};

const StructuralRib = ({ rotation, delay = 0, speed = 8000 }: { rotation: number, delay?: number, speed?: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withRepeat(withTiming(1, { duration: speed, easing: Easing.linear }), -1, false);
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0.02, 0]), // Subtle etched look
    transform: [
      { rotate: `${rotation}deg` },
      { translateX: interpolate(progress.value, [0, 1], [-width, width]) }
    ],
  }));

  return (
    <Animated.View style={[styles.rib, animatedStyle]}>
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.08)', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </Animated.View>
  );
};

const VibeBlob = ({ color, size, duration, delay = 0 }: { color: string, size: number, duration: number, delay?: number }) => {
  const moveX = useSharedValue(0);
  const moveY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    moveX.value = withRepeat(
      withSequence(
        withTiming(width * 0.4, { duration, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(0, { duration, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );
    moveY.value = withRepeat(
      withSequence(
        withTiming(height * 0.3, { duration: duration * 1.2, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(0, { duration: duration * 1.2, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );
    scale.value = withRepeat(
      withTiming(1.4, { duration: duration * 1.5, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: moveX.value },
      { translateY: moveY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={[
      styles.vibeBlob, 
      { 
        backgroundColor: color, 
        width: size, 
        height: size, 
        borderRadius: size / 2,
        left: -size / 4,
        top: -size / 4,
      },
      animatedStyle
    ]} />
  );
};

export const LivingBlueprintBackground = () => {
  const { isDark } = useTheme();
  
  const sweepProgress = useSharedValue(0);

  useEffect(() => {
    sweepProgress.value = withRepeat(
      withTiming(1, { duration: 12000, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) }),
      -1,
      true
    );
  }, []);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(sweepProgress.value, [0, 1], [-width, width]) },
      { rotate: '45deg' }
    ],
    opacity: interpolate(sweepProgress.value, [0, 0.5, 1], [0.02, 0.05, 0.02]),
  }));

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? '#0D0E12' : '#F8FAFC' }]}>
      {/* 1. Vibe Engine (The "Answer" to Glassmorphism) */}
      <VibeBlob color={isDark ? 'rgba(0, 209, 255, 0.08)' : 'rgba(0, 209, 255, 0.04)'} size={width * 1.2} duration={25000} />
      <VibeBlob color={isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(168, 85, 247, 0.04)'} size={width * 1.5} duration={35000} delay={5000} />
      <VibeBlob color={isDark ? 'rgba(255, 107, 0, 0.04)' : 'rgba(255, 107, 0, 0.03)'} size={width} duration={45000} delay={10000} />

      {/* 2. Structural Ribs (Architectural Grid) */}
      <StructuralRib rotation={-30} delay={0} speed={25000} />
      <StructuralRib rotation={30} delay={5000} speed={20000} />

      {/* 3. Topographical Elements (Subtle Etched detail) */}
      <View style={styles.topographicContainer}>
        <LinearGradient
          colors={isDark ? ['transparent', 'rgba(255, 255, 255, 0.02)', 'transparent'] : ['transparent', 'rgba(15, 23, 42, 0.01)', 'transparent']}
          style={[styles.contourLine, { top: '30%', height: 1, width: '150%', transform: [{ rotate: '-15deg' }] }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* 4. System Nodes (Tiny Indicator Lights) */}
      <SystemNode x={width * 0.25} y={height * 0.2} delay={0} />
      <SystemNode x={width * 0.75} y={height * 0.45} delay={2000} />
      <SystemNode x={width * 0.4} y={height * 0.8} delay={4000} />

      {/* 5. Specular Refraction Sweep */}
      <Animated.View style={[styles.sweep, sweepStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeCore: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B00',
    shadowColor: '#FF6B00',
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  nodeRing: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  rib: {
    position: 'absolute',
    height: height * 2,
    width: 2,
    top: -height * 0.5,
  },
  topographicContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  contourLine: {
    position: 'absolute',
    left: '-25%',
  },
  sweep: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 2.5,
    top: -height * 0.5,
  },
  vibeBlob: {
    position: 'absolute',
    opacity: 1, // Controlled by rgba color
    filter: Platform.OS === 'ios' ? 'blur(100px)' : 'blur(50px)', // Fallback for android
  },
});
