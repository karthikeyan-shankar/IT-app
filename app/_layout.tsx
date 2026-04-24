import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black 
} from '@expo-google-fonts/inter';
import { Theme } from '../constants/Theme';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent splash screen from hiding until fonts are ready
SplashScreen.preventAutoHideAsync();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      // If user is not logged in and trying to access tabs, redirect to login
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      // If user is logged in and on the login screen, redirect to home
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  return <>{children}</>;
}

import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <MainLayout onLayoutReady={onLayoutRootView} />
      </ThemeProvider>
    </AuthProvider>
  );
}

function MainLayout({ onLayoutReady }: { onLayoutReady: () => void }) {
  const { colors, isDark } = useTheme();
  
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutReady}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <AuthGuard>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthGuard>
    </View>
  );
}
