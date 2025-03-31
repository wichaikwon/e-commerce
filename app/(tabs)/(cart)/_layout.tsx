import { useCart } from '@/contexts/useCart'
import { View, Text, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { Stack, useRouter } from 'expo-router'

const CartLayout: React.FC = () => {
  const { totalPrice } = useCart()
  const router = useRouter()
  return (
    <Fragment>
      <Stack />
      <View className="flex relative">
        <View className="absolute bottom-0 bg-white w-full flex-row px-4 py-2 flex items-center justify-between shadow-md">
          <Text className="font-semibold text-base">
            Price: {totalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || '$0.00'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/qr-code/checkout')
            }}
            className="bg-blue-500 p-2 rounded-md">
            <Text className="text-white font-semibold">Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  )
}

export default CartLayout
