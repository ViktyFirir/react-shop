export function sanitizeCart(value) {
  if (!Array.isArray(value)) return []

  return value.filter(
    (item) =>
      item &&
      typeof item.id === 'number' &&
      typeof item.title === 'string' &&
      typeof item.price === 'number' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
  )
}