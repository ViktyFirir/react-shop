import './Header.css';


import logoAcc from '../../assets/header-asssets/acc.svg';
import logoArrow from '../../assets/header-asssets/Arrow.png';
import logoBasket from '../../assets/header-asssets/basket.svg';
import logoSearch from '../../assets/header-asssets/search.svg';

function Header() {
  return (
    <header className="header">
      {}
      <div className="header__logo">SHOP.CO</div>

      {}
      <nav className="header__nav">
        <div className="header__link-wrapper">
          <a href="#" className="header__link">Shop</a>
          {}
          <img src={logoArrow} alt="" className="header__dropdown-icon" />
        </div>
        <a href="#" className="header__link">On Sale</a>
        <a href="#" className="header__link">New Arrivals</a>
        <a href="#" className="header__link">Brands</a>
      </nav>

      {}
      <div className="header__search-container">
        {}
        <img src={logoSearch} alt="" className="header__search-icon" />
        <input 
          type="text" 
          className="header__search-input" 
          placeholder="Search for products..." 
        />
      </div>

      {}
      <div className="header__actions">
        <button className="header__action-btn" aria-label="Cart">
          {}
          <img src={logoBasket} alt="Cart" />
        </button>
        <button className="header__action-btn" aria-label="Profile">
          {}
          <img src={logoAcc} alt="Profile" />
        </button>
      </div>
    </header>
  );
}

export default Header;
