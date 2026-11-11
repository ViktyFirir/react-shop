import { useState, useCallback } from 'react'

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

  const setStoredValue = useCallback(
    (newValue) => {
      setValue(newValue)

      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (err) {
        console.error(`Failed to save "${key}":`, err)
      }
    },
    [key]
  )

  return [value, setStoredValue]
}