import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Offer = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBuyClick = () => {
    if (token) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log("data reçue:", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="offer-container">
      <div className="offer-image-container">
        <img
          className="offer-image"
          src={data.product_image.secure_url}
          alt={data.product_name}
        />
      </div>
      <div className="offer-info-container">
        <p className="offer-price">{data.product_price.toFixed(2)} €</p>
        <div className="offer-details">
          {data.product_details.map((detail, index) => {
            const key = Object.keys(detail)[0];
            return (
              <div className="detail-line" key={index}>
                <span className="detail-key">{key}</span>
                <span className="detail-value">{detail[key]}</span>
              </div>
            );
          })}
        </div>

        <div className="offer-separator" />

        <p className="offer-product-name">{data.product_name}</p>
        <p className="offer-product-description">{data.product_description}</p>

        <div className="offer-owner">
          <img
            className="owner-avatar"
            src={data.owner.account.avatar.secure_url}
            alt={data.owner.account.username}
          />
          <span>{data.owner.account.username}</span>
        </div>

        <button className="buy-button" onClick={handleBuyClick}>
          Acheter
        </button>
      </div>
    </div>
  );
};

export default Offer;
