import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.message}>
        {message}
      </Text>
    </View>
  );
};

export const LoadingState = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text variant="bodyMedium" style={styles.loadingText}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
});
