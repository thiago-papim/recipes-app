import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Itens() {
  const { api } = useContext(AppContext);

  return (
    <div>
      { api ? api.map((recipe, i) => (
        <div
          key={ recipe.strMeal || recipe.strDrink }
          data-testid={ `${i}-recipe-card` }
        >
          <img
            data-testid={ `${i}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h2 data-testid={ `${i}-card-name` }>{ recipe.strMeal || recipe.strDrink }</h2>
        </div>
      )) : null }
    </div>
  );
}
