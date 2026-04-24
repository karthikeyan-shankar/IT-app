export const LightColors = {
  primary: '#FF5200', // Vibrant Heritage Orange
  secondary: '#FFFFFF',
  background: '#F8FAFC', 
  surface: 'rgba(255, 255, 255, 0.4)', 
  text: '#0F172A',
  textSecondary: 'rgba(15, 23, 42, 0.65)',
  textMuted: 'rgba(15, 23, 42, 0.4)',
  glass: 'rgba(255, 255, 255, 0.15)', // Highly transparent frosted
  glassBorder: 'rgba(255, 255, 255, 0.9)', // Sharp obsidian edge
  glassInnerBorder: 'rgba(255, 255, 255, 0.3)', // Specular glint
  glassTint: 'rgba(255, 82, 0, 0.02)',
  glassGloss: 'rgba(255, 255, 255, 0.1)', // Surface sheen
  orangeGradient: ['#FF5200', '#FF7E47'],
  cardShadow: 'rgba(0, 0, 0, 0.04)',
  skeleton: '#F1F5F9',
  accentGreen: '#34C759', 
  accentRed: '#FF3B30', 
  accentCyan: '#0EA5E9', 
  accentLavender: '#8B5CF6',
};

export const DarkColors = {
  primary: '#FF6B00', 
  secondary: '#1E293B',
  background: '#0D0E12', 
  surface: 'rgba(15, 23, 42, 0.4)', 
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.4)',
  glass: 'rgba(15, 23, 42, 0.15)', 
  glassBorder: 'rgba(255, 255, 255, 0.85)', // Sharp crystal edge
  glassInnerBorder: 'rgba(255, 255, 255, 0.2)', // Refractive bevel
  glassTint: 'rgba(255, 107, 0, 0.04)',
  glassGloss: 'rgba(255, 255, 255, 0.12)', // Increased specular glint
  orangeGradient: ['#FF6B00', '#FF8D66'],
  cardShadow: 'rgba(0, 0, 0, 0.85)',
  skeleton: '#1E293B',
  accentGreen: '#A3FF33', 
  accentRed: '#FF4D94', 
  accentCyan: '#00F5FF', 
  accentLavender: '#C084FC', 
};

export const Theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    xs: 8,
    sm: 12,
    md: 20,
    lg: 28,
    xl: 36,
    xxl: 48, // New pill radius
    full: 999,
  },
  typography: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    black: 'Inter_900Black',
  },
  colors: LightColors,
};

export type ColorsType = typeof LightColors;
