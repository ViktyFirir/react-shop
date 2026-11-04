import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import ProductCard from './components/ProductCard/ProductCard'
import Sidebar from './components/Sidebar/Sidebar'
import ProductModal from './components/ProductModal/ProductModal'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [priceMin, setPriceMin] = useState(null)
  const [priceMax, setPriceMax] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100')
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
        const response = await fetch('https://dummyjson.com/products/category-list')
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
    ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
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
      <main className="main">
        <Sidebar
          categories={categories}
          activeCategory={category}
          onSelect={setCategory}
          bounds={bounds}
          priceMin={currentMin}
          priceMax={currentMax}
          onPriceChange={(min, max) => {
            setPriceMin(min)
            setPriceMax(max)
          }}
        />

        <section className="content">
          <div className="content__top">
            <h1 className="content__title">Products</h1>
            <select
              className="content__sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {loading && <p className="status">Loading products...</p>}
          {error && <p className="status status--error">Error loading products: {error}</p>}

          {!loading && !error && visibleProducts.length === 0 && (
            <p className="status">Ничего не найдено</p>
          )}

          <div className="products-grid">
            {!loading && !error && visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.thumbnail}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}

export default App