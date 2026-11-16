import { Link } from 'react-router'
import './ProductCard.css'

function ProductCard({
  productId,
  title,
  price,
  rating,
  image,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) {
  return (
    <article className="product-card">
      <Link to={`/product/${productId}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img className="product-card__image" src={image} alt={title} />
        </div>

        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__rating">
          <span className="product-card__star">★</span> {rating.toFixed(1)}/5
        </div>

        <p className="product-card__price">${price.toFixed(2)}</p>
      </Link>

      <button
        className={`product-card__fav ${
          isFavorite ? 'product-card__fav--active' : ''
        }`}
        type="button"
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        {isFavorite ? '♥ In Favorites' : '♡ Add to Favorites'}
      </button>

      <button
        className="product-card__btn"
        type="button"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </article>
  )
}

export default ProductCard