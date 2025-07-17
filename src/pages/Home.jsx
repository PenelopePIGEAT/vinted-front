import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData appelé");
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getDetail = (detailsArray, key) => {
    if (!Array.isArray(detailsArray)) return "Non renseigné";
    const detail = detailsArray.find((item) => item[key]);
    return detail ? detail[key] : "Non renseigné";
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="home-container">
      {data.offers &&
        data.offers.map((offer) => (
          <div className="offer-card" key={offer._id}>
            <div className="user-informations">
              {offer.owner?.account?.avatar?.secure_url && (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt="Avatar de l'utilisateur"
                  className="avatar"
                />
              )}
              <p className="username">{offer.owner?.account?.username}</p>
            </div>

            {offer.product_pictures?.[0]?.secure_url && (
              <img
                src={offer.product_pictures[0].secure_url}
                alt="Produit"
                className="product-image"
              />
            )}
            <p className="price"> {offer.product_price} €</p>
            <p className="detail">
              {getDetail(offer.product_details, "TAILLE")}
            </p>
            <p className="detail">
              {getDetail(offer.product_details, "MARQUE")}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Home;
