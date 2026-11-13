import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from '../../cart/useCart'
import { useFavorites } from '../../favorites/useFavorites'
import './Header.css'

import logoAcc from '../../assets/header-asssets/acc.svg'
import logoArrow from '../../assets/header-asssets/Arrow.png'
import logoBasket from '../../assets/header-asssets/basket.svg'
import logoSearch from '../../assets/header-asssets/search.svg'

function Header({ search, onSearchChange }) {
  const navigate = useNavigate()
  const { totalCount } = useCart()
  const { totalCount: favoritesCount } = useFavorites()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <button
        className="header__burger"
        aria-label="Menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <Link
        to="/"
        className="header__logo"
        onClick={() => setIsMenuOpen(false)}
      >
        SHOP.CO
      </Link>

      <nav
        className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="header__link-wrapper">
          <Link to="/" className="header__link">
            Shop
          </Link>

          <img
            src={logoArrow}
            alt=""
            className="header__dropdown-icon"
          />
        </div>

        <Link to="/" className="header__link">
          On Sale
        </Link>

        <Link to="/" className="header__link">
          New Arrivals
        </Link>

        <Link to="/" className="header__link">
          Brands
        </Link>
      </nav>

      <div className="header__search-container">
        <img
          src={logoSearch}
          alt=""
          className="header__search-icon"
        />

        <input
          type="text"
          className="header__search-input"
          placeholder="Search for products..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="header__actions">
        <Link
          to="/favorites"
          className="header__action-btn header__favorites"
          aria-label="Favorites"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2 0 3.6 1 5.3 3 1.7-2 3.3-3 5.3-3 3.7 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z" />
          </svg>

          {favoritesCount > 0 && (
            <span className="header__badge">{favoritesCount}</span>
          )}
        </Link>

        <button
          className="header__action-btn header__cart"
          aria-label="Shopping cart"
          onClick={() => navigate('/cart')}
        >
          <img src={logoBasket} alt="" />

          {totalCount > 0 && (
            <span className="header__badge">{totalCount}</span>
          )}
        </button>

        <button
          className="header__action-btn"
          aria-label="Profile"
        >
          <img src={logoAcc} alt="Profile" />
        </button>
      </div>
    </header>
  )
}

export default Header