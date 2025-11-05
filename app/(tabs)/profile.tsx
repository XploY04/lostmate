import React from 'react';
import { View, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import { Text, Card, Avatar, Button, Divider, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useItems } from '../../context/ItemsContext';
import { ItemCard } from '../../components/ItemCard';
import { EmptyState } from '../../components/EmptyState';
import { Item } from '../../types';

export default function ProfileScreen() {
  const { user, getUserItems } = useItems();
  const router = useRouter();
  const myItems = getUserItems();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            Alert.alert('Logged Out', 'You have been logged out successfully!');
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const renderItem = ({ item }: { item: Item }) => <ItemCard item={item} />;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text
            size={80}
            label={user.name.split(' ').map(n => n[0]).join('')}
            style={styles.avatar}
          />
          <Text variant="headlineSmall" style={styles.name}>
            {user.name}
          </Text>
          <Text variant="bodyMedium" style={styles.email}>
            {user.email}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {myItems.length}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Total Posts
              </Text>
            </View>
            <Divider style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {myItems.filter(item => item.status === 'active').length}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Active
              </Text>
            </View>
            <Divider style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {myItems.filter(item => item.status === 'claimed').length}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Claimed
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleEditProfile}
              style={styles.editButton}
              icon="account-edit"
            >
              Edit Profile
            </Button>
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.logoutButton}
              textColor="#F44336"
              icon="logout"
            >
              Logout
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.postsCard}>
        <Card.Content>
          <View style={styles.postsHeader}>
            <Feather name="list" size={24} color="#2196F3" />
            <Text variant="titleLarge" style={styles.postsTitle}>
              My Posts
            </Text>
          </View>

          {myItems.length === 0 ? (
            <EmptyState message="You haven't posted any items yet" />
          ) : (
            <View>
              {myItems.map((item) => (
                <View key={item.id} style={styles.itemWrapper}>
                  <ItemCard item={item} />
                </View>
              ))}
            </View>
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
  profileCard: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    elevation: 3,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    backgroundColor: '#2196F3',
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#212121',
  },
  email: {
    color: '#666',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    flex: 1,
    borderColor: '#F44336',
  },
  postsCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    elevation: 3,
  },
  postsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  postsTitle: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: '#212121',
  },
  itemWrapper: {
    marginHorizontal: -16,
    marginVertical: -8,
  },
});
