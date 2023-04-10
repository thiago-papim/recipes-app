import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
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
  const [copied, setCopied] = useState(recipes.map(() => false));

  const copyLink = (id, type, index) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    const oldCopied = copied;
    const newCopied = [];
    oldCopied.forEach((bool) => newCopied.push(bool));
    newCopied[index] = true;
    setCopied(newCopied);
  };

  const handleClick = (index) => {
    const newArray = [];
    recipes.map((obj) => newArray.push(obj));
    newArray.splice(index, 1);
    setRecipes(newArray);
  };

  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {recipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLink(recipe.id, recipe.type, index) }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          {copied[index] && <p>Link copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleClick(index) }
          >
            <img src={ blackHeartIcon } alt="black-heart-icon" />
          </button>
        </div>
      ))}

    </div>

  );
}

export default FavoriteRecipes;
