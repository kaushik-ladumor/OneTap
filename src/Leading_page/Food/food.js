import React, { useState } from "react";
import { Star, Clock, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import initialFoodItems from "../Data/data";
import "../../styles/Food.css";

const Food = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleRestaurants, setVisibleRestaurants] = useState(6); // Show 6 initially

  const filteredFoodItems = initialFoodItems.filter(food => {
    const searchTerm = searchQuery.toLowerCase();
    
    if (food.cuisine?.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    const titleMatch = food.title?.toLowerCase().includes(searchTerm);
    const tagMatch = food.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
    const menuItemMatch = food.menu?.some(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.category?.toLowerCase().includes(searchTerm)
    );
    
    return titleMatch || tagMatch || menuItemMatch;
  });

  const loadMoreRestaurants = () => {
    setVisibleRestaurants(prev => prev + 6); // Load 6 more each time
  };

  const showAllRestaurants = () => {
    setVisibleRestaurants(filteredFoodItems.length); // Show all
  };

  const resetSearch = () => {
    setSearchQuery("");
    setVisibleRestaurants(6); // Reset to initial state
  };

  return (
    <div className="food-page">
      <header className="food-header">
        <h1>Discover Restaurants</h1>
        <p>Find your favorite cuisines and dining experiences</p>
      </header>

      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search restaurants, cuisines or menu items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleRestaurants(6); // Reset visible count on search
            }}
            className="search-input"
          />
        </div>
      </div>

      {filteredFoodItems.length > 0 ? (
        <>
          <div className="restaurant-grid">
            {filteredFoodItems.slice(0, visibleRestaurants).map(restaurant => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="card-image">
                  <img 
                    src={restaurant.img} 
                    alt={restaurant.title} 
                    loading="lazy"
                  />
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <h3>{restaurant.title}</h3>
                    <div className="rating">
                      <Star size={16} fill="#FFD700" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>

                  <p className="cuisine">{restaurant.cuisine}</p>

                  <div className="meta-info">
                    <div>
                      <Clock size={16} />
                      <span>{restaurant.time}</span>
                    </div>
                    <div>
                      <MapPin size={16} />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  {restaurant.tags?.length > 0 && (
                    <div className="tags">
                      {restaurant.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <Link 
                    to={`/food/${restaurant.id}`} 
                    className="view-button"
                    state={{ restaurant }}
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {visibleRestaurants < filteredFoodItems.length && (
            <div className="load-more-container">
              <button 
                className="load-more-button"
                onClick={loadMoreRestaurants}
              >
                Load More Restaurants
              </button>
              <button 
                className="view-all-button"
                onClick={showAllRestaurants}
              >
                View All Restaurants
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <p>No restaurants found matching your search.</p>
          <button 
            className="reset-button"
            onClick={resetSearch}
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Food;