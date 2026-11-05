
import { useState } from 'react'
import { Link } from 'react-router'
import './Header.css'

import logoAcc from '../../assets/header-asssets/acc.svg'
import logoArrow from '../../assets/header-asssets/Arrow.png'
import logoBasket from '../../assets/header-asssets/basket.svg'
import logoSearch from '../../assets/header-asssets/search.svg'

function Header({ search, onSearchChange, cartCount, onCartClick }) {
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
        <button
          className="header__action-btn header__cart"
          aria-label="Shopping cart"
          onClick={onCartClick}
        >
          <img src={logoBasket} alt="" />

          {cartCount > 0 && (
            <span className="header__badge">
              {cartCount}
            </span>
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
