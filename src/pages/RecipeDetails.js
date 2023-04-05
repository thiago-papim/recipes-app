import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import AppContext from '../context/AppContext';

function RecipeDetails(props) {
  const [details, setDetails] = useState([]);
  // http://localhost:3000/drinks/13501 url exemplo
  console.log(props);
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const { pathname } = location;
  const urlAposDominio = pathname.split('/');
  const type = urlAposDominio[1];

  useEffect(() => {
    if (type === 'meals') {
      const getFood = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setDetails(data.meals);
      };
      getFood();
    } else {
      const getDrink = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setDetails(data.drinks);
      };
      getDrink();
    }
  }, [id, type]);
  console.log(details);

  const pageName = pathname.includes('meals');
  const checking = pageName ? 'meals' : 'drinks';
  return (
    <div>
      <h1>Detalhes da receita</h1>
      { details && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ checking ? details.strMealThumb : details.strDrinkThumb }
            alt="Foto da receita"
          />
          <h2 data-testid="recipe-title">
            { checking ? details.strMeal : details.strDrink}
          </h2>
          <h3 data-testid="recipe-category">
            { checking ? details.strCategory : details.strAlcoholic }
          </h3>
          <h3>Ingredientes</h3>
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
