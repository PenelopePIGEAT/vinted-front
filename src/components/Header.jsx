import logo from "../img/logo.svg";
import banniere from "../img/banniere.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <Link to="/signup">
        <button>S'inscrire</button>
      </Link>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>
      <button>Vends tes articles</button>
      <button>Déconnexion</button>
      <img className="header-banner" src={banniere} alt="bannière vinted" />
    </div>
  );
};

export default Header;
