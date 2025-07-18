import logo from "../img/logo.svg";
import banniere from "../img/banniere.jpg";
import { Link, useLocation } from "react-router-dom";

const Header = ({ handleToken, userToken }) => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
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

      {!isSignUpPage && !isLoginPage && (
        <img className="header-banner" src={banniere} alt="bannière vinted" />
      )}
    </div>
  );
};

export default Header;
