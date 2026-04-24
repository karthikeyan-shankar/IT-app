import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LightColors, DarkColors, ColorsType } from '../constants/Theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  colors: ColorsType;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // FINALLY LOCKED TO DARK MODE AS THE DEFINITIVE INSTI-TRACK THEME
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const toggleTheme = () => {
    // No-op - Theme is final
  };

  const isDark = true; 
  const colors = DarkColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
