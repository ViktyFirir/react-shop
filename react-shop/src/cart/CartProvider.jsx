import { useReducer, useEffect, useMemo } from 'react'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'
import { loadCart, saveCart } from './cartStorage'

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

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