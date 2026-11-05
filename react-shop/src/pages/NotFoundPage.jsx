
import { Link } from 'react-router'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="not-found__code">404</span>

      <h1>Page Not Found</h1>

<p>
  Sorry, the page you're looking for doesn't exist
  or may have been moved.
</p>

<Link to="/" className="not-found__button">
  Back to Shop
  <span>→</span>
</Link>
    </main>
  )
}

export default NotFoundPage
