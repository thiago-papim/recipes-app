import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { apiSearch } from '../services/API_SEARCH';
import { MealsFilter } from '../images/ButtonsFilter/MealsFilter';
import { DrinksFilter } from '../images/ButtonsFilter/DrinksFilter';
import AllDrinks from '../images/ButtonsFilter/AllDrinks.png';
import AllMeals from '../images/ButtonsFilter/AllMeals.png';
import Carregando from '../images/Carregando....png';

export default function Recipes() {
  const { api, setApi, originalApi, load, setLoad } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [categories, setCategories] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState('');
  const [page, setPage] = useState(true);

  useEffect(() => {
    setLoad(true);
    const pageName = pathname.includes('meals');
    setPage(pageName);
    const validationApi = pageName
      ? ['https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals']
      : ['https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks'];
    async function fetchData() {
      const magicNumber = 5;
      const response = await apiSearch(validationApi[0]);
      const allCategories = response[validationApi[1]].slice(0, magicNumber)
        .map((category) => category.strCategory);
      setCategories(allCategories);
      setLoad(false);
    }
    fetchData();
  }, [setApi, pathname, setLoad]);

  const categoryFilter = async (category) => {
    console.log('oi');
    if (category === '' || category !== categoriesFilter) {
      console.log(categoriesFilter);
      setCategoriesFilter(category);
      console.log(api);
      console.log(originalApi);
      setLoad(true);
      const magicNumber = 12;
      const pageName = pathname.includes('meals');
      const validationApi = pageName
        ? [`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, 'meals']
        : [`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`, 'drinks'];
      const response = await apiSearch(validationApi[0]);
      const result = response[validationApi[1]].slice(0, magicNumber);
      setLoad(false);
      setApi(result);
      console.log(categoriesFilter);
    } else {
      setCategoriesFilter('');
      setApi(originalApi);
    }
  };

  const teste = (e) => {
    const id = e.idMeal || e.idDrink;
    const route = `/${pathname.slice(1)}/${id}`;
    history.push(route);
  };

  return (
    <div>
      { load
        ? <img src={ Carregando } alt="load" />
        : (
          <div>
            <div className="flex justify-center">
              { categories?.map((category, i) => (
                <div
                  key={ i }
                  className="flex-col text-center"
                >
                  <button
                    className="border-quinary rounded-full mx-2 w-20 p-2
                    border-4 bg-tertiary"
                    key={ i }
                    data-testid={ `${category}-category-filter` }
                    onClick={ () => categoryFilter(category) }
                  >
                    <img
                      className="w-20"
                      src={ page ? MealsFilter[i] : DrinksFilter[i] }
                      alt="beef"
                    />
                  </button>
                  <p>
                    {category}
                  </p>
                </div>
              )) }
              <div className="flex-col text-center">
                <button
                  className="border-quinary rounded-full mx-2 w-20 p-2
                border-4 bg-tertiary"
                  data-testid="All-category-filter"
                  onClick={ () => setApi(originalApi) }
                >
                  <img
                    className="w-20"
                    src={ page ? AllMeals : AllDrinks }
                    alt="beef"
                  />
                </button>
                <p>All</p>
              </div>
            </div>
            <div
              className="flex-wrap text-center"
            >
              { api ? api.map((recipe, i) => (
                <button
                  className="mx-2 mb-4 rounded-md shadow-md hover:shadow-2xl"
                  key={ recipe.strMeal || recipe.strDrink }
                  data-testid={ `${i}-recipe-card` }
                  onClick={ () => teste(recipe) }
                >
                  <img
                    className="w-48 rounded-t-lg"
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
          </div>
        )}
    </div>
  );
}
