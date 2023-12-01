import { useState } from "react";
import MainPage from "./MainPage";

function RecipePage(props) {
  const { recipe, user } = props;
  console.log(recipe);
  const [back, setBack] = useState(false);
  function goBack() {
    setBack(true);
  }
  if (!back) {
    return (
      <div className="recipePage">
        <h1>{recipe.name}</h1>
        <p>{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
        <p>{recipe.overallCookingTime}</p>
        <button onClick={goBack}>Go back</button>
      </div>
    );
  } else {
    return <MainPage user={user} />;
  }
}

export default RecipePage;
