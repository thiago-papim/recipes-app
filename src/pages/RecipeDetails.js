import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [recomendations, setRecomendations] = useState([]);
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const { pathname } = location;
  const urlAposDominio = pathname.split('/');
  const type = urlAposDominio[1];
  console.log(type);

  useEffect(() => {
    if (type === 'meals') {
      const getFood = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);
        setDetails(data.meals);
      };
      const getMealsRecomendations = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecomendations(data.meals);
        // console.log(recomendations);
      };
      getFood();
      getMealsRecomendations();
    } else {
      const getDrink = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        // console.log('entrei');
        setDetails(data.drinks);
      };
      const getDrinksRecomendations = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecomendations(data.drinks);
        // console.log(recomendations);
      };
      getDrink();
      getDrinksRecomendations();
    }
  }, [id, type, recomendations]);

  useEffect(() => {
    console.log(details);
    if (details.length > 0) {
      const data = details[0];
      console.log(data);
      const allIngredients = Object.entries(data)
        .filter((e) => e[0].includes('strIngredient') && e[1])
        .map((e) => e[1]);
      console.log(allIngredients);
      const measures = Object.entries(data)
        .filter((e) => e[0].includes('strMeasure') && e[1])
        .map((e) => e[1]);
      console.log(measures);
      const results = allIngredients.map((e, i) => `${e} ${measures[i]}`);
      console.log(results);
      setIngredients(results);
    }
  }, [details]);

  const getLink = (youtubeLink) => {
    if (!youtubeLink) return;
    const embedLink = 'https://www.youtube.com/embed/';
    const linkId = youtubeLink.split('v=')[1];
    return `${embedLink}${linkId}`;
  };

  console.log(details);
  return (
    <div>
      <h1>Detalhes da receita</h1>
      { details.length > 0 && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ details[0]?.strMealThumb || details[0]?.strDrinkThumb }
            alt="Foto da receita"
            style={ { width: '400px' } }
          />
          <h2 data-testid="recipe-title">
            { details[0]?.strMeal || details[0]?.strDrink }
          </h2>
          <h3 data-testid="recipe-category">
            { type === 'meals' ? details[0].strCategory : details[0].strAlcoholic }
          </h3>
          <h3>Ingredientes</h3>
          {
            ingredients && (
              <ul>
                {
                  ingredients.map((e, index) => (

                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {e}

                    </li>
                  ))
                }
              </ul>)
          }
          <p data-testid="instructions">
            { details[0]?.strInstructions }
          </p>
          <iframe
            data-testid="video"
            src={ getLink(details[0]?.strYoutube) }
            width="420px"
            height="315px"
            title={ `${details[0]?.strMeal}` }
          />
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
