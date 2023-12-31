import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { apiSearch } from '../services/API_SEARCH';
import FavoriteButton from '../components/FavoriteButton';
import AppContext from '../context/AppContext';
import Carregando from '../images/Carregando....png';
import logo3 from '../images/logo3.png';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const { setLoad, load } = useContext(AppContext);
  const history = useHistory();
  const [checkboxes, setCheckboxes] = useState({});
  const [copied, setCopied] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [idRecipe, setIdRecipe] = useState('');
  const [btnFinish, setBtnFinish] = useState(true);

  useEffect(() => {
    setLoad(true);
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ drinks: {}, meals: {} }));
    } else {
      setCheckboxes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
    const url = history.location.pathname;
    const name = url.includes('meals');
    const id = url.split('/')[2];
    setIdRecipe(id);
    const fetchApi = async () => {
      if (name) {
        const response = await apiSearch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setRecipe(response.meals[0]);
        setLoad(false);
      } else {
        const response = await apiSearch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        setRecipe(response.drinks[0]);
        setLoad(false);
      }
    };
    fetchApi();
  }, [history, setLoad]);

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

  const finishValidation = () => {
    const type = recipe.idMeal ? 'meals' : 'drinks';
    const id = idRecipe;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const validation = storage[type][id];
    if (ingredients.length === validation.length) {
      setBtnFinish(false);
    } else {
      setBtnFinish(true);
    }
  };

  const finish = () => {
    const id = recipe.idDrink || recipe.idMeal;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const validationRecipe = doneRecipes?.some((e) => e.id === id);
    const tags = recipe.strTags ? (recipe.strTags).split(',') : [];
    const doneDate = new Date();
    const objRecipe = {
      id,
      type: recipe.idDrink ? 'drink' : 'meal',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      tags,
      name: recipe.strDrink || recipe.strMeal,
      doneDate,
      image: recipe.strDrinkThumb || recipe.strMealThumb,
    };
    if (!doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([objRecipe]));
    } else if (doneRecipes && validationRecipe === false) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, objRecipe]));
    }
    history.push('/done-recipes');
  };

  const handleClick = (string, e) => {
    const check = e.target.checked;
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const type = recipe.idMeal ? 'meals' : 'drinks';
    const id = idRecipe;
    const arrString = storage[type][id];
    const validation = arrString?.some((element) => element === string);
    if (arrString && !validation && check) {
      storage[type] = {
        ...storage[type],
        [id]: [...arrString, string],
      };
      setCheckboxes(storage);
    } else if (!arrString) {
      storage[type] = {
        ...storage[type],
        [id]: [string],
      };
      setCheckboxes(storage);
    } else if (!check) {
      storage[type] = {
        ...storage[type],
        [id]: arrString.filter((element) => element !== string),
      };
      setCheckboxes(storage);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
    finishValidation();
  };

  return (
    <div>
      { load ? <img src={ Carregando } alt="Carregando" />
        : (
          <div
            className="flex-col pb-3"
          >
            <div
              className="flex justify-between items-center w-ful h-24 bg-tertiary"
            >
              <img src={ logo3 } alt="Logo" className="w-40 left-0 ml-4" />
              <h1 className="text-quinary mr-8">Receita em Progresso</h1>
            </div>
            <div
              className="flex flex-col items-center"
            >
              <img
                className="max-w-md pt-4"
                data-testid="recipe-photo"
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt={ recipe.strMeal || recipe.strDrink }
              />
              <h2
                className="pt-2 m-0"
                data-testid="recipe-title"
              >
                {recipe.strMeal || recipe.strDrink}
              </h2>
              <p data-testid="recipe-category">{recipe.strCategory}</p>
              <div>
                <button
                  className="mr-4"
                  data-testid="share-btn"
                  onClick={ () => {
                    const magicNumber = -12;
                    copy(window.location.href.slice(0, magicNumber));
                    setCopied(false);
                  } }
                >
                  <img
                  // className="mx-2"
                    src={ shareIcon }
                    alt="Compartilhar"
                  />
                </button>
                { idRecipe
                  ? <FavoriteButton idRecipe={ idRecipe } recipe={ [recipe] } /> : ''}
              </div>
              { copied || <p>Link copied!</p> }
              {ingredients.length > 0 && ingredients.map((string, index) => {
                const type = recipe.idMeal ? 'meals' : 'drinks';
                const id = idRecipe;
                const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
                const validation = storage[type][id] ? checkboxes[type][id]
                  ?.some((e) => e === string) : false;
                return (
                  <div
                    key={ string }
                    className="flex ml-48 w-96"
                  >
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor="step"
                      style={ validation
                        ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                        : { textDecoration: 'none' } }
                    >
                      <input
                        label="step"
                        type="checkbox"
                        // defaultChecked={ checkboxes[index + 1] }
                        checked={ validation }
                        onChange={ (e) => handleClick(string, e) }
                      />
                      {`${string} ${measures[index] || ''}`}
                    </label>
                    <br />
                  </div>
                );
              })}
              <p
                className="pt-7 px-2 text-justify border-t-2"
                data-testid="instructions"
              >
                {recipe.strInstructions}

              </p>
              <button
                className="p-2 rounded-lg text-white enabled:bg-secundary mx-4 pb
                disabled:bg-primary"
                data-testid="finish-recipe-btn"
                disabled={ btnFinish }
                onClick={ finish }
              >
                Finalizar Receita
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

export default RecipeInProgress;
