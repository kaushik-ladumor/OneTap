import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Plus, Minus, Star, Clock } from "lucide-react";
import initialFoodItems from "../Data/data";
import "../../styles/FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const restaurant = initialFoodItems.find((item) => item.id === parseInt(id));

  // Filter and enhance menu items
  const filteredMenu = restaurant?.menu
    .filter(item => item.price > 0)
    .map(item => ({
      ...item,
      foodType: item.desc.toLowerCase().includes('chicken') || 
                item.desc.toLowerCase().includes('mutton') || 
                item.desc.toLowerCase().includes('fish') ? 
                'non-veg' : 'veg'
    }));

  const handleAddItem = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleDecreaseItem = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const handleIncreaseItem = (itemId) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  if (!restaurant) {
    return (
      <div className="not-found-container">
        <h3 className="not-found-title">Oops! Restaurant not found.</h3>
        <p className="not-found-text">
          Please check the URL or return to{" "}
          <Link to="/" className="not-found-link">
            Home
          </Link>
          .
        </p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="food-details-page">
      <header className="restaurant-hero">
  <img
    src={restaurant.img}
    alt={restaurant.title}
    className="hero-image"
  />
  <div className="hero-overlay">
    <h1 className="hero-title">{restaurant.title}</h1>
    <p className="hero-subtitle">{restaurant.cuisine}</p>
    <div className="restaurant-info">
      <div className="restaurant-rating">
        <Star size={16} />
        <span>{restaurant.rating}</span>
      </div>
      <div className="restaurant-delivery-time">
        <Clock size={16} />
        <span>{restaurant.time}</span>
      </div>
    </div>
  </div>
</header>

      <main className="food-details-content">
        <section className="menu-container">
          <h2 className="menu-title">Menu</h2>
          <div className="menu-items">
            {filteredMenu.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-info">
                  <div className="item-header">
                    {item.foodType === 'veg' ? (
                      <span className="food-type-icon veg">🟢</span>
                    ) : (
                      <span className="food-type-icon nonveg">🔴</span>
                    )}
                    <h3 className="item-name">{item.name}</h3>
                  </div>
                  <p className="item-desc">{item.desc}</p>
                  <span className="item-price">₹{item.price.toFixed(2)}</span>
                </div>
                <button 
                  className="add-btn" 
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-container">
          <div className="cart-inner">
            <h2 className="cart-title">Your Order</h2>
            {cart.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-subtotal">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleDecreaseItem(item.id)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleIncreaseItem(item.id)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="cart-total">
                  <span>Total</span>
                  <span className="total-price">₹{total.toFixed(2)}</span>
                </div>
                <Link
                  to={`/payment-receipt/${id}`}
                  state={{ items: cart, restaurant: restaurant.title }}
                  className="place-order-btn"
                >
                  Place Order
                </Link>
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default FoodDetails;