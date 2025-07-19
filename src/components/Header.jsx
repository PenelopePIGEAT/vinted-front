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
      <div className="header-top">
        <div className="header-left">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="header-center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Recherche des articles"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </form>
        </div>

        <div className="header-right">
          {!userToken ? (
            <>
              <Link to="/login">
                <button>Connexion</button>
              </Link>
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
              <Link to="/login" state={{ from: "/publish" }}>
                <button>Vends tes articles</button>
              </Link>
            </>
          ) : (
            <>
              <button className="logout" onClick={() => handleToken()}>
                Déconnexion
              </button>
              <Link to="/publish">
                <button>Vends tes articles</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="filters">
          <form onSubmit={handleSubmit} className="filter-form">
            <div className="slider-container">
              <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={range}
                onChange={(values) => setRange(values)}
                renderTrack={({ props, children }) => {
                  const { key, ...rest } = props;
                  return (
                    <div key={key} {...rest}>
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props }) => {
                  const { key, ...rest } = props;
                  return <div key={key} {...rest} />;
                }}
              />
              <div>
                Prix entre {range[0]}€ et {range[1]}€
              </div>
            </div>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="">Trier</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>

            <button type="submit">Filtrer</button>
          </form>
        </div>
      )}

      {location.pathname === "/" && (
        <img className="header-banner" src={banniere} alt="bannière vinted" />
      )}
    </div>
  );
};

export default Header;
