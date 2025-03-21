import React, { useState } from "react";
import { Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Food = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");

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
    },
    { id: 3, title: "Pav Bhaji", cuisine: "Indian Street Food", rating: "4.6", time: "15-25 min", distance: "1.5 miles", tags: ["Pav Bhaji", "Vada Pav", "Dabeli"], img: "https://img.freepik.com/premium-photo/cheese-pav-bhaji-recipe-is-street-food-bhajipav-recipe-with-addition-cheese_466689-86301.jpg" },
    { id: 4, title: "Punjabi Thali", cuisine: "North Indian", rating: "4.8", time: "30-40 min", distance: "2.5 miles", tags: ["Chole Bhature", "Paneer Tikka", "Lassi"], img: "https://img.freepik.com/free-photo/delicious-food-table_23-2150857812.jpg" },
    { id: 5, title: "Rajasthani Thali", cuisine: "Rajasthani", rating: "4.7", time: "35-45 min", distance: "3.0 miles", tags: ["Dal Baati", "Gatte ki Sabzi", "Churma"], img: "https://img.freepik.com/premium-photo/indian-hindu-veg-thali_466689-9096.jpg" },
    { id: 6, title: "Gujarati Thali", cuisine: "Gujarati", rating: "4.6", time: "20-30 min", distance: "1.8 miles", tags: ["Dhokla", "Kadhi", "Thepla"], img: "https://t4.ftcdn.net/jpg/06/21/24/03/240_F_621240378_7cKWVxCYnJ2egygunsBf1uCvQmzwvEZH.jpg" },
    { id: 7, title: "South Indian Delights", cuisine: "South Indian", rating: "4.9", time: "25-35 min", distance: "1.2 miles", tags: ["Dosa", "Idli", "Vada"], img: "https://t4.ftcdn.net/jpg/11/51/29/27/240_F_1151292737_8jO19mo8DB503tFfIOyzsGmGR4004EXO.jpg" },
    { id: 8, title: "Mughlai Feast", cuisine: "Mughlai", rating: "4.7", time: "40-50 min", distance: "2.8 miles", tags: ["Biryani", "Kebabs", "Butter Chicken"], img: "https://img.freepik.com/premium-photo/high-angle-view-food-served-table_1048944-20856694.jpg" },
    { id: 9, title: "Tandoori Nights", cuisine: "Tandoori", rating: "4.5", time: "30-40 min", distance: "3.2 miles", tags: ["Tandoori Chicken", "Paneer Tikka", "Naan"], img: "https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18807.jpg" },
    { id: 10, title: "Taco Fiesta", cuisine: "Mexican", rating: "4.4", time: "15-25 min", distance: "1.8 miles", tags: ["Tacos", "Burritos", "Nachos"], img: "https://t3.ftcdn.net/jpg/09/56/42/22/240_F_956422254_1tIL5fM3rEJ1zbuU1Wan8zOiB5aRGPgb.jpg" },
    { id: 11, title: "Wok Express", cuisine: "Chinese", rating: "4.6", time: "20-30 min", distance: "3.0 miles", tags: ["Noodles", "Dumplings", "Fried Rice"], img: "https://img.freepik.com/free-photo/stir-fry-chicken-zucchini-sweet-peppers-green-onion_2829-10785.jpg" },
    { id: 12, title: "Sushi World", cuisine: "Japanese", rating: "4.7", time: "30-40 min", distance: "1.5 miles", tags: ["Sushi", "Ramen", "Tempura"], img: "https://img.freepik.com/premium-photo/high-angle-view-sushi-served-table_1048944-25961798.jpg" },
  ];
  const filteredFoodItems = foodItems.filter((food) => {
    const matchesSearch = food.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = cuisineFilter ? food.cuisine === cuisineFilter : true;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">🍽️ Explore Delicious Food</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Cuisine Filter */}
      <div className="mb-4">
        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="form-select"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          <option value="Indian Street Food">Indian Street Food</option>
          <option value="North Indian">North Indian</option>
          <option value="Rajasthani">Rajasthani</option>
          <option value="Gujarati">Gujarati</option>
          <option value="South Indian">South Indian</option>
          <option value="Mughlai">Mughlai</option>
          <option value="Tandoori">Tandoori</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>

      {/* Food Items Grid */}
      <div className="row">
        {filteredFoodItems.map((food) => (
          <div key={food.id} className="col-md-4 mb-4">
            <div className="card food-card shadow-lg">
              <img src={food.img} className="card-img-top food-img" alt={food.title} />
              <div className="card-body">
                <h5 className="card-title">{food.title}</h5>
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
                    <span key={i} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                </div>

                <Link to={`/food/${food.id}`} className="btn btn-primary mt-3 w-100 fw-bold rounded-3">
                  Order Now 🍽️
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;