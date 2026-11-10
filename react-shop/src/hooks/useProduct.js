import { useState, useEffect } from 'react'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      setProduct(null)

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found')
          }

          throw new Error('Failed to load product')
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchProduct()

    return () => controller.abort()
  }, [id])

  return { product, loading, error }
}