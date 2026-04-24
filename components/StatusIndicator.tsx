import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { Theme } from '../constants/Theme';

interface StatusIndicatorProps {
  color?: string;
  size?: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  color,
  size = 8 
}) => {
  const { colors } = useTheme();
  const displayColor = color || colors.accentGreen;
  const opacity = useSharedValue(0.7);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    scale.value = withRepeat(
      withTiming(2.5, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    backgroundColor: color,
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.pulse, animatedStyle, { borderRadius: size }]} />
      <View style={[styles.dot, { backgroundColor: color, borderRadius: size, width: size, height: size }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dot: {
    zIndex: 1,
  },
});
