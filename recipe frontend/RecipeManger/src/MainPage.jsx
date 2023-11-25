import SearchList from "./SearchList";
import SearchLikedList from "./SearchLikedList";
import { useState, useEffect } from "react";
import "./MainPage.css";
function MainPage(props) {
  const { user } = props;
  const likedRecipes = []; // Ensure likedRecipes is an array
  likedRecipes.push(user.list);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeArray, setRecipeArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/getRecipes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipes = await response.json();
        const liked = recipes.filter((recipe) =>
          likedRecipes.includes(recipe.id)
        );
        const notLiked = recipes.filter(
          (recipe) => !likedRecipes.includes(recipe.id)
        );
        setRecipeList(liked);
        setRecipeArray(notLiked);
      } catch (error) {
        console.error("Error fetching recipe list:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [likedRecipes]);
  const getRecipeById = async (id) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/Recipe/" + id);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const recipe = await response.json();

      return recipe;
    } catch (error) {
      console.error("Error fetching recipe list:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="main">
      <header>
        <h1>
          welcome {user.username} and {likedRecipes}
        </h1>
      </header>
      <div className="listContainer">
        <SearchList recipeList={recipeList} />
        <SearchList recipeList={recipeArray} />
      </div>
    </div>
  );
}

export default MainPage;
