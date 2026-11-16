import { Link, useParams } from 'react-router'
import './CartPage.css'

function OrderSuccessPage() {
  const { orderNumber } = useParams()

  return (
    <main className="cart-page">
      <h1 className="cart-page__title">ORDER PLACED</h1>

      <div className="cart-empty">
        <h2>Thank you for your order!</h2>
        <p>
          Your order number: <strong>#{orderNumber}</strong>
        </p>

        <Link to="/" className="cart-empty__button">
          Go to Catalog
        </Link>
      </div>
    </main>
  )
}

export default OrderSuccessPage