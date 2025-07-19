import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsLetter);
      if (avatar) {
        formData.append("avatar", avatar);
      }
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate(from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Photo de profil</label>
        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        <input
          type="checkbox"
          checked={newsLetter}
          onChange={() => setNewsLetter(!newsLetter)}
        />
        <span className="newsletter">
          <p>S'inscrire à notre newslettre</p>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politiques de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </span>
        <input type="submit" value="S'inscrire" />
        <p className="login-footer">
          {" "}
          Pas encrore de compte ? <a href="/login">Connecte-toi !</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
