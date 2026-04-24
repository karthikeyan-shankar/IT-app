import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, Map, Bell, User } from 'lucide-react-native';
import { Theme } from '../../constants/Theme';

import { ThemeProvider, useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 24, 
          left: 20, 
          right: 20,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: isDark ? 0.35 : 0.12,
          shadowRadius: 25,
          overflow: 'hidden',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.6)',
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={100} 
            tint={isDark ? "dark" : "light"} 
            style={[StyleSheet.absoluteFill, { backgroundColor: isDark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.7)' }]} 
          />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false, 
        tabBarItemStyle: {
          height: 80,
          justifyContent: 'center', 
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View style={[
                styles.activeBackground, 
                focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
              ]}>
                <Home 
                  size={22} 
                  color={focused ? colors.primary : colors.textMuted} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </View>
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View style={[
                styles.activeBackground, 
                focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
              ]}>
                <Map 
                  size={22} 
                  color={focused ? colors.primary : colors.textMuted} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </View>
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View style={[
                styles.activeBackground, 
                focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
              ]}>
                <Bell 
                  size={22} 
                  color={focused ? colors.primary : colors.textMuted} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </View>
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <View style={[
                styles.activeBackground, 
                focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
              ]}>
                <User 
                  size={22} 
                  color={focused ? colors.primary : colors.textMuted} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </View>
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    minWidth: width / 4 - 10,
  },
  activeBackground: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor:Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});
