import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { supabase } from '../../lib/supabase';
import { useUserStore } from '../../store/userStore';

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { colors } = useTheme();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error al cerrar sesión', error.message);
      return;
    }

    setUser(null);
  };

  if (!user) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.border }]}>
          No se encontró información del usuario.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Perfil</Text>
      <View style={styles.infoSection}>
        <Text style={[styles.infoLabel, { color: colors.text }]}>Correo electrónico</Text>
        <Text style={[styles.infoValue, { color: colors.border }]}>{user.email}</Text>
      </View>
      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutLabel}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
