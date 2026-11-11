import { useState, useEffect } from 'react'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=100'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [])

  return { products, loading, error }
}