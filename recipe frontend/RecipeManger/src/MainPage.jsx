import SearchList from "./SearchList";
import SearchLikedList from "./SearchLikedList";
import { useState, useEffect } from "react";
import "./MainPage.css";
function MainPage(props) {
  const { user } = props;

  const [likedRecipes, setLikedRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const favorite = (item) => {
    const isLiked = likedRecipes.some((recipe) => recipe.id === item.id);

    if (isLiked) {
      // If already liked, dislike the recipe
      dislikeRecipe(item.id);

      // Remove the item from likedRecipes
      const updatedLikedRecipes = likedRecipes.filter(
        (recipe) => recipe.id !== item.id
      );
      setLikedRecipes(updatedLikedRecipes);

      // Add the item back to allRecipes
      setAllRecipes([...allRecipes, item]);
    } else {
      // If not liked, like the recipe and add it to likedRecipes
      likeRecipe(item.id);
      setLikedRecipes([...likedRecipes, item]);

      // Remove the liked item from allRecipes
      const updatedAllRecipes = allRecipes.filter(
        (recipe) => recipe.id !== item.id
      );
      setAllRecipes(updatedAllRecipes);
    }
  };

  // Assuming you have a function to get the user's ID, and the recipe ID is passed as a parameter

  const likeRecipe = async (recipeId) => {
    const backendUrl = "http://localhost:8080/api/v1";
    let id = 4;
    id = user.id;
    const username = user.username; // Replace with your actual username
    const password = user.password; // Replace with your actual password

    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // Base64 encode the credentials

    try {
      const response = await fetch(`${backendUrl}/likeRecipe/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log(result);
        // You may want to update the state or perform other actions based on the result
      } else {
        // Handle non-JSON response
        const result = await response.text();
        console.log(result);
        // You may want to handle non-JSON response differently
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
    }
  };

  const dislikeRecipe = async (recipeId) => {
    const backendUrl = "http://localhost:8080/api/v1";
    console.log(user.id);
    const username = user.username; // Replace with your actual username
    const password = user.password; // Replace with your actual password

    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials); // Base64 encode the credentials
    let id = 4;
    id = user.id;
    try {
      const response = await fetch(`${backendUrl}/dislikeRecipe/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log(result);
        // You may want to update the state or perform other actions based on the result
      } else {
        // Handle non-JSON response
        const result = await response.text();
        console.log(result);
        // You may want to handle non-JSON response differently
      }

      // You may want to update the state or perform other actions based on the result
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(user);
      try {
        const response = await fetch("http://localhost:8080/api/v1/getRecipes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipes = await response.json();
        const recipeLikedIds = user.list;

        // Separate liked and unliked recipes
        const likedRecipes = [];
        const unlikedRecipes = [];

        for (const item of recipes) {
          if (recipeLikedIds.includes(item.id)) {
            likedRecipes.push(item);
          } else {
            unlikedRecipes.push(item);
          }
        }

        setLikedRecipes(likedRecipes);
        setAllRecipes(unlikedRecipes);

        console.log("Liked Recipes:", likedRecipes);
        console.log("Unliked Recipes:", allRecipes);
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
          onFavorite={favorite}
        />
        <SearchList
          title="All Recipes"
          recipeList={allRecipes}
          onFavorite={favorite}
        />
      </div>
    </div>
  );
}

export default MainPage;
