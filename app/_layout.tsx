import { Stack } from 'expo-router'
import '@/app/global.css'
import { CartProvider } from '@/contexts/useCart'
import { SavedProvider } from '@/contexts/useSaved'
export default function RootLayout() {
  return (
    <CartProvider>
      <SavedProvider>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SavedProvider>
    </CartProvider>
  )
}
