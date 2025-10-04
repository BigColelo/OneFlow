import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const SHOPPING_LIST = [
  { id: '1', name: 'Leche entera', quantity: '2L' },
  { id: '2', name: 'Pan integral', quantity: '1 paquete' },
  { id: '3', name: 'Huevos', quantity: '12 unidades' },
];

export default function ShoppingScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Lista de la compra</Text>
      <FlatList
        data={SHOPPING_LIST}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.itemRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.itemQuantity, { color: colors.border }]}>{item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  itemRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 14,
  },
});
