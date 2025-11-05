import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB } from 'react-native-paper';
import { useRouter } from 'expo-router';

export const FABButton = () => {
  const router = useRouter();

  return (
    <PaperFAB
      icon="plus"
      style={styles.fab}
      onPress={() => router.push('/create')}
      color="#fff"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});
