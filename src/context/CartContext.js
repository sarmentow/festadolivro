import { createContext, useState, React, useMemo, useCallback } from 'react'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = useCallback((item) => {
    setCartItems((prevItems) => [...prevItems, item])
  }, [])

  const removeItemFromCart = useCallback((item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i !== item))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const value = useMemo(
    () => ({ cartItems, addItemToCart, removeItemFromCart, clearCart }),
    [cartItems, addItemToCart, removeItemFromCart, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartProvider, CartContext }
