import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image, Switch, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { Theme } from '../../constants/Theme';
import { User, Bus, Bell, Shield, HelpCircle, LogOut, ChevronRight, Settings, Star, CreditCard, Leaf } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { LivingBlueprintBackground } from '../../components/LivingBlueprintBackground';
import { useAuth } from '../../context/AuthContext';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

import { LightColors } from '../../constants/Theme';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editName, setEditName] = React.useState(user?.displayName || '');
  const [savingName, setSavingName] = React.useState(false);

  // Update local editName when user loads
  React.useEffect(() => {
    if (user?.displayName) {
      setEditName(user.displayName);
    } else if (user?.email) {
      setEditName(user.email.split('@')[0]);
    }
  }, [user]);

  const userFallbackName = user?.email ? user.email.split('@')[0] : 'User';
  const displayName = user?.displayName || userFallbackName;
  const displayInitials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleSaveName = async () => {
    if (!editName.trim() || !user) {
      setIsEditingName(false);
      return;
    }
    setSavingName(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: editName });
        // The auth user object is updated, a reload would sync, but we use editName contextually
      }
    } catch (e) {
      console.warn("Failed to update profile", e);
    } finally {
      setIsEditingName(false);
      setSavingName(false);
    }
  };

  const currentVisualName = isEditingName ? editName : (auth.currentUser?.displayName || 'User');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LivingBlueprintBackground />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarBorder}>
            <View style={[styles.avatarGlow, { backgroundColor: colors.accentCyan }]} />
            <View style={[styles.avatarInner, { backgroundColor: colors.surface }]}>
              <Text style={[styles.avatarText, { color: colors.text }]}>{displayInitials}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.editBadge, { backgroundColor: colors.text, borderColor: colors.background }]}
              onPress={() => isEditingName ? handleSaveName() : setIsEditingName(true)}
            >
              {savingName ? (
                <ActivityIndicator size="small" color={isDark ? colors.background : colors.surface} />
              ) : (
                <Settings size={14} color={isDark ? colors.background : colors.surface} />
              )}
            </TouchableOpacity>
          </View>
          
          {isEditingName ? (
            <TextInput
              style={[styles.userNameInput, { color: colors.text, borderColor: colors.primary, borderBottomWidth: 1 }]}
              value={editName}
              onChangeText={setEditName}
              autoFocus
              onSubmitEditing={handleSaveName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textMuted}
            />
          ) : (
            <Text style={[styles.userName, { color: colors.text }]}>{currentVisualName}</Text>
          )}
        </View>

        {/* Menu Sections */}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security Settings</Text>
        </View>

        <View style={styles.menuStack}>
          <View style={styles.menuWrapper}>
            <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={styles.menuCard}>
              <View style={[styles.innerBorder, { borderRadius: 28, borderColor: colors.glassBorder, borderWidth: 1.5, backgroundColor: colors.glass }]} />
              <View style={[styles.glossRim, { backgroundColor: colors.glassGloss }]} />
              <View style={[styles.menuIcon, { backgroundColor: 'rgba(255, 107, 0, 0.08)', borderColor: 'rgba(255, 107, 0, 0.3)', borderWidth: 1 }]}>
                <Bell size={20} color={colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuLabel, { color: colors.text }]}>Proximity Alerts</Text>
              </View>
              <Switch 
                value={isNotificationsEnabled} 
                onValueChange={setIsNotificationsEnabled}
                trackColor={{ false: 'rgba(0,0,0,0.1)', true: colors.accentGreen }}
                thumbColor="#FFF"
              />
            </BlurView>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutWrapper} onPress={() => signOut(auth)}>
          <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={styles.logoutBtn}>
            <View style={[styles.innerBorder, { borderRadius: 24, borderColor: 'rgba(255, 77, 148, 0.4)', borderWidth: 1.5, backgroundColor: 'rgba(255, 77, 148, 0.05)' }]} />
            <LogOut size={20} color={colors.accentRed} />
            <Text style={[styles.logoutText, { color: colors.accentRed }]}>Log Out</Text>
          </BlurView>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.brandText, { color: colors.textMuted }]}>Kinnova Tech™</Text>
        </View>
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
    paddingBottom: 150,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  avatarBorder: {
    marginBottom: 20,
    position: 'relative',
  },
  avatarGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    filter: 'blur(40px)',
    opacity: 0.2,
    alignSelf: 'center',
    top: -20,
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: Theme.typography.black,
  },
  editBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    borderWidth: 2,
  },
  userName: {
    fontSize: 28,
    fontFamily: Theme.typography.black,
    letterSpacing: -1,
  },
  userNameInput: {
    fontSize: 28,
    fontFamily: Theme.typography.black,
    letterSpacing: -1,
    minWidth: 150,
    textAlign: 'center',
    paddingBottom: 4,
  },
  userRole: {
    fontSize: 12,
    fontFamily: Theme.typography.black,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.6,
  },
  statsWrapper: {
    marginBottom: 48,
    borderRadius: 32,
    overflow: 'hidden',
  },
  statsGlass: {
    flexDirection: 'row',
    padding: 24,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 1.2,
  },
  glossRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    opacity: 0.8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: Theme.typography.black,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: Theme.typography.black,
    letterSpacing: 1.5,
    marginTop: 6,
    opacity: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    alignSelf: 'center',
    opacity: 0.5,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Theme.typography.black,
    letterSpacing: -0.5,
  },
  menuStack: {
    gap: 12,
    marginBottom: 40,
  },
  menuWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 28,
    gap: 16,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontFamily: Theme.typography.bold,
  },
  menuSub: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    opacity: 0.6,
  },
  logoutWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 48,
  },
  logoutBtn: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Theme.typography.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    opacity: 0.3,
  },
  brandText: {
    fontSize: 10,
    fontFamily: Theme.typography.black,
    marginTop: 6,
    opacity: 0.2,
  },
});
