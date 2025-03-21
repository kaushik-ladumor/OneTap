import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, MapPin, Check } from "lucide-react";

const FoodDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const foodItems = [
    {
      id: 1,
      title: "Pizza Hub",
      cuisine: "Italian",
      rating: "4.8",
      time: "25-35 min",
      distance: "1.2 miles",
      tags: ["Pizza", "Pasta", "Salads"],
      img: "https://img.freepik.com/premium-photo/pizza-abduction_198067-1028904.jpg",
      description: "Delicious Italian pizzas made with fresh ingredients.",
      ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Basil"],
      reviews: ["Great pizza!", "Loved the crust!"],
      price: 12.99,
      relatedItems: [
        { name: "Margherita Pizza", price: 10.99, img: "https://img.freepik.com/premium-photo/margherita-pizza_1339-8382.jpg" },
        { name: "Cheesecorn Pizza", price: 12.99, img: "https://img.freepik.com/premium-photo/cheese-corn-pizza_1339-8383.jpg" },
        { name: "Pepperoni Pizza", price: 14.99, img: "https://img.freepik.com/premium-photo/pepperoni-pizza_1339-8384.jpg" },
      ],
    },
    {
        id: 2,
        title: "Burger Point",
        cuisine: "American",
        rating: "4.7",
        time: "20-30 min",
        distance: "2.0 miles",
        tags: ["Burgers", "Fries", "Shakes"],
        img: "https://img.freepik.com/premium-photo/delicious-fresh-homemade-burger-wooden-table_73989-12424.jpg",
        description:
          "Juicy burgers with a variety of toppings, served with crispy fries and refreshing shakes.",
        ingredients: [
          "Beef Patty",
          "Lettuce",
          "Tomato",
          "Cheese",
          "Pickles",
          "Burger Buns",
        ],
        reviews: [
          "Best burgers in town!",
          "Amazing fries!",
          "The shakes are to die for!",
        ],
        price: 9.99,
        relatedItems: [
          "Cheeseburger",
          "Chicken Burger",
          "Veggie Burger",
          "Onion Rings",
          "Milkshakes",
        ],
      },
      {
        id: 3,
        title: "Pav Bhaji",
        cuisine: "Indian Street Food",
        rating: "4.6",
        time: "15-25 min",
        distance: "1.5 miles",
        tags: ["Pav Bhaji", "Vada Pav", "Dabeli"],
        img: "https://img.freepik.com/premium-photo/cheese-pav-bhaji-recipe-is-street-food-bhajipav-recipe-with-addition-cheese_466689-86301.jpg",
        description:
          "A spicy and buttery mashed vegetable curry served with soft bread rolls.",
        ingredients: ["Potatoes", "Tomatoes", "Peas", "Butter"],
        reviews: ["Authentic taste!", "Loved the butter!"],
        price: 7.99,
        relatedItems: ["Vada Pav", "Dabeli", "Misal Pav"],
      },
      { 
        id: 4,
        title: "Punjabi Thali",
        cuisine: "North Indian",
        rating: "4.8",
        time: "30-40 min",
        distance: "2.5 miles",
        tags: ["Chole Bhature", "Paneer Tikka", "Lassi"],
        img: "https://img.freepik.com/free-photo/delicious-food-table_23-2150857812.jpg",
        description: "A hearty meal with a variety of Punjabi dishes.",
        ingredients: ["Chole", "Bhature", "Paneer", "Lassi"],
        reviews: ["Amazing thali!", "Great variety!"],
        price: 14.99,
        relatedItems: ["Chole Bhature", "Paneer Tikka", "Butter Chicken"],
      },
      {
        id: 5,
        title: "Rajasthani Thali",
        cuisine: "Rajasthani",
        rating: "4.7",
        time: "35-45 min",
        distance: "3.0 miles",
        tags: ["Dal Baati", "Gatte ki Sabzi", "Churma"],
        img: "https://img.freepik.com/premium-photo/indian-hindu-veg-thali_466689-9096.jpg",
        description: "A traditional Rajasthani meal with rich flavors.",
        ingredients: ["Dal", "Baati", "Gatte", "Churma"],
        reviews: ["Authentic Rajasthani taste!", "Loved the dal baati!"],
        price: 13.99,
        relatedItems: ["Dal Baati", "Gatte ki Sabzi", "Laal Maas"],
      },
      {
        id: 6,
        title: "Gujarati Thali",
        cuisine: "Gujarati",
        rating: "4.6",
        time: "20-30 min",
        distance: "1.8 miles",
        tags: ["Dhokla", "Kadhi", "Thepla"],
        img: "https://t4.ftcdn.net/jpg/06/21/24/03/240_F_621240378_7cKWVxCYnJ2egygunsBf1uCvQmzwvEZH.jpg",
        description: "A wholesome Gujarati meal with sweet and savory dishes.",
        ingredients: ["Dhokla", "Kadhi", "Thepla", "Shrikhand"],
        reviews: ["Sweet and savory balance!", "Loved the dhokla!"],
        price: 11.99,
        relatedItems: ["Dhokla", "Khandvi", "Undhiyu"],
      },
      {
        id: 7,
        title: "South Indian Delights",
        cuisine: "South Indian",
        rating: "4.9",
        time: "25-35 min",
        distance: "1.2 miles",
        tags: ["Dosa", "Idli", "Vada"],
        img: "https://t4.ftcdn.net/jpg/11/51/29/27/240_F_1151292737_8jO19mo8DB503tFfIOyzsGmGR4004EXO.jpg",
        description:
          "Authentic South Indian dishes served with chutney and sambar.",
        ingredients: ["Rice", "Lentils", "Coconut", "Curry Leaves"],
        reviews: ["Crispy dosas!", "Perfect idlis!"],
        price: 10.99,
        relatedItems: ["Masala Dosa", "Rava Idli", "Medu Vada"],
      },
      {
        id: 8,
        title: "Mughlai Feast",
        cuisine: "Mughlai",
        rating: "4.7",
        time: "40-50 min",
        distance: "2.8 miles",
        tags: ["Biryani", "Kebabs", "Butter Chicken"],
        img: "https://img.freepik.com/premium-photo/high-angle-view-food-served-table_1048944-20856694.jpg",
        description: "Rich and flavorful Mughlai dishes fit for royalty.",
        ingredients: ["Basmati Rice", "Chicken", "Spices", "Cream"],
        reviews: ["Best biryani ever!", "Kebabs were amazing!"],
        price: 16.99,
        relatedItems: ["Chicken Biryani", "Mutton Kebabs", "Butter Naan"],
      },
      {
        id: 9,
        title: "Tandoori Nights",
        cuisine: "Tandoori",
        rating: "4.5",
        time: "30-40 min",
        distance: "3.2 miles",
        tags: ["Tandoori Chicken", "Paneer Tikka", "Naan"],
        img: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18807.jpg",
        description: "Smoky and flavorful tandoori dishes cooked in a clay oven.",
        ingredients: ["Chicken", "Paneer", "Yogurt", "Spices"],
        reviews: ["Perfectly grilled!", "Loved the smoky flavor!"],
        price: 15.99,
        relatedItems: ["Tandoori Chicken", "Paneer Tikka", "Garlic Naan"],
      },
      {
        id: 10,
        title: "Taco Fiesta",
        cuisine: "Mexican",
        rating: "4.4",
        time: "15-25 min",
        distance: "1.8 miles",
        tags: ["Tacos", "Burritos", "Nachos"],
        img: "https://t3.ftcdn.net/jpg/09/56/42/22/240_F_956422254_1tIL5fM3rEJ1zbuU1Wan8zOiB5aRGPgb.jpg",
        description:
          "A fiesta of Mexican flavors with tacos, burritos, and nachos.",
        ingredients: ["Tortilla", "Beef", "Cheese", "Salsa"],
        reviews: ["Best tacos in town!", "Loved the guacamole!"],
        price: 8.99,
        relatedItems: ["Beef Tacos", "Chicken Burritos", "Cheese Nachos"],
      },
      {
        id: 11,
        title: "Wok Express",
        cuisine: "Chinese",
        rating: "4.6",
        time: "20-30 min",
        distance: "3.0 miles",
        tags: ["Noodles", "Dumplings", "Fried Rice"],
        img: "https://img.freepik.com/free-photo/stir-fry-chicken-zucchini-sweet-peppers-green-onion_2829-10785.jpg",
        description: "Quick and delicious Chinese stir-fry dishes.",
        ingredients: ["Noodles", "Chicken", "Vegetables", "Soy Sauce"],
        reviews: ["Perfectly cooked noodles!", "Dumplings were amazing!"],
        price: 11.99,
        relatedItems: ["Chow Mein", "Spring Rolls", "Fried Rice"],
      },
      {
        id: 12,
        title: "Sushi World",
        cuisine: "Japanese",
        rating: "4.7",
        time: "30-40 min",
        distance: "1.5 miles",
        tags: ["Sushi", "Ramen", "Tempura"],
        img: "https://img.freepik.com/premium-photo/high-angle-view-sushi-served-table_1048944-25961798.jpg",
        description: "Fresh and authentic Japanese sushi and ramen.",
        ingredients: ["Rice", "Fish", "Seaweed", "Soy Sauce"],
        reviews: ["Fresh sushi!", "Ramen was delicious!"],
        price: 18.99,
        relatedItems: ["Sashimi", "Miso Ramen", "Tempura Prawns"],
      },
  ];

  const food = foodItems.find((item) => item.id === parseInt(id));

  if (!food) {
    return <div>Food not found!</div>;
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview("");
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      window.location.href = `/payment-receipt/${food.id}`;
    }, 2000);
  };

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={food.img}
            className="img-fluid rounded shadow-lg"
            alt={food.title}
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{food.title}</h1>
          <p className="text-muted">{food.cuisine}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Star size={16} className="text-warning me-1" />
              <span>{food.rating}</span>
            </div>
            <div className="d-flex align-items-center">
              <Clock size={16} className="text-dark me-1" />
              <span>{food.time}</span>
            </div>
            <div className="d-flex align-items-center">
              <MapPin size={16} className="text-dark me-1" />
              <span>{food.distance}</span>
            </div>
          </div>

          <div className="mt-3">
            {food.tags.map((tag, i) => (
              <span key={i} className="badge bg-secondary me-1">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-4 fw-bold">Description</h3>
          <p>{food.description}</p>

          <h3 className="fw-bold">Ingredients</h3>
          <ul>
            {food.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>

          <h3 className="fw-bold">Price</h3>
          <p>${food.price.toFixed(2)}</p>

          <h3 className="fw-bold">Choose Your Items</h3>
          <div className="row">
            {food.relatedItems.map((item, i) => (
              <div key={i} className="col-md-6 mb-3">
                <div
                  className={`card p-3 shadow-sm ${
                    selectedItems.includes(item) ? "border-primary" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleItemSelection(item)}
                >
                  <img
                    src={item.img}
                    className="card-img-top rounded"
                    alt={item.name}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body p-0 mt-2">
                    <h5 className="card-title mb-1">{item.name}</h5>
                    <p className="text-muted mb-1">${item.price.toFixed(2)}</p>
                    {selectedItems.includes(item) && (
                      <Check size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="fw-bold">Reviews</h3>
          <ul>
            {food.reviews.map((review, i) => (
              <li key={i}>{review}</li>
            ))}
            {reviews.map((review, i) => (
              <li key={i + food.reviews.length}>{review}</li>
            ))}
          </ul>

          <form onSubmit={handleReviewSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Add a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Submit Review
            </button>
          </form>

          <button
            className="btn btn-primary w-100 mt-3 fw-bold"
            onClick={handlePlaceOrder}
            disabled={orderPlaced}
          >
            {orderPlaced ? "Order Placed!" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;