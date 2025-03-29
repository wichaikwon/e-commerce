import { productItem } from '@/constants/data'
import { useCart } from '@/contexts/useCart'
import { useSaved } from '@/contexts/useSaved'
import { usePathname } from 'expo-router/build/hooks'
import { HeartIcon } from 'lucide-react-native'
import { Fragment, useMemo } from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
const ProductItem: React.FC = () => {
  const pathname = usePathname()
  const id = pathname.split('/')[2]
  const { saved, addToSaved, removeFromSaved } = useSaved()
  const { addToCart } = useCart()
  const selectedItem = useMemo(() => {
    return productItem.product_items.find((item) => item.id.toString() === id)
  }, [id])
  return (
    <Fragment>
      {selectedItem && (
        <View className="flex flex-col gap-4 px-4 py-10">
          <Image
            source={{ uri: selectedItem.image_url }}
            style={{
              width: '100%',
              height: 400,
              borderRadius: 10,
            }}
          />
          <View className="flex flex-col items-start gap-1 px-2">
            <View className="flex items-center justify-between flex-row w-full">
              <Text>{selectedItem.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  saved.includes(selectedItem.id.toString())
                    ? removeFromSaved(selectedItem.id.toString())
                    : addToSaved(selectedItem.id.toString())
                }}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: 'transparent',
                }}>
                <HeartIcon className={`${saved.includes(selectedItem.id.toString()) && 'fill-red-500 text-red-500'}`} />
              </TouchableOpacity>
            </View>
            <Text>
              {selectedItem.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
            <View style={{ width: '100%' }}>
              <Button
                onPress={() => {
                  addToCart(selectedItem.id.toString())
                }}
                title="Add to Cart"
                color="#1E90FF"
              />
            </View>
          </View>
        </View>
      )}
    </Fragment>
  )
}
export default ProductItem
