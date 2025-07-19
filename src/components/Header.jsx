import logo from "../img/logo.svg";
import banniere from "../img/banniere.jpg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Range } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 500;

const Header = ({ handleToken, userToken, onFilterChange }) => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const [title, setTitle] = useState("");
  const [range, setRange] = useState([MIN, MAX]);
  const [sort, setSort] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange({
      title,
      priceMin: range[0],
      priceMax: range[1],
      sort,
    });
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form onSubmit={handleSubmit} className="filter-form">
        <input
          type="text"
          placeholder="Recherche par titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="slider-container">
          <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={range}
            onChange={(values) => setRange(values)}
            renderTrack={({ props, children }) => (
              <div {...props}>{children}</div>
            )}
            renderThumb={({ props }) => <div {...props} />}
          />
          <div>
            Prix entre {range[0]}€ et {range[1]}€
          </div>
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Trier</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>

        <button type="submit">Filtrer</button>
      </form>
      <div className="header-buttons">
        {!userToken ? (
          <>
            <Link to="/login">
              <button>Connexion</button>
            </Link>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
          </>
        ) : (
          <Link>
            <button
              onClick={() => {
                handleToken();
              }}
            >
              Déconnexion
            </button>
          </Link>
        )}

        <button>Vends tes articles</button>
      </div>

      {!isSignUpPage && !isLoginPage && (
        <img className="header-banner" src={banniere} alt="bannière vinted" />
      )}
    </div>
  );
};

export default Header;
