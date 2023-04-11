import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const mockLocalStorage = [{
    id: '53060',
    type: 'meal',
    nationality: 'Croatian',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  }, {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  }];

  const [recipes, setRecipes] = useState(mockLocalStorage);
  const [filteredRecipes, setFilteredRecipes] = useState(mockLocalStorage);
  const [filterType, setFilterType] = useState('all');
  const [copied, setCopied] = useState(recipes.map(() => false));
  const history = useHistory();

  const copyLink = (id, type, index) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    const oldCopied = copied;
    const newCopied = [];
    oldCopied.forEach((bool) => newCopied.push(bool));
    newCopied[index] = true;
    setCopied(newCopied);
  };

  const resetFilter = (recipesList) => {
    setFilteredRecipes(recipesList);
    setFilterType('all');
  };

  const filterByMeal = (recipesList) => {
    const newArray = [];
    recipesList.map((obj) => {
      if (obj.type === 'meal') {
        newArray.push(obj);
      }

      setFilteredRecipes(newArray);
      setFilterType('meal');

      return newArray;
    });
  };

  const filterByDrink = (recipesList) => {
    const newArray = [];
    recipesList.map((obj) => {
      if (obj.type === 'drink') {
        newArray.push(obj);
      }

      setFilteredRecipes(newArray);
      setFilterType('drink');

      return newArray;
    });
  };

  const removeFavorite = (name) => {
    const newArray = recipes.filter((recipe) => recipe.name !== name);
    setRecipes(newArray);

    if (filterType === 'meal') {
      filterByMeal(newArray);
    } else if (filterType === 'drink') {
      filterByDrink(newArray);
    } else {
      resetFilter(newArray);
    }
  };

  const toDetails = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => resetFilter(recipes) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterByMeal(recipes) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByDrink(recipes) }
      >
        Drinks
      </button>

      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <button onClick={ () => toDetails(recipe.type, recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              // onClick={ () => toDetails(recipe.type, recipe.id) }
            />
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <button onClick={ () => toDetails(recipe.type, recipe.id) }>
            <h2
              data-testid={ `${index}-horizontal-name` }
              // onClick={ () => toDetails(recipe.type, recipe.id) }
            >
              {recipe.name}
            </h2>
          </button>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLink(recipe.id, recipe.type, index) }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          {copied[index] && <p>Link copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(recipe.name) }
          >
            <img src={ blackHeartIcon } alt="black-heart-icon" />
          </button>
        </div>
      ))}

    </div>

  );
}

export default FavoriteRecipes;
