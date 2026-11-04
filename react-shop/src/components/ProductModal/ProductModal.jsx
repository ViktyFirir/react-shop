import { useState, useEffect } from 'react';
import './ProductModal.css';

function ProductModal({ product, onClose, onAddToCart }) {
  const images = product.images?.length ? product.images : [product.thumbnail];
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal__close" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>

        <div className="modal__gallery">
          {images.length > 1 && (
            <div className="modal__thumbs">
              {images.map((src) => (
                <button
                  key={src}
                  className={`modal__thumb ${src === activeImage ? 'modal__thumb--active' : ''}`}
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
          <h2 className="modal__title">{product.title}</h2>

          <div className="modal__rating">
            <span className="modal__star">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="modal__rating-max">/5</span>
          </div>

          <p className="modal__price">${product.price.toFixed(2)}</p>

          <p className="modal__description">{product.description}</p>

          <button
            className="modal__cart-btn"
            onClick={() => onAddToCart?.(product)}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;