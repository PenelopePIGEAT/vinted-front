import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  const getDetail = (detailsArray, key) => {
    if (!Array.isArray(detailsArray)) return "Non renseigné";
    const detail = detailsArray.find((item) => item[key]);
    return detail ? detail[key] : "Non renseigné";
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="home-container">
        {data.offers &&
          data.offers.map((offer) => {
            console.log(offer._id);
            return (
              <Link
                to={`/offer/${offer._id}`}
                className="offer-card"
                key={offer._id}
              >
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
              </Link>
            );
          })}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {" "}
          ⬅ Précédent
        </button>
        <span>Page {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              data.count
                ? Math.min(prev + 1, Math.ceil(data.count / limit))
                : prev
            )
          }
          disabled={data.count && page >= Math.ceil(data.count / limit)}
        >
          {" "}
          Suivant ➡
        </button>
      </div>
    </>
  );
};

export default Home;
