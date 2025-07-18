import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: userName,
          email: email,
          password: password,
          newsletter: newsLetter,
        }
      );
      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
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
