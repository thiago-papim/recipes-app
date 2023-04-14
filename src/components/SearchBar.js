import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { apiSearch } from '../services/API_SEARCH';

export default function SearchBar() {
  const { setApi, setLoad } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [inputRadio, setInputRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [localApi, setLocalApi] = useState('');
  const [btnSearch, setBtnSearch] = useState(false);

  useEffect(() => {
    const magicNumber = 12;
    const pageName = pathname.includes('meals');
    const validationApi = pageName ? 'meals' : 'drinks';
    const result = localApi[validationApi]?.slice(0, magicNumber);
    if (result) setApi(result);
  }, [localApi, setApi, btnSearch, pathname]);

  const recipeApi = (recipeArr) => {
    if (recipeArr.meals?.length > 1 || recipeArr.drinks?.length > 1) {
      setLocalApi(recipeArr);
    } else if (recipeArr.meals?.length === 1 || recipeArr.drinks?.length === 1) {
      setApi(recipeArr);
      const pageName = pathname.includes('meals');
      const validationApi = pageName ? 'idMeal' : 'idDrink';
      const id = recipeArr[pathname.slice(1)][0][validationApi];
      history.push(`/${pathname.slice(1)}/${id}`);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const getApi = async () => {
    setLoad(true);
    const pageName = pathname.includes('meals');
    const validationApi = pageName ? 'themealdb' : 'thecocktaildb';
    let recipeArr = [];
    if (inputRadio === 'First letter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (inputRadio === 'First letter' && inputSearch.length === 1) {
      recipeArr = await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/search.php?f=${inputSearch}`);
      setLoad(false);
    } else if (inputRadio === 'Name') {
      recipeArr = await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/search.php?s=${inputSearch}`);
      setLoad(false);
    } else {
      recipeArr = await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/filter.php?i=${inputSearch}`);
      setLoad(false);
    }
    recipeApi(recipeArr);
  };

  const handleClick = () => {
    setBtnSearch(true);
    getApi();
  };

  const handleChange = (e) => {
    const { target: { value, type } } = e;
    if (type === 'radio') setInputRadio(value);
    else {
      setInputSearch(value);
    }
  };

  return (
    <form
      className="flex-colum text-center justify-center
     bg-tertiary border-t-4 border-quinary"
    >
      <div className="flex">
        <input
          className="h-12 mx-6 text-center mt-2 rounded shadow-md w-100
          border focus:ring-2 focus:ring-secundary focus:outline-none"
          placeholder="Pesquise sua receita"
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
        />
      </div>
      <div className="flex-colum p-2 mx-6">
        <div className="mt-3">
          <label htmlFor="ingredient" className="mx-3 text-white">
            <input
              className="mx-1"
              name="radioSearch"
              id="ingredient"
              type="radio"
              data-testid="ingredient-search-radio"
              value="Ingredient"
              onClick={ handleChange }
            />
            Ingredient
          </label>
          <label htmlFor="name" className="mx-3 text-white">
            <input
              className="mx-1"
              name="radioSearch"
              id="name"
              type="radio"
              data-testid="name-search-radio"
              value="Name"
              onClick={ handleChange }
            />
            Name
          </label>
          <label htmlFor="firstLetter" className="mx-3 text-white">
            <input
              className="mx-1"
              name="radioSearch"
              id="firstLetter"
              type="radio"
              data-testid="first-letter-search-radio"
              value="First letter"
              onClick={ handleChange }
            />
            First letter
          </label>
        </div>
        <div>
          <button
            className=" p-2 bg-quinary rounded-lg w- w-80"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
