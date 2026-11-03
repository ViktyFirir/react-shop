import './ProductCard.css';
function ProductCard({title, price, rating, image}) {
    return (
       <article className="product-card">
  <div className="product-card__image-wrapper">
    <img className="product-card__image" src={image} alt={title} />
  </div>
  <h3 className="product-card__title">{title}</h3>
  <div className="product-card__rating">
    <span className="product-card__star">★</span> {rating}/5
  </div>
  <p className="product-card__price">${price.toFixed(2)}</p>
</article>
    );
}
export default ProductCard;