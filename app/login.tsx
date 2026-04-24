import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Mail, Lock, User, X, Hash } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../constants/Theme';
import { LivingBlueprintBackground } from '../components/LivingBlueprintBackground';

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!rollNo) {
          setError('Roll Number is required.');
          setLoading(false);
          return;
        }
        const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (userCred.user) {
          await updateProfile(userCred.user, { displayName: `${name} (${rollNo})` });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.warn("Auth Error:", err.code);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Invalid credentials. Please verify and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LivingBlueprintBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={[styles.mainBrandText, { color: colors.text }]}>InstiTrack</Text>
        
        <View style={styles.cardWrapper}>
          <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={[styles.glassCard, { backgroundColor: isDark ? 'rgba(20, 20, 25, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]}>
            <View style={[styles.innerBorder, { borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', borderWidth: 0 }]} />
            
            {/* Top Bar with Segmented Control and Close Icon */}
            <View style={styles.cardTopRow}>
              <View style={[styles.segmentedControl, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.05)' }]}>
                <TouchableOpacity 
                  style={[styles.segment, isSignUp && [styles.segmentActive, { backgroundColor: isDark ? '#2A2A2E' : '#FFFFFF' }]]} 
                  onPress={() => setIsSignUp(true)}
                >
                  <Text style={[styles.segmentText, { color: isSignUp ? colors.text : colors.textMuted }]}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.segment, !isSignUp && [styles.segmentActive, { backgroundColor: isDark ? '#2A2A2E' : '#FFFFFF' }]]} 
                  onPress={() => setIsSignUp(false)}
                >
                  <Text style={[styles.segmentText, { color: !isSignUp ? colors.text : colors.textMuted }]}>Sign in</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.closeButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <X size={16} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{isSignUp ? 'Create an account' : 'Sign in to account'}</Text>
            </View>

            {error ? (
              <View style={[styles.errorBox, { backgroundColor: 'rgba(255, 77, 148, 0.12)' }]}>
                <Text style={[styles.errorText, { color: colors.accentRed }]}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              {isSignUp && (
                <>
                  <View style={[styles.inputBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                    <User size={18} color={colors.textMuted} style={styles.icon} />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Full Name"
                      placeholderTextColor={colors.textMuted}
                      autoCapitalize="words"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  <View style={[styles.inputBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                    <Hash size={18} color={colors.textMuted} style={styles.icon} />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="College Roll No"
                      placeholderTextColor={colors.textMuted}
                      autoCapitalize="characters"
                      value={rollNo}
                      onChangeText={setRollNo}
                    />
                  </View>
                </>
              )}

              <View style={[styles.inputBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                <Mail size={18} color={colors.textMuted} style={styles.icon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={[styles.inputBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                <Lock size={18} color={colors.textMuted} style={styles.icon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity 
                style={[styles.submitButton, { backgroundColor: isDark ? '#FFF' : '#000' }, loading && { opacity: 0.8 }]} 
                onPress={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={isDark ? '#000' : '#FFF'} />
                ) : (
                  <Text style={[styles.submitButtonText, { color: isDark ? '#000' : '#FFF' }]}>
                    {isSignUp ? 'Create an account' : 'Sign in'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={[styles.footerTerms, { marginTop: 12 }]}>
              <Text style={[styles.footerText, { color: colors.textMuted }]}>
                By {isSignUp ? 'creating an account' : 'signing in'}, you agree to our Terms & Service
              </Text>
            </View>

          </BlurView>
        </View>

        <View style={styles.brandingFooter}>
          <Text style={[styles.brandText, { color: colors.textMuted }]}>Kinnova Tech</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  mainBrandText: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  cardWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  glassCard: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  innerBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
  },
  segment: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  segmentActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontFamily: Theme.typography.semiBold,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 28,
    fontFamily: Theme.typography.black,
    letterSpacing: -0.5,
  },
  errorBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontFamily: Theme.typography.semiBold,
  },
  form: {
    gap: 12,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: Theme.typography.medium,
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Theme.typography.bold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    fontSize: 11,
    fontFamily: Theme.typography.bold,
    letterSpacing: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 18,
    fontFamily: Theme.typography.black,
  },
  footerTerms: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: Theme.typography.medium,
  },
  brandingFooter: {
    marginTop: 32,
    alignItems: 'center',
  },
  brandText: {
    fontSize: 12,
    fontFamily: Theme.typography.bold,
    letterSpacing: 0.5,
  },
});
