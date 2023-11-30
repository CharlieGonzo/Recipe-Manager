import React, { useState, useEffect } from "react";

const SearchLikedList = (props) => {
  const { recipeList, onFavorite } = props;

  // State for search query and list of items
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Effect to update filtered items when the recipe list or search query changes
  useEffect(() => {
    const filtered = recipeList.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [recipeList, searchQuery]);

  // Function to handle marking a recipe as a favorite
  const handleFavorite = (recipe) => {
    // Call the onFavorite function passed from the parent component
    // to handle marking a recipe as a favorite
    if (onFavorite) {
      onFavorite(recipe);
    }
  };

  return (
    <div className="contain">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* List View */}
      <ul className="container">
        {filteredItems.map((recipe) => (
          <li key={recipe.id}>
            <h5>
              {recipe.name}
              <h4>Ingredients: {recipe.ingredients}</h4>
              <h4>{recipe.overallCookingTime}</h4>
              <button onClick={() => handleFavorite(recipe)}>
                <i className="fa-solid fa-star"></i> Remove from Favorites
              </button>
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchLikedList;
