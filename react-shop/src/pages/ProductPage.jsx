
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import './ProductPage.css'
import '../components/ProductModal/ProductModal.css'

function ProductPage({ onAddToCart }) {
  const { id } = useParams()

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

      <div className="modal product-page__layout">
        <div className="modal__gallery">
          {images.length > 1 && (
            <div className="modal__thumbs">
              {images.map((src) => (
                <button
                  key={src}
                  className={`modal__thumb ${
                    src === activeImage
                      ? 'modal__thumb--active'
                      : ''
                  }`}
                  onClick={() => setActiveImage(src)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}

          <div className="modal__main-image">
            <img src={activeImage} alt={product.title} />
          </div>
        </div>

        <div className="modal__info">
          <h1 className="modal__title">
            {product.title}
          </h1>

          <div className="modal__rating">
            <span className="modal__star">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="modal__rating-max">/5</span>
          </div>

          <p className="modal__price">
            ${product.price.toFixed(2)}
          </p>

          <p className="modal__description">
            {product.description}
          </p>

          <button
            className="modal__cart-btn"
            onClick={() => onAddToCart?.(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
