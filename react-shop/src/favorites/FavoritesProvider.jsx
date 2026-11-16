import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FavoritesContext } from './FavoritesContext'
import { sanitizeFavorites } from './favoritesStorage'

export function FavoritesProvider({ children }) {
  const [items, setItems] = useLocalStorage('favorites', [], sanitizeFavorites)

  const value = useMemo(() => {
    const isFavorite = (id) => items.some((item) => item.id === id)

    const toggleFavorite = (product) => {
      if (isFavorite(product.id)) {
        setItems(items.filter((item) => item.id !== product.id))
        return
      }

      setItems([
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
        },
      ])
    }

    return { items, totalCount: items.length, isFavorite, toggleFavorite }
  }, [items, setItems])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}