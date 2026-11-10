import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { useCart } from '../cart/useCart'
import './ProductPage.css'

function ProductPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      setProduct(null)

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found')
          }

          throw new Error('Failed to load product')
        }

        const data = await response.json()

        setProduct(data)
        setActiveImage(
          data.images?.length ? data.images[0] : data.thumbnail
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <p className="status">Loading product...</p>
  }

  if (error || !product) {
    return (
      <main className="product-page">
        <div className="product-page__error">
          <h1>{error || 'Product not found'}</h1>
          <Link to="/">Back to catalog</Link>
        </div>
      </main>
    )
  }

  const images = product.images?.length
    ? product.images
    : [product.thumbnail]

  return (
    <main className="product-page">
      <Link to="/" className="product-page__back">
        <span className="product-page__back-arrow">←</span>
        <span>Back to catalog</span>
      </Link>

      <div className="product-page__layout">
        <div className="product-page__gallery">
          {images.length > 1 && (
            <div className="product-page__thumbs">
              {images.map((src) => (
                <button
                  key={src}
                  className={`product-page__thumb ${
                    src === activeImage
                      ? 'product-page__thumb--active'
                      : ''
                  }`}
                  onClick={() => setActiveImage(src)}
                  aria-label="Select product image"
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}

          <div className="product-page__main-image">
            <img src={activeImage} alt={product.title} />
          </div>
        </div>

        <div className="product-page__info">
          <h1 className="product-page__title">{product.title}</h1>

          <div className="product-page__rating">
            <span className="product-page__star">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="product-page__rating-max">/5</span>
          </div>

          <p className="product-page__price">
            ${product.price.toFixed(2)}
          </p>

          <p className="product-page__description">
            {product.description}
          </p>

          <button
            className="product-page__cart-btn"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductPage