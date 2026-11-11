import { useReducer, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'
import { sanitizeCart } from './cartStorage'

export function CartProvider({ children }) {
  const [storedItems, setStoredItems] = useLocalStorage('cart', [], sanitizeCart)
  const [items, dispatch] = useReducer(cartReducer, storedItems)

  useEffect(() => {
    setStoredItems(items)
  }, [items, setStoredItems])

  const value = useMemo(() => {
    let totalCount = 0
    let totalPrice = 0

    items.forEach((item) => {
      totalCount += item.quantity
      totalPrice += item.price * item.quantity
    })

    return {
      items,
      totalCount,
      totalPrice,
      addItem: (product) => dispatch({ type: 'add', product }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      changeQuantity: (id, delta) =>
        dispatch({ type: 'changeQuantity', id, delta }),
      clearCart: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}