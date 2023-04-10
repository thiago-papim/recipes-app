import React, { useEffect, useState } from 'react';

import { apiSearch } from '../services/API_SEARCH';
import FavoriteButton from '../components/FavoriteButton';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const [checkboxes, setCheckboxes] = useState({});
  const [copied, setCopied] = useState(true);
  // const [iconFavorite, setIconFavorite] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [idRecipe, setIdRecipe] = useState('');
  // const [btnFinish, setBtnFinish] = useState(true);

  const allStorage = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    } else {
      setCheckboxes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const name = url.includes('meals');
    const id = url.match(/\/(\d+)\/in-progress/)[1];
    setIdRecipe(id);
    const fetchApi = async () => {
      if (name) {
        const response = await apiSearch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(response.meals[0]);
      } else {
        const response = await apiSearch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        setRecipe(response.drinks[0]);
      }
    };
    fetchApi();
    allStorage();
  }, []);

  const data = Object.entries(recipe);

  const ingredients = [];
  data.forEach((array) => {
    if (array[0].includes('strIngredient') && array[1]) {
      return ingredients.push(array[1]);
    }
  });

  const measures = [];
  data.forEach((array) => {
    if (array[0].includes('strMeasure') && array[1]?.length > 2) {
      return measures.push(array[1]);
    }
  });

  const handleClick = (index) => {
    const key = index + 1;
    const state = {};
    Object.keys(checkboxes).forEach((value) => { state[value] = checkboxes[value]; });
    if (state[key]) {
      const newKey = {};
      newKey[key] = false;
      const result = Object.assign(state, newKey);
      setCheckboxes(result);
      localStorage.setItem('inProgressRecipes', JSON.stringify(result));
    } else {
      const newKey = {};
      newKey[key] = true;
      const result = Object.assign(state, newKey);
      setCheckboxes(result);
      localStorage.setItem('inProgressRecipes', JSON.stringify(result));
    }
    allStorage();
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <button
        data-testid="share-btn"
        onClick={ () => {
          const magicNumber = -12;
          copy(window.location.href.slice(0, magicNumber));
          setCopied(false);
        } }
      >
        Compartilhar
      </button>
      { idRecipe ? <FavoriteButton idRecipe={ idRecipe } recipe={ recipe } /> : ''}
      { copied || <p>Link copied!</p> }
      <p data-testid="recipe-category">{recipe.strCategory}</p>

      {ingredients.length > 0 && ingredients.map((string, index) => (
        <div
          key={ string }
        >
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor="step"
            style={ checkboxes[index + 1]
              ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
              : { textDecoration: 'none' } }
          >
            <input
              label="step"
              type="checkbox"
              // defaultChecked={ checkboxes[index + 1] }
              checked={ checkboxes[index + 1] }
              onChange={ () => handleClick(index) }
            />
            {`${string} ${measures[index] || ''}`}
          </label>
          <br />
        </div>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        // disabled={ btnFinish }
      >
        Finalizar Receita
      </button>
    </>
  );
}

export default RecipeInProgress;
