import React, { useEffect, useState } from 'react';

function RecipeInProgress() {
  const [checkboxes, setCheckboxes] = useState({});
  const recipe = {
    idMeal: '52977',
    strMeal: 'Corba',
    strDrinkAlternate: null,
    strCategory: 'Side',
    strArea: 'Turkish',
    strInstructions: 'Pick through your lentils for any foreign debris...',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strTags: 'Soup',
    strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
    strIngredient1: 'Lentils',
    strIngredient2: 'Onion',
    strIngredient3: 'Carrots',
    strIngredient4: 'Tomato Puree',
    strIngredient5: 'Cumin',
    strIngredient6: 'Paprika',
    strIngredient7: 'Mint',
    strIngredient8: 'Thyme',
    strIngredient9: 'Black Pepper',
    strIngredient10: 'Red Pepper Flakes',
    strIngredient11: 'Vegetable Stock',
    strIngredient12: 'Water',
    strIngredient13: 'Sea Salt',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 cup ',
    strMeasure2: '1 large',
    strMeasure3: '1 large',
    strMeasure4: '1 tbs',
    strMeasure5: '2 tsp',
    strMeasure6: '1 tsp ',
    strMeasure7: '1/2 tsp',
    strMeasure8: '1/2 tsp',
    strMeasure9: '1/4 tsp',
    strMeasure10: '1/4 tsp',
    strMeasure11: '4 cups ',
    strMeasure12: '1 cup ',
    strMeasure13: 'Pinch',
    strMeasure14: ' ',
    strMeasure15: ' ',
    strMeasure16: ' ',
    strMeasure17: ' ',
    strMeasure18: ' ',
    strMeasure19: ' ',
    strMeasure20: ' ',
    strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  };

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    } else {
      setCheckboxes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
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
    if (array[0].includes('strMeasure') && array[1].length > 2) {
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
      console.log(Object.values(result).some((e) => e === true));
      localStorage.setItem('inProgressRecipes', JSON.stringify(result));
    } else {
      const newKey = {};
      newKey[key] = true;
      const result = Object.assign(state, newKey);
      setCheckboxes(result);
      localStorage.setItem('inProgressRecipes', JSON.stringify(result));
    }
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn" label="favorite">Favoritar</button>
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
              defaultChecked={ checkboxes[index + 1] }
              onChange={ () => handleClick(index) }
            />
            {`${string} ${measures[index]}`}
          </label>
          <br />
        </div>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </>
  );
}

export default RecipeInProgress;
