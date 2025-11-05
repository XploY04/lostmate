import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item, User } from '../types';
import { mockItems, mockUser } from '../data/mockData';

interface ItemsContextType {
  items: Item[];
  user: User;
  addItem: (item: Omit<Item, 'id' | 'userId' | 'status'>) => Promise<void>;
  updateItem: (id: string, item: Partial<Item>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  claimItem: (id: string) => Promise<void>;
  getItemById: (id: string) => Item | undefined;
  getUserItems: () => Item[];
  loading: boolean;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const STORAGE_KEY = '@lostmate_items';

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const user = mockUser;

  // Load items from AsyncStorage on mount
  useEffect(() => {
    loadItems();
  }, []);

  // Save items to AsyncStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveItems();
    }
  }, [items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      } else {
        // Use mock data if no stored data
        setItems(mockItems);
      }
    } catch (error) {
      console.error('Error loading items:', error);
      setItems(mockItems);
    } finally {
      setLoading(false);
    }
  };

  const saveItems = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const addItem = async (newItem: Omit<Item, 'id' | 'userId' | 'status'>) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      userId: user.id,
      status: 'active',
    };

    setItems((prev) => [item, ...prev]);
  };

  const updateItem = async (id: string, updatedFields: Partial<Item>) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  const deleteItem = async (id: string) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const claimItem = async (id: string) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'claimed' } : item
      )
    );
  };

  const getItemById = (id: string): Item | undefined => {
    return items.find((item) => item.id === id);
  };

  const getUserItems = (): Item[] => {
    return items.filter((item) => item.userId === user.id);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        user,
        addItem,
        updateItem,
        deleteItem,
        claimItem,
        getItemById,
        getUserItems,
        loading,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};
