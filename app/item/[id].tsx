import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, Button, Card, Chip, Divider } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useItems } from '../../context/ItemsContext';
import { LoadingState } from '../../components/EmptyState';

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getItemById, claimItem, deleteItem, user } = useItems();
  const [claiming, setClaiming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const item = getItemById(id!);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const isMyPost = item.userId === user.id;
  const canClaim = !isMyPost && item.status === 'active';

  const handleClaim = async () => {
    Alert.alert(
      'Claim Item',
      'Are you sure you want to mark this item as claimed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Claim',
          onPress: async () => {
            try {
              setClaiming(true);
              await claimItem(id!);
              Alert.alert('Success', 'Item marked as claimed!');
            } catch (error) {
              Alert.alert('Error', 'Failed to claim item');
            } finally {
              setClaiming(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/create?id=${id}`);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await deleteItem(id!);
              Alert.alert('Success', 'Item deleted successfully');
              router.back();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete item');
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (claiming || deleting) {
    return <LoadingState />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Chip
          style={[styles.statusChip, { backgroundColor: getStatusColor() }]}
          textStyle={styles.chipText}
        >
          {getStatusLabel()}
        </Chip>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {item.title}
          </Text>

          <View style={styles.infoRow}>
            <Feather name="tag" size={18} color="#666" />
            <Text variant="bodyLarge" style={styles.infoText}>
              {item.category}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.sectionTitle}>
            Description
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {item.description}
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.infoRow}>
            <Feather name="map-pin" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelMedium" style={styles.label}>
                Location
              </Text>
              <Text variant="bodyMedium">{item.location}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Feather name="calendar" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelMedium" style={styles.label}>
                Date
              </Text>
              <Text variant="bodyMedium">{formatDate(item.date)}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Feather name="mail" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text variant="labelMedium" style={styles.label}>
                Contact
              </Text>
              <Text variant="bodyMedium">{item.contact}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {isMyPost ? (
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleEdit}
                style={[styles.button, styles.editButton]}
                icon="pencil"
              >
                Edit Post
              </Button>
              <Button
                mode="outlined"
                onPress={handleDelete}
                style={styles.button}
                textColor="#F44336"
                icon="delete"
              >
                Delete
              </Button>
            </View>
          ) : (
            canClaim && (
              <Button
                mode="contained"
                onPress={handleClaim}
                style={styles.claimButton}
                icon="check-circle"
              >
                Mark as Claimed
              </Button>
            )
          )}

          {item.status === 'claimed' && !isMyPost && (
            <Text variant="bodyMedium" style={styles.claimedText}>
              This item has been claimed.
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusChip: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    marginTop: -20,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212121',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    marginLeft: 12,
    color: '#666',
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    color: '#999',
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  description: {
    lineHeight: 22,
    color: '#424242',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  claimButton: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
  claimedText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 8,
  },
});
