import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { useUserStore } from '../store/userStore';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const [navigationReady, setNavigationReady] = useState(false);
  const user = useUserStore((state) => state.user);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = useMemo(() => {
    const palette = Colors[colorScheme];
    const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: palette.background,
        card: palette.background,
        primary: palette.tint,
        text: palette.text,
        border: palette.tabIconDefault,
        notification: palette.tint,
      },
    };
  }, [colorScheme]);

  useEffect(() => {
    if (navigationState?.key) {
      setNavigationReady(true);
    }
  }, [navigationState]);

  useLayoutEffect(() => {
    if (!navigationReady) {
      return;
    }

    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && inTabsGroup) {
      router.replace('/login');
    } else if (user && !inTabsGroup) {
      router.replace('/(tabs)');
    }
  }, [navigationReady, router, segments, user]);

  if (!navigationReady) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
