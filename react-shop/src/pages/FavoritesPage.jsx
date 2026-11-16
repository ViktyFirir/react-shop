import { Link } from 'react-router'
import ProductCard from '../components/ProductCard/ProductCard'
import { useCart } from '../cart/useCart'
import { useFavorites } from '../favorites/useFavorites'
import './FavoritesPage.css'

function FavoritesPage() {
  const { addItem } = useCart()
  const { items, isFavorite, toggleFavorite } = useFavorites()

  return (
    <main className="favorites-page">
      <h1 className="favorites-page__title">Favorites</h1>

      {items.length === 0 ? (
        <div className="favorites-empty">
          <h2>No favorites yet</h2>
          <p>Press the heart on a product to save it here.</p>

          <Link to="/" className="favorites-empty__button">
            Go to Catalog
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.thumbnail}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={() => toggleFavorite(product)}
              onAddToCart={() => addItem(product)}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default FavoritesPage