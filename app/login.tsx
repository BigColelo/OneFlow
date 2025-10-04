import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { z } from 'zod';

import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/userStore';

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string({ error: 'Introduce tu email' }).email('Email inválido'),
  password: z
    .string({ error: 'Introduce tu contraseña' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function LoginScreen() {
  const setUser = useUserStore((state) => state.setUser);
  const { colors, dark } = useTheme();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        if (fieldName === 'email' || fieldName === 'password') {
          setError(fieldName, { message: issue.message });
        }
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
      return;
    }

    if (data.user) {
      setUser(data.user);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.content}>
        <Text style={[styles.heading, { color: colors.text }]}>Bienvenido a OneFlow</Text>
        <Text style={[styles.subtitle, { color: colors.border }]}>
          Inicia sesión para acceder a tus tareas familiares
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[
                  styles.input,
                  {
                    borderColor: errors.email ? '#ef4444' : colors.border,
                    color: colors.text,
                  },
                ]}
                placeholderTextColor={colors.border}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              ) : null}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.field, styles.fieldWithGap]}>
              <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                style={[
                  styles.input,
                  {
                    borderColor: errors.password ? '#ef4444' : colors.border,
                    color: colors.text,
                  },
                ]}
                placeholderTextColor={colors.border}
              />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              ) : null}
            </View>
          )}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={[styles.primaryButton, { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 }]}
        >
          {isSubmitting ? (
            <ActivityIndicator color={dark ? colors.background : '#ffffff'} />
          ) : (
            <Text
              style={{
                color: dark ? colors.background : '#ffffff',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Iniciar sesión
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  fieldWithGap: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
    marginTop: 4,
  },
});
