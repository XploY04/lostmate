import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useItems } from '../../context/ItemsContext';
import { ItemCard } from '../../components/ItemCard';
import { SearchBar } from '../../components/SearchBar';
import { FABButton } from '../../components/FABButton';
import { EmptyState, LoadingState } from '../../components/EmptyState';
import { Item } from '../../types';

export default function HomeScreen() {
  const { items, loading } = useItems();
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items, selectedType, searchQuery]);

  const renderItem = ({ item }: { item: Item }) => <ItemCard item={item} />;

  if (loading) {
    return <LoadingState />;
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by title, category, or location..."
      />

      <SegmentedButtons
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as 'all' | 'lost' | 'found')}
        buttons={[
          { value: 'all', label: 'All Items' },
          { value: 'lost', label: 'Lost' },
          { value: 'found', label: 'Found' },
        ]}
        style={styles.segmentedButtons}
      />

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            message={
              searchQuery
                ? 'No items found matching your search'
                : selectedType === 'all'
                ? 'No items yet. Be the first to post!'
                : `No ${selectedType} items yet`
            }
          />
        }
      />

      <FABButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  segmentedButtons: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
});
