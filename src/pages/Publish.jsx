import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Annonce publiée !");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erreur lors de la publication");
    }
  };

  return (
    <div className="publish-container">
      <h1>Déposer une annonce</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input
          type="text"
          placeholder="État"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        />
        <input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input
          type="text"
          placeholder="Marque"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <input
          type="text"
          placeholder="Taille"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
        <input
          type="text"
          placeholder="Couleur"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <input
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default Publish;
