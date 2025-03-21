import React from "react";
import { useParams } from "react-router-dom";

const PaymentReceipt = () => {
  const { id } = useParams();

  const foodItems = [
    {
      id: 1,
      title: "Pizza Hub",
      cuisine: "Italian",
      price: 12.99,
    },
    // Add more food items here...
  ];

  const food = foodItems.find((item) => item.id === parseInt(id));

  if (!food) {
    return <div>Food not found!</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Receipt</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">{food.title}</h5>
          <p className="text-muted">{food.cuisine}</p>
          <p>Price: ${food.price.toFixed(2)}</p>
          <p>Thank you for your order!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;