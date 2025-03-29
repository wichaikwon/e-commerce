
import { useCart } from '@/contexts/useCart'
import { Tabs } from 'expo-router'
import { Heart, Home, ShoppingCart } from 'lucide-react-native'

const ProductTabsLayout: React.FC = () => {
  const {  cart } = useCart()

  return (
    
      <Tabs screenOptions={{ headerShown: false }} >
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Home fill={color} color={color} />,
          }}
        />
        <Tabs.Screen
          name="(saved)"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color }) => <Heart fill={color} color={color} />,
          }}
        />
        <Tabs.Screen
          name="(cart)"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <ShoppingCart fill={color} color={color} />,
            tabBarBadge: cart.length > 0 ? cart.length : undefined,
            tabBarBadgeStyle: {
              backgroundColor: 'red',
              color: 'white',
              fontSize: 12,
            },
          }}
        />
      </Tabs>
  )
}

export default ProductTabsLayout
