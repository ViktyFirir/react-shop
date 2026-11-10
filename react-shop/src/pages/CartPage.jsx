import { Link } from 'react-router'
import { useCart } from '../cart/useCart'
import './CartPage.css'

function CartPage() {
  const { items, totalCount, totalPrice, changeQuantity, removeItem } =
    useCart()

  return (
    <main className="cart-page">
      <div className="cart-breadcrumbs">
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Cart</span>
      </div>

      <h1 className="cart-page__title">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add products from the catalog to continue shopping.</p>

          <Link to="/" className="cart-empty__button">
            Go to Catalog
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-products">
            {items.map((item) => (
              <article className="cart-product" key={item.id}>
                <div className="cart-product__image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>

                <div className="cart-product__info">
                  <div className="cart-product__top">
                    <h3>{item.title}</h3>

                    <button
                      className="cart-product__remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      ×
                    </button>
                  </div>

                  <p className="cart-product__price">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="cart-product__bottom">
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>

                    <div className="cart-quantity">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <strong>{totalCount}</strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <button
              className="checkout-button"
              type="button"
              disabled
            >
              Continue
              <span>→</span>
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage