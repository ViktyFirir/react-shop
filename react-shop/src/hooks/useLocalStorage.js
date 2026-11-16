import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue, sanitize = (value) => value) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)

      if (saved === null) return initialValue

      return sanitize(JSON.parse(saved))
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Failed to save "${key}":`, err)
    }
  }, [key, value])

  return [value, setValue]
}