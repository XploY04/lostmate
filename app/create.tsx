import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  Menu,
  Divider,
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useItems } from '../context/ItemsContext';
import { categories } from '../data/mockData';
import { Item } from '../types';

export default function CreateEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addItem, updateItem, getItemById } = useItems();

  const isEditMode = !!id;
  const existingItem = isEditMode ? getItemById(id!) : undefined;

  const [type, setType] = useState<'lost' | 'found'>(existingItem?.type || 'lost');
  const [title, setTitle] = useState(existingItem?.title || '');
  const [category, setCategory] = useState(existingItem?.category || categories[0]);
  const [description, setDescription] = useState(existingItem?.description || '');
  const [location, setLocation] = useState(existingItem?.location || '');
  const [date, setDate] = useState(existingItem?.date || new Date().toISOString().split('T')[0]);
  const [contact, setContact] = useState(existingItem?.contact || '');
  const [image, setImage] = useState(existingItem?.image || '');
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    location?: string;
    contact?: string;
    image?: string;
  }>({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'We need camera roll permissions to upload images');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }

    if (!image) {
      newErrors.image = 'Please upload an image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please fill in all required fields correctly');
      return;
    }

    try {
      setLoading(true);

      const itemData = {
        type,
        title: title.trim(),
        category,
        description: description.trim(),
        location: location.trim(),
        date,
        contact: contact.trim(),
        image,
      };

      if (isEditMode) {
        await updateItem(id!, itemData);
        Alert.alert('Success', 'Item updated successfully!');
      } else {
        await addItem(itemData);
        Alert.alert('Success', 'Item posted successfully!');
      }

      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to save item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Item Type
        </Text>
        <SegmentedButtons
          value={type}
          onValueChange={(value) => setType(value as 'lost' | 'found')}
          buttons={[
            { value: 'lost', label: 'Lost', icon: 'alert-circle-outline' },
            { value: 'found', label: 'Found', icon: 'check-circle-outline' },
          ]}
          style={styles.segmentedButtons}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Item Details
        </Text>

        <TextInput
          label="Item Title *"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          mode="outlined"
          style={styles.input}
          error={!!errors.title}
          placeholder="e.g., iPhone 14 Pro"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setCategoryMenuVisible(true)}
              style={styles.categoryButton}
            >
              <View style={styles.categoryButtonContent}>
                <Text style={styles.categoryLabel}>Category</Text>
                <View style={styles.categoryValueContainer}>
                  <Text style={styles.categoryValue}>{category}</Text>
                  <Feather name="chevron-down" size={20} color="#666" />
                </View>
              </View>
            </TouchableOpacity>
          }
        >
          {categories.map((cat) => (
            <Menu.Item
              key={cat}
              onPress={() => {
                setCategory(cat);
                setCategoryMenuVisible(false);
              }}
              title={cat}
            />
          ))}
        </Menu>

        <TextInput
          label="Description *"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
          error={!!errors.description}
          placeholder="Provide detailed description..."
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <TextInput
          label="Location *"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            setErrors((prev) => ({ ...prev, location: undefined }));
          }}
          mode="outlined"
          style={styles.input}
          error={!!errors.location}
          placeholder="e.g., Main Library, 2nd Floor"
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <TextInput
          label="Date *"
          value={date}
          onChangeText={setDate}
          mode="outlined"
          style={styles.input}
          placeholder="YYYY-MM-DD"
        />

        <TextInput
          label="Contact Information *"
          value={contact}
          onChangeText={(text) => {
            setContact(text);
            setErrors((prev) => ({ ...prev, contact: undefined }));
          }}
          mode="outlined"
          style={styles.input}
          error={!!errors.contact}
          placeholder="Email or phone number"
          keyboardType="email-address"
        />
        {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>}

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Item Photo *
        </Text>

        <TouchableOpacity
          onPress={pickImage}
          style={[
            styles.imagePicker,
            errors.image && styles.imagePickerError,
          ]}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePickerContent}>
              <Feather name="camera" size={40} color="#999" />
              <Text style={styles.imagePickerText}>Tap to upload image</Text>
            </View>
          )}
        </TouchableOpacity>
        {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={loading}
          disabled={loading}
        >
          {isEditMode ? 'Update Item' : 'Post Item'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#212121',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 100,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  categoryButtonContent: {
    flexDirection: 'column',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  categoryValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryValue: {
    fontSize: 16,
    color: '#212121',
  },
  divider: {
    marginVertical: 16,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  imagePickerError: {
    borderColor: '#F44336',
  },
  imagePickerContent: {
    alignItems: 'center',
  },
  imagePickerText: {
    marginTop: 8,
    color: '#999',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 32,
    paddingVertical: 6,
    backgroundColor: '#2196F3',
  },
});
