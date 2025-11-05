import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search items...',
}: SearchBarProps) => {
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.searchbar}
      iconColor="#2196F3"
      inputStyle={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    margin: 16,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
  },
});
