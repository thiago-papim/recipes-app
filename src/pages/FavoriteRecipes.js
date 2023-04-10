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

  const [copied, setCopied] = useState(false);

  const copyLink = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {mockLocalStorage.map((recipe, index) => (
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
            onClick={ () => copyLink(recipe.id, recipe.type) }
          >
            <img src={ shareIcon } alt="share-icon" />
          </button>
          {copied && <p>Link copied!</p>}
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt="black-heart-icon" />
          </button>
        </div>
      ))}

    </div>

  );
}

export default FavoriteRecipes;
