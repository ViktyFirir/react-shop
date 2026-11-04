import './ProductCard.css';

function ProductCard({ title, price, rating, image, onClick }) {
  return (
    <article
      className="product-card"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onClick();
      }}
      tabIndex={0}
      role="button"
    >
      <div className="product-card__image-wrapper">
        <img className="product-card__image" src={image} alt={title} />
      </div>
      <h3 className="product-card__title">{title}</h3>
      <div className="product-card__rating">
        <span className="product-card__star">★</span> {rating.toFixed(1)}/5
      </div>
      <p className="product-card__price">${price.toFixed(2)}</p>
    </article>
  );
}

export default ProductCard;