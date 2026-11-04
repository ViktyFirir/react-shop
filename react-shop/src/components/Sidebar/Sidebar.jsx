import { useState } from 'react';
import './Sidebar.css';

function Sidebar({
  categories, activeCategory, onSelect,
  bounds, priceMin, priceMax, onPriceChange,
}) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const span = bounds.max - bounds.min;
  const ratio = (v) => (span ? (v - bounds.min) / span : 0);
  const pos = (r) => `calc(10px + (100% - 20px) * ${r})`;

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Filters</h2>

      <ul className="sidebar__list">
        {['all', ...categories].map((name) => (
          <li key={name}>
            <button
              className={`sidebar__btn ${activeCategory === name ? 'sidebar__btn--active' : ''}`}
              onClick={() => onSelect(name)}
            >
              <span>{name === 'all' ? 'All categories' : name.replace(/-/g, ' ')}</span>
              <span className="sidebar__arrow">›</span>
            </button>
          </li>
        ))}
      </ul>

      {span > 0 && (
        <div className="price">
          <button
            className="price__header"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            aria-expanded={isPriceOpen}
          >
            <span>Price</span>
            <span className={`price__chevron ${isPriceOpen ? 'price__chevron--open' : ''}`}>⌃</span>
          </button>

          {isPriceOpen && (
            <>
              <div className="price__track">
                <div
                  className="price__fill"
                  style={{
                    left: pos(ratio(priceMin)),
                    right: pos(1 - ratio(priceMax)),
                  }}
                />
                <input
                  type="range"
                  min={bounds.min}
                  max={bounds.max}
                  value={priceMin}
                  onChange={(e) =>
                    onPriceChange(Math.min(Number(e.target.value), priceMax - 1), priceMax)
                  }
                />
                <input
                  type="range"
                  min={bounds.min}
                  max={bounds.max}
                  value={priceMax}
                  onChange={(e) =>
                    onPriceChange(priceMin, Math.max(Number(e.target.value), priceMin + 1))
                  }
                />
              </div>

              <div className="price__labels">
                <span className="price__label" style={{ left: pos(ratio(priceMin)) }}>
                  ${priceMin}
                </span>
                <span className="price__label" style={{ left: pos(ratio(priceMax)) }}>
                  ${priceMax}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;