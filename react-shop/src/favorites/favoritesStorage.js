export function sanitizeFavorites(value) {
  if (!Array.isArray(value)) return []

  return value.filter(
    (item) =>
      item &&
      typeof item.id === 'number' &&
      typeof item.title === 'string' &&
      typeof item.price === 'number' &&
      typeof item.rating === 'number' &&
      typeof item.thumbnail === 'string'
  )
}