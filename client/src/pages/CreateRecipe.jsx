import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";

export default function CreateRecipe() {
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;

    setRecipe({ ...recipe, [name]: value });
  }

  function onIngredientChange(e, idx) {
    const { value } = e.target;

    //create a copy of the ingredients
    const ingredients = recipe.ingredients;
    //change the ingredient that triggered this event
    ingredients[idx] = value;

    //assign the recipe ingredients with the new ingredients
    setRecipe({ ...recipe, ingredients });
  }

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/recipes/", recipe);
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={onChange} />

        <label htmlFor="name">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => onIngredientChange(e, idx)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add ingredient
        </button>

        <label htmlFor="name">Instructions</label>
        <textarea
          type="text"
          id="name"
          name="instructions"
          onChange={onChange}
        />

        <label htmlFor="name">Cooking Time (Mins)</label>
        <input type="number" id="name" name="cookingTime" onChange={onChange} />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
