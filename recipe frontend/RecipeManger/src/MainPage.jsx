import SearchList from "./SearchList";
import SearchLikedList from "./SearchLikedList";
import { useState, useEffect } from "react";
import "./MainPage.css";
function MainPage(props) {
  const { user } = props;

  const [likedRecipes, setLikedRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const favorite = (item) => {
    likeRecipe(item.id);
    // If the item is not in likedRecipes, add it
    if (!likedRecipes.includes(item)) {
      setLikedRecipes([...likedRecipes, item]);
    }
  };

  // Assuming you have a function to get the user's ID, and the recipe ID is passed as a parameter

  const likeRecipe = async (recipeId) => {
    const backendUrl = "http://localhost:8080/api/v1";

    try {
      const response = await fetch(
        `${backendUrl}/likeRecipe/${user.id}/${recipeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // You may want to update the state or perform other actions based on the result
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
    }
  };

  const dislikeRecipe = async (recipeId) => {
    const backendUrl = "http://localhost:8080/api/v1";

    try {
      const response = await fetch(
        `${backendUrl}/dislikeRecipe/${user.id}/${recipeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // You may want to update the state or perform other actions based on the result
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
    }
  };

  const removeLike = (item) => {
    // Remove the item from likedRecipes
    dislikeRecipe(item.id);
    const updatedLikedRecipes = likedRecipes.filter(
      (recipe) => recipe.id !== item.id
    );
    setLikedRecipes(updatedLikedRecipes);
    user.list = likedRecipes;
  };

  const removeLikeFromNonLiked = (item) => {
    // Remove the item from allRecipes (non-liked list)
    const updatedAllRecipes = allRecipes.filter(
      (recipe) => recipe.id !== item.id
    );
    setAllRecipes(updatedAllRecipes);

    // Add the item to likedRecipes
    setLikedRecipes([...likedRecipes, item]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/getRecipes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipes = await response.json();
        setAllRecipes(recipes);
        const Liked = recipes.filter((recipe) =>
          likedRecipes.includes(recipe.id)
        );
        setLikedRecipes(liked);
      } catch (error) {
        console.error("Error fetching recipe list:", error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main">
      <header>
        <h1>Welcome {user.username}!</h1>
      </header>
      <div className="listContainer">
        <SearchLikedList
          title="Liked Recipes"
          recipeList={likedRecipes}
          onFavorite={removeLike}
        />
        <SearchList
          title="All Recipes"
          recipeList={allRecipes}
          onFavorite={favorite}
          remove={removeLikeFromNonLiked}
        />
      </div>
    </div>
  );
}

export default MainPage;
