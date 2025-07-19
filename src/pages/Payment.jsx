import { Navigate } from "react-router-dom";

const Payment = ({ token }) => {
  if (!token) {
    return <Navigate to="/login" state={{ from: "/payment" }} />;
  }

  return (
    <div>
      <h2>Page Payment</h2>
    </div>
  );
};

export default Payment;
