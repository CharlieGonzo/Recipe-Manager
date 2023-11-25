import React, { useState, useEffect } from "react";
import "./list.css";

const SearchList = (props) => {
  const { recipeList } = props;

  // State for search query and list of items
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Effect to update filtered items when the recipe list or search query changes
  useEffect(() => {
    // Filter items based on the search query
    const filteredItems = recipeList.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }, [recipeList, searchQuery]);

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
      <ul className="conatiner">
        {filteredItems.map((recipe) => (
          <li key={recipe.id}>
            <h5>
              {recipe.name}
              <h4>Ingredients: {recipe.ingredients}</h4>
              <h4>{recipe.overallCookingTime}</h4>
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
