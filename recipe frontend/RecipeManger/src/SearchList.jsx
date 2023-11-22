import React, { useState, useEffect } from "react";
import "./list.css";
const SearchList = (props) => {
  class Recipe {
    constructor(
      id,
      nationality,
      name,
      instructions,
      ingredients,
      overallCookingTime,
      search
    ) {
      this.id = id;
      this.nationality = nationality;
      this.name = name;
      this.instructions = instructions;
      this.ingredients = ingredients;
      this.overallCookingTime = overallCookingTime;
      this.search = search;
    }
  }
  // State for search query and list of items
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    // Fetch the list of recipes when the component mounts
    fetchRecipeList();
  }, []);

  // Function to fetch the list of recipes from the backend
  const fetchRecipeList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/getRecipes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipes = await response.json();
      setRecipeList(recipes);
    } catch (error) {
      console.error("Error fetching recipe list:", error);
      // Handle the error as needed
    }
  };

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter items based on the search query
  const filteredItems = recipeList.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h3>
              {recipe.name}
              <h4>Ingredients: {recipe.ingredients}</h4>
              <h4>{recipe.overallCookingTime}</h4>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
