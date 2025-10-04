import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TASKS: Task[] = [
  { id: '1', title: 'Planificar menú semanal', completed: false },
  { id: '2', title: 'Revisar tareas del colegio', completed: true },
  { id: '3', title: 'Hacer inventario de la despensa', completed: false },
];

export default function TasksScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Tareas pendientes</Text>
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>{item.title}</Text>
            <Text
              style={[styles.taskStatus, { color: item.completed ? colors.primary : colors.border }]}
            >
              {item.completed ? 'Completada' : 'Pendiente'}
            </Text>
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
  separator: {
    height: 1,
  },
  taskItem: {
    paddingVertical: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskStatus: {
    fontSize: 14,
  },
});
