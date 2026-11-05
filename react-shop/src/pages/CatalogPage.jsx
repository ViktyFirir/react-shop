
import Sidebar from '../components/Sidebar/Sidebar'
import ProductCard from '../components/ProductCard/ProductCard'


function CatalogPage({
  categories, category, setCategory,
  bounds, currentMin, currentMax, setPriceMin, setPriceMax,
  sort, setSort,
  visibleProducts, loading, error,
  setSelectedProduct, addToCart,
})
{
    return (
      <>
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
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>
      </main>

     
    </>     
    )
}
export default CatalogPage