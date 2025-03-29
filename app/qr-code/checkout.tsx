import { useCart } from '@/contexts/useCart'
import QRCode from 'react-native-qrcode-svg'
import { View, Text } from 'react-native'

const Checkout = () => {
  const { totalPrice } = useCart()
  const paymentUrl = `https://payment.spw.challenge/checkout?price=${totalPrice}`
  return (
    <View className="flex-1 flex gap-4 items-center justify-center bg-white p-4">
      <View className='border-8 rounded-lg p-4'>
        <QRCode value={paymentUrl} size={200} />
      </View>
      <Text className="text-lg font-bold">Scan & Pay</Text>
      <Text className="text-lg font-semibold">
        รวม:{' '}
        {totalPrice ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice) : '$0.00'}{' '}
        บาท
      </Text>
    </View>
  )
}

export default Checkout
