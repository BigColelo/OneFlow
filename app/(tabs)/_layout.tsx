import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '../../components/haptic-tab';
import { IconSymbol } from '../../components/ui/icon-symbol';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.border,
        tabBarStyle: {
          backgroundColor: colors.card,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tareas',
          tabBarLabel: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="list.bullet" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
          tabBarLabel: 'Calendario',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: 'Compra',
          tabBarLabel: 'Compra',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="cart.fill" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="person.crop.circle.fill" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
