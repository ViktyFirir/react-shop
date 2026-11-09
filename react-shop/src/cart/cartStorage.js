const CART_KEY = 'cart'

export function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY)

    if (!saved) return []

    const parsedCart = JSON.parse(saved)

    if (!Array.isArray(parsedCart)) return []

    return parsedCart.filter(
      (item) =>
        item &&
        typeof item.id === 'number' &&
        typeof item.title === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    )
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  } catch (err) {
    console.error('Failed to save cart:', err)
  }
}