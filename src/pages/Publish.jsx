import { useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" state={{ from: "/publish" }} />;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [pictures, setPictures] = useState([]);
  const [exchangeInterest, setExchangeInterest] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setPictures((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

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
      for (let i = 0; i < pictures.length; i++) {
        formData.append("picture", pictures[i]);
      }
      formData.append("exchangeInterest", exchangeInterest);

      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Annonce publiée !");
      navigate("/");
    } catch (error) {
      alert("Erreur lors de la publication");
    }
  };

  return (
    <div className="publish-background">
      <div className="publish-wrapper">
        <p className="intro-text">Vends ton article</p>

        <form className="publish-form" onSubmit={handleSubmit}>
          <div className="publish-block-photos">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>
                <button type="button">+ Ajoute une photo</button>
              </p>
            </div>
            {pictures.length > 0 && (
              <ul className="selected-images">
                {pictures.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="publish-block-title-desc">
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="input-title"
            />
            <textarea
              placeholder="Décris ton article"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="textarea-desc"
            />
          </div>

          <div className="publish-block-details">
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
              type="text"
              placeholder="État"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            />
            <input
              type="text"
              placeholder="Lieu"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>

          <div className="publish-block-price">
            <input
              type="number"
              placeholder="Prix"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="input-price"
            />
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={exchangeInterest}
                onChange={(event) => setExchangeInterest(event.target.checked)}
              />
              Je suis intéressé(e) par les échanges
            </label>
          </div>

          <button type="submit" className="btn-submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
