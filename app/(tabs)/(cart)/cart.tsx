import { productItem } from '@/constants/data'
import { useCart } from '@/contexts/useCart'
import { Minus, Plus, Trash2 } from 'lucide-react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Text, View, Image, Animated, PanResponder, TouchableOpacity, ScrollView } from 'react-native'

const Cart: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const [activeItem, setActiveItem] = useState<string>('')
  const filteredCart = useMemo(
    () =>
      cart.map((cartItem) => {
        const product = productItem.product_items.find((item) => item.id.toString() === cartItem.id)
        return product && { ...product, quantity: cartItem.quantity }
      }),
    [cart]
  )
  const itemAnimation = useRef(new Map()).current
  const getOrCreateAnimation = (itemId: string) => {
    if (!itemAnimation.has(itemId)) {
      itemAnimation.set(itemId, new Animated.Value(0))
    }
    return itemAnimation.get(itemId)
  }
  const handleSwipeClose = (itemId: string) => {
    if (activeItem !== itemId) {
      const activeAnimation = itemAnimation.get(activeItem)
      if (activeAnimation) {
        activeAnimation.stopAnimation()
        Animated.spring(activeAnimation, {
          toValue: 0,
          useNativeDriver: false,
        }).start()
      }
    }
    setActiveItem('')
    const animation = itemAnimation.get(itemId)
    if (animation) {
      animation.stopAnimation()
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: false,
      }).start()
    }
  }

  const handleSwipeOpen = (itemId: string) => {
    if (activeItem && activeItem !== itemId) {
      handleSwipeClose(activeItem)
    }
    setActiveItem(itemId)
    const animation = itemAnimation.get(itemId)
    if (animation) {
      animation.stopAnimation()
      Animated.spring(animation, {
        toValue: -100,
        useNativeDriver: false,
      }).start()
    }
  }
  const handleDelete = (itemId: string) => {
    Animated.timing(itemAnimation.get(itemId), {
      toValue: -500,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      removeFromCart(itemId)
      itemAnimation.delete(itemId)
      setActiveItem('')
    })
  }

  return (
    <View className="flex-1">
      {filteredCart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-bold">No Items in Cart</Text>
        </View>
      ) : (
        <ScrollView>
          <View className="flex flex-col px-4 py-8 gap-8 h-screen ">
            <Text className="text-2xl font-bold text-gray-800">Cart</Text>
            <View className="flex flex-col gap-4 pb-16">
              {filteredCart.map((item, idx) => {
                if (!item) return
                const translateX = getOrCreateAnimation(item.id.toString())
                const panResponder = PanResponder.create({
                  onStartShouldSetPanResponder: () => true,
                  onMoveShouldSetPanResponder: (_, { dx }) => Math.abs(dx) > 10,
                  onPanResponderMove: (_, { dx }) => {
                    if (dx < 0) {
                      translateX.setValue(dx)
                    }
                  },
                  onPanResponderRelease: (_, { dx }) => {
                    if (dx < -50) {
                      handleSwipeOpen(item.id.toString())
                    } else {
                      handleSwipeClose(item.id.toString())
                    }
                  },
                })
                return (
                  <View className="overflow-hidden" key={idx}>
                    <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
                      <View className="flex flex-row items-center">
                        <Image
                          source={{ uri: item?.image_url }}
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                        <View className="flex flex-col gap-1 px-2">
                          <Text className="text-lg font-semibold text-gray-900">
                            {item?.name && item.name.length > 20
                              ? `${item.name.substring(0, 20)}...`
                              : (item?.name ?? '')}
                          </Text>
                          <Text className="font-semibold text-gray-900 text-base">
                            {item?.price.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })}
                          </Text>
                          <View className="border flex flex-row  justify-between w-28 items-center rounded-md gap-2">
                            <Text
                              className="p-2 border-r"
                              onPress={() => item?.id && decreaseQuantity(item.id.toString())}>
                              <Minus size={16} />
                            </Text>
                            <Text className="text-lg">{item?.quantity}</Text>
                            <Text
                              className="p-2 border-l"
                              onPress={() => item?.id && increaseQuantity(item.id.toString())}>
                              <Plus size={16} />
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Animated.View>
                    {activeItem === item.id.toString() && (
                        <TouchableOpacity
                          onPress={() => handleDelete(item.id.toString())}
                          className="absolute right-0 top-0 bottom-0 w-16 bg-red-500 justify-center items-center">
                          <Trash2 size={24} color="white" />
                        </TouchableOpacity>
                    )}
                  </View>
                )
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Cart
