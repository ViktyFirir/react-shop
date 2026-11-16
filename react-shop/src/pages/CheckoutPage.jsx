import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useCart } from '../cart/useCart'
import { validate } from '../checkout/validate'
import './CartPage.css'
import './CheckoutPage.css'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    name: 'address',
    label: 'Delivery address',
    type: 'text',
    autoComplete: 'street-address',
  },
]

const EMPTY_VALUES = { name: '', phone: '', email: '', address: '' }
const ALL_TOUCHED = { name: true, phone: true, email: true, address: true }

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalCount, totalPrice, clearCart } = useCart()
  const [values, setValues] = useState(EMPTY_VALUES)
  const [touched, setTouched] = useState({})
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  if (items.length === 0 && !isOrderPlaced) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched({ ...touched, [name]: true })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched(ALL_TOUCHED)

    if (!isValid) return

    const orderNumber = String(Date.now()).slice(-8)

    setIsOrderPlaced(true)
    clearCart()
    navigate(`/order/${orderNumber}`)
  }

  return (
    <main className="cart-page">
      <h1 className="cart-page__title">CHECKOUT</h1>

      <form className="cart-layout" onSubmit={handleSubmit} noValidate>
        <section className="checkout-form">
          <h2>Delivery details</h2>

          {FIELDS.map((field) => {
            const error = touched[field.name] ? errors[field.name] : undefined

            return (
              <div className="checkout-field" key={field.name}>
                <label htmlFor={`checkout-${field.name}`}>{field.label}</label>

                <input
                  id={`checkout-${field.name}`}
                  className={`checkout-field__input ${
                    error ? 'checkout-field__input--error' : ''
                  }`}
                  type={field.type}
                  name={field.name}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? `checkout-${field.name}-error` : undefined
                  }
                />

                {error && (
                  <p
                    id={`checkout-${field.name}-error`}
                    className="checkout-field__error"
                  >
                    {error}
                  </p>
                )}
              </div>
            )
          })}
        </section>

        <aside className="order-summary">
          <h2>Your order</h2>

          <ul className="checkout-items">
            {items.map((item) => (
              <li className="checkout-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />

                <div className="checkout-item__info">
                  <span className="checkout-item__title">{item.title}</span>
                  <span className="checkout-item__qty">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </span>
                </div>

                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <div className="summary-divider" />

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
            type="submit"
            disabled={!isValid}
          >
            Place order
            <span>→</span>
          </button>
        </aside>
      </form>
    </main>
  )
}

export default CheckoutPage