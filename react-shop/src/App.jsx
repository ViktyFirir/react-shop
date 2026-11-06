
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useSearchParams } from 'react-router'

import Header from './components/Header/Header'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/ProductPage'

import './App.css'

function loadCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'

  const setSearch = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value.trim() === '') {
      params.delete('q')
    } else {
      params.set('q', value)
    }

    setSearchParams(params)
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

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [sort, setSort] = useState('default')
  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)

  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const found = cart.find((item) => item.id === product.id)

    if (found) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }

        return item
      })

      setCart(newCart)
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      }

      setCart([...cart, newItem])
    }
  }

  const changeQuantity = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta

        if (newQuantity < 1) return item

        return { ...item, quantity: newQuantity }
      }

      return item
    })

    setCart(newCart)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  let cartCount = 0
  let cartTotal = 0

  cart.forEach((item) => {
    cartCount += item.quantity
    cartTotal += item.price * item.quantity
  })

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

        if (!response.ok) return

        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCategories()
  }, [])

  const prices = products.map((p) => p.price)

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
      <Header
        search={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
        onCartClick={() => navigate('/cart')}
      />

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
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductPage onAddToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <CartPage
              items={cart}
              total={cartTotal}
              onChangeQuantity={changeQuantity}
              onRemove={removeFromCart}
            />
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  )
}

export default App
