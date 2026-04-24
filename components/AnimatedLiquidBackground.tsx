import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');

interface FloatingBlobProps {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
}

const FloatingBlob = ({ color, size, initialX, initialY, duration }: FloatingBlobProps) => {
  const transX = useSharedValue(0);
  const transY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const configX = { duration, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) };
    const configY = { duration: duration * 1.2, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) };
    const configS = { duration: duration * 0.8, easing: Easing.bezier(0.445, 0.05, 0.55, 0.95) };

    transX.value = withRepeat(
      withSequence(
        withTiming(20, configX),
        withTiming(-20, configX)
      ),
      -1,
      true
    );
    transY.value = withRepeat(
      withSequence(
        withTiming(-30, configY),
        withTiming(30, configY)
      ),
      -1,
      true
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, configS),
        withTiming(1, configS)
      ),
      -1,
      true
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: initialX + transX.value },
      { translateY: initialY + transY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View 
      style={[
        styles.blob, 
        { 
          backgroundColor: color, 
          width: size, 
          height: size, 
          borderRadius: size / 2,
        }, 
        animatedStyle
      ]} 
    />
  );
};

export const AnimatedLiquidBackground = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background, overflow: 'hidden' }]}>
      {/* Iridescent Blobs - Cyber Obsidian Orange Palette */}
      <FloatingBlob 
        color={isDark ? '#451a03' : 'rgba(251, 146, 60, 0.2)'} // Burnt Orange / Amber
        size={width * 1.3} 
        initialX={width * 0.3} 
        initialY={-height * 0.15} 
        duration={12000}
      />
      <FloatingBlob 
        color={isDark ? '#0f172a' : 'rgba(148, 163, 184, 0.3)'} // Deep Slate
        size={width * 1.4} 
        initialX={-width * 0.4} 
        initialY={height * 0.45} 
        duration={15000}
      />
      <FloatingBlob 
        color={isDark ? '#FF6B00' : 'rgba(255, 82, 0, 0.15)'} // Vibrant Orange Glow Node
        size={width * 1.1} 
        initialX={width * 0.15} 
        initialY={height * 0.15} 
        duration={14000}
      />
      
      {/* Specular Glints - Faster moving, tiny white dots for gloss light-traps */}
      <FloatingBlob 
        color="rgba(255, 255, 255, 0.04)" 
        size={width * 0.4} 
        initialX={width * 0.2} 
        initialY={height * 0.2} 
        duration={8000}
      />
      <FloatingBlob 
        color="rgba(255, 255, 255, 0.03)" 
        size={width * 0.3} 
        initialX={width * 0.7} 
        initialY={height * 0.6} 
        duration={6000}
      />

      <FloatingBlob 
        color={isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.1)'} // Specular Pearl / Shadow
        size={width * 0.9} 
        initialX={width * 0.6} 
        initialY={height * 0.75} 
        duration={18000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    opacity: 0.15,
    filter: 'blur(80px)', // Fallback for web, will look like a soft circle on native if blur is not supported
  },
});
