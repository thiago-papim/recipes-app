import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [copied, setCopied] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(favoriteRecipes);
    setFilteredRecipes(favoriteRecipes);
    setCopied(favoriteRecipes ? favoriteRecipes.map(() => false) : []);
  }, []);

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
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));

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
      <div
        className="flex justify-center mt-6"
      >
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          data-testid="filter-by-all-btn"
          onClick={ () => resetFilter(recipes) }
        >
          All
        </button>
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterByMeal(recipes) }
        >
          Meals
        </button>
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByDrink(recipes) }
        >
          Drinks
        </button>
      </div>

      {filteredRecipes ? filteredRecipes.map((recipe, index) => (
        <div key={ recipe.name } className="flex flex-col items-center text-center pt-4">
          <button onClick={ () => toDetails(recipe.type, recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              width="300"
              alt={ recipe.name }
            />
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h2>
          </button>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <div>
            <button
              className="mr-5"
              onClick={ () => copyLink(recipe.id, recipe.type, index) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share-icon"
              />
            </button>
            <button
              onClick={ () => removeFavorite(recipe.name) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="black-heart-icon"
              />
            </button>
          </div>
          {copied[index] && <p>Link copied!</p>}
        </div>
      )) : <p />}

    </div>

  );
}

export default FavoriteRecipes;
