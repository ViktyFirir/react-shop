import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useSearchParams } from 'react-router'

import Header from './components/Header/Header'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/ProductPage'

import './App.css'

function App() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'default'

  const setSearch = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value.trim()) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    const query = params.toString()

    if (window.location.pathname !== '/') {
      navigate(query ? `/?${query}` : '/')
    } else {
      setSearchParams(params)
    }
  }

  const setCategory = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }

    setSearchParams(params)
  }

  const setSort = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value === 'default') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }

    setSearchParams(params)
  }

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products?limit=100'
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products/category-list'
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }

    fetchCategories()
  }, [])

  const prices = products.map((product) => product.price)

  const bounds = products.length
    ? {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices)),
      }
    : { min: 0, max: 0 }

  const currentMin = priceMin ?? bounds.min
  const currentMax = priceMax ?? bounds.max

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'all' || product.category === category) &&
      product.price >= currentMin &&
      product.price <= currentMax
  )

  const visibleProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating

    return 0
  })

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage
              categories={categories}
              category={category}
              setCategory={setCategory}
              bounds={bounds}
              currentMin={currentMin}
              currentMax={currentMax}
              setPriceMin={setPriceMin}
              setPriceMax={setPriceMax}
              sort={sort}
              setSort={setSort}
              visibleProducts={visibleProducts}
              loading={loading}
              error={error}
            />
          }
        />

        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App