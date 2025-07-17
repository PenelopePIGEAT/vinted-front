import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer${id}`
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
    <div>
      <h2>{data.product_name}</h2>
      {data.product_details.map((detail, index) => {
        const keyName = Object.keys(detail);
        return (
          <div key={index}>
            <p>{keyName[0]}</p>
            <p>{detail[keyName[0]]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
