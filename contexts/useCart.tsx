import { productItem } from '@/constants/data'
import { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  id: string
  quantity: number
}
interface CartContextType {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
  totalPrice?: number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalPrice: 0,
})

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cartItems = localStorage.getItem('__cartItems')
    return cartItems ? JSON.parse(cartItems) : []
  })
  const totalPrice = cart.reduce((acc, item) => {
    const product = productItem.product_items.find(product => product.id.toString() === item.id)
    return acc + (product ? product.price * item.quantity : 0)
  }, 0)
  useEffect(() => {
    localStorage.setItem('__cartItems', JSON.stringify(cart))
  }, [cart])

  const addToCart = (id: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === id)
      if (existingItem) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prev, { id, quantity: 1 }]
      }
    })
  }
  const removeFromCart = (id: string) => {
    setCart(prev => [...prev.filter(item => item.id !== id)])
  }
  const clearCart = () => {
    setCart([])
  }
  const increaseQuantity = (id: string) => {
    setCart(prev => {
      return prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    })
  }
  const decreaseQuantity = (id: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
      } else {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity } : item,
        )
      }
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
