import { productItem } from '@/constants/data'
import { useSaved } from '@/contexts/useSaved'
import { Link } from 'expo-router'
import { HeartIcon } from 'lucide-react-native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Index: React.FC = () => {
  const { saved, addToSaved, removeFromSaved } = useSaved()
  return (
    <ScrollView>
      <View className="flex flex-col px-4 py-8 gap-8 h-screen">
        <Text className="text-2xl font-bold text-gray-800">For You</Text>
        <View className="grid grid-cols-2 gap-4">
          {productItem.product_items.map((item, idx) => (
            <View key={idx} className="flex flex-col gap-1 relative">
              <Link href={`/product/${item.id}`}>
                <Image
                  source={{ uri: item.image_url }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View className="flex flex-col gap-1 px-2">
                  <Text className="text-lg font-semibold text-gray-900">
                    {item.name.length > 20 ? `${item.name.slice(0, 15)}...` : item.name}
                  </Text>
                  <Text className="font-semibold text-gray-900">
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </Text>
                </View>
              </Link>
              <TouchableOpacity
                onPress={() => {
                  if (saved.includes(item.id.toString())) {
                    removeFromSaved(item.id.toString())
                  } else {
                    addToSaved(item.id.toString())
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'white',
                  borderRadius: 50,
                  padding: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <HeartIcon
                  color={saved.includes(item.id.toString()) ? 'red' : 'black'}
                  fill={saved.includes(item.id.toString()) ? 'red' : 'none'}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
export default Index
