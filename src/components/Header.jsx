import banniere from "../img/banniere.jpg";

const Header = () => {
  return (
    <div className="header">
      <p>Logo</p>
      <button>s'inscrire</button>
      <button>Se connecter</button>
      <button>vends tes articles</button>
      <button>déconnexion</button>
      <img className="header-banner" src={banniere} alt="bannière vinted" />
    </div>
  );
};

export default Header;
