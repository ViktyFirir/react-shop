import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FavoritesContext } from './FavoritesContext'
import { sanitizeFavorites } from './favoritesStorage'

export function FavoritesProvider({ children }) {
  const [items, setItems] = useLocalStorage('favorites', [], sanitizeFavorites)

  const value = useMemo(() => {
    const isFavorite = (id) => items.some((item) => item.id === id)

    const toggleFavorite = (product) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) {
          return prev.filter((item) => item.id !== product.id)
        }

        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.rating,
            thumbnail: product.thumbnail,
          },
        ]
      })
    }

    return { items, totalCount: items.length, isFavorite, toggleFavorite }
  }, [items, setItems])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}