import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AppContext from '../context/AppContext';
import { apiSearch } from '../services/API_SEARCH';
import './styles/itens.css';

export default function Recipes() {
  const { api, setApi, originalApi } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const pageName = pathname.includes('meals');
    const validationApi = pageName
      ? ['https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals']
      : ['https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks'];
    async function fetchData() {
      const magicNumber = 5;
      const response = await apiSearch(validationApi[0]);
      const allCategories = response[validationApi[1]].slice(0, magicNumber)
        .map((category) => category.strCategory);
      setCategories(allCategories);
    }
    fetchData();
  }, [setApi, pathname]);

  const categoryFilter = async ({ target: { textContent } }) => {
    if (api[0] === originalApi[0]) {
      const magicNumber = 12;
      const pageName = pathname.includes('meals');
      const validationApi = pageName
        ? [`https://www.themealdb.com/api/json/v1/1/filter.php?c=${textContent}`, 'meals']
        : [`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${textContent}`, 'drinks'];
      const response = await apiSearch(validationApi[0]);
      const result = response[validationApi[1]].slice(0, magicNumber);
      setApi(result);
    } else {
      setApi(originalApi);
    }
  };

  const teste = (e) => {
    const id = e.idMeal || e.idDrink;
    const route = `/${pathname.slice(1)}/${id}`;
    history.push(route);
  };

  return (
    <>
      <div>
        { categories?.map((category, i) => (
          <button
            key={ i }
            data-testid={ `${category}-category-filter` }
            onClick={ categoryFilter }
          >
            {category}
          </button>
        )) }
        <button
          data-testid="All-category-filter"
          onClick={ () => setApi(originalApi) }
        >
          All
        </button>
      </div>
      <div
        className="divAllItens"
      >
        { api ? api.map((recipe, i) => (
          <button
            className="divItens"
            key={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${i}-recipe-card` }
            onClick={ () => teste(recipe) }
          >
            <img
              className="recipeImg"
              data-testid={ `${i}-card-img` }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
            />
            <h4 data-testid={ `${i}-card-name` }>
              { recipe.strMeal || recipe
                .strDrink }

            </h4>
          </button>
        )) : null }
      </div>
    </>
  );
}
