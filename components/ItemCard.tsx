import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { Item } from '../types';
import { useRouter } from 'expo-router';

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();

  const getStatusColor = () => {
    if (item.status === 'claimed') return '#9E9E9E';
    return item.type === 'lost' ? '#F44336' : '#4CAF50';
  };

  const getStatusLabel = () => {
    if (item.status === 'claimed') return 'Claimed';
    return item.type === 'lost' ? 'Lost' : 'Found';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/item/${item.id}`)}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Chip
            style={[styles.statusChip, { backgroundColor: getStatusColor() }]}
            textStyle={styles.chipText}
          >
            {getStatusLabel()}
          </Chip>
        </View>

        <Card.Content style={styles.content}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>

          <View style={styles.row}>
            <Feather name="tag" size={14} color="#666" />
            <Text variant="bodySmall" style={styles.category}>
              {item.category}
            </Text>
          </View>

          <View style={styles.row}>
            <Feather name="map-pin" size={14} color="#666" />
            <Text variant="bodySmall" style={styles.location} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.row}>
            <Feather name="calendar" size={14} color="#666" />
            <Text variant="bodySmall" style={styles.date}>
              {formatDate(item.date)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusChip: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  category: {
    marginLeft: 6,
    color: '#666',
  },
  location: {
    marginLeft: 6,
    color: '#666',
    flex: 1,
  },
  date: {
    marginLeft: 6,
    color: '#666',
  },
});
