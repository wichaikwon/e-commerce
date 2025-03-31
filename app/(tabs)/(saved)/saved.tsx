import { productItem } from '@/constants/data'
import { useSaved } from '@/contexts/useSaved'
import { Link } from 'expo-router'
import { HeartIcon } from 'lucide-react-native'
import { useMemo } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function SavedScreen() {
  const { saved, addToSaved, removeFromSaved } = useSaved()
  const filteredSaved = useMemo(() => {
    return saved
      .map((id) => productItem.product_items.find((item) => item.id.toString() === id))
      .filter((item) => item !== undefined)
  }, [saved])
  return (
    <View className="flex-1">
      {filteredSaved.length === 0 ? (
        <View className="flex-1 justify-center items-center ">
          <Text className="text-lg font-bold">No saved items found.</Text>
        </View>
      ) : (
        <ScrollView>
          <View className="flex flex-col px-4 py-8 gap-8 h-screen">
            <Text className="text-2xl font-bold text-gray-800">Saved</Text>
            <View className="grid grid-cols-2 gap-4">
              {filteredSaved.map((item, idx) => (
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
                        {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
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
      )}
    </View>
  )
}
