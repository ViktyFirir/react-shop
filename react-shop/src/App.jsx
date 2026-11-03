import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import ProductCard from './components/ProductCard/ProductCard'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products')
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


  return (
    <>
  <Header />
  <main className="main">
        {loading && <p>Loading products...</p>}
        {error && <p>Error loading products: {error}</p>}
    <div className="products-grid">
  
      
      {!loading && !error && products.map(product => (
        <ProductCard 
          key={product.id}
          title={product.title}
          price={product.price}
          rating={product.rating}
          image={product.thumbnail}
        />
      ))}

      
    </div>
  </main>
</>
  )
}

export default App
