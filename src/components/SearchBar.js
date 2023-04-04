import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { apiSearch } from '../services/API_SEARCH';

export default function SearchBar() {
  const { setApi } = useContext(AppContext);
  // const history = useHistory();

  const location = useLocation();
  const { pathname } = location;
  const [inputRadio, setInputRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [localApi, setLocalApi] = useState('');
  const [btnSearch, setBtnSearch] = useState(false);

  useEffect(() => {
    const magicNumber = 12;
    const result = localApi.meals?.slice(0, magicNumber);
    if (result?.length > 0) {
      setApi(result);
    }
    if (!result && btnSearch) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [localApi, setApi, btnSearch]);

  const getApi = async () => {
    const pageName = pathname.includes('meals');
    const validationApi = pageName ? 'themealdb' : 'thecocktaildb';
    if (inputRadio === 'First letter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (inputRadio === 'First letter' && inputSearch.length === 1) {
      setLocalApi(await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/search.php?f=${inputSearch}`));
    } else if (inputRadio === 'Name') {
      setLocalApi(await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/search.php?s=${inputSearch}`));
    } else {
      setLocalApi(await apiSearch(`https://www.${validationApi}.com/api/json/v1/1/filter.php?i=${inputSearch}`));
    }
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
      data-testid="search-input"
    >
      <div>
        <input
          type="text"
          onChange={ handleChange }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            name="radioSearch"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            name="radioSearch"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            value="Name"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="firstLetter">
          First letter
          <input
            name="radioSearch"
            id="firstLetter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="First letter"
            onClick={ handleChange }
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </form>
  );
}
