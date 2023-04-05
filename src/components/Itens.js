import { useContext } from 'react';

import AppContext from '../context/AppContext';
import './styles/itens.css';

export default function Itens() {
  const { api } = useContext(AppContext);

  return (
    <div
      className="divAllItens"
    >
      { api ? api.map((recipe, i) => (
        <div
          className="divItens"
          key={ recipe.strMeal || recipe.strDrink }
          data-testid={ `${i}-recipe-card` }

        >
          <img
            className="recipeImg"
            data-testid={ `${i}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h4 data-testid={ `${i}-card-name` }>{ recipe.strMeal || recipe.strDrink }</h4>
        </div>
      )) : null }
    </div>
  );
}
