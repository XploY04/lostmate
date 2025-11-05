import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { ItemsProvider } from '../context/ItemsContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <PaperProvider>
      <ItemsProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="create"
            options={{
              title: 'Create Post',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="item/[id]"
            options={{
              title: 'Item Details',
              headerStyle: { backgroundColor: '#2196F3' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack>
      </ItemsProvider>
    </PaperProvider>
  );
}
