import { useContext } from 'react'
import { FavoritesContext } from './FavoritesContext'

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (context === null) {
    throw new Error('useFavorites must be used inside FavoritesProvider')
  }

  return context
}