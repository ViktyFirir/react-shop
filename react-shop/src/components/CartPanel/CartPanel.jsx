import { useEffect } from 'react';
import './CartPanel.css';

function CartPanel({ items, total, onClose, onChangeQuantity, onRemove }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart" onClick={(event) => event.stopPropagation()}>
        <div className="cart__top">
          <h2 className="cart__title">Корзина</h2>
          <button className="cart__close" aria-label="Закрыть" onClick={onClose}>×</button>
        </div>

        {items.length === 0 && <p className="cart__empty">Корзина пуста</p>}

        <ul className="cart__list">
          {items.map((item) => (
            <li className="cart__item" key={item.id}>
              <div className="cart__image">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="cart__info">
                <p className="cart__name">{item.title}</p>
                <p className="cart__price">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="cart__counter">
                  <button
                    onClick={() => onChangeQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onChangeQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="cart__remove" onClick={() => onRemove(item.id)}>
  Удалить
</button>
            </li>
          ))}
        </ul>

        <div className="cart__footer">
          <span>Итого</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}

export default CartPanel;