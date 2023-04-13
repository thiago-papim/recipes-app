import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ idRecipe, recipe }) {
  const [iconFavorite, setIconFavorite] = useState(false);

  const favoriteRecipe = () => {
    const favoritesStorage = localStorage.getItem('favoriteRecipes');
    const id = recipe[0].idDrink || recipe[0].idMeal;
    const objRecipe = {
      id,
      type: recipe[0].idDrink ? 'drink' : 'meal',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    };
    if (!favoritesStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objRecipe]));
    } else if (!iconFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, objRecipe]));
    } else if (iconFavorite) {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newStorage = storage.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    }
  };

  useEffect(() => {
    const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorite = storageFavorite ? storageFavorite.some((e) => e
      .id === idRecipe) : false;
    setIconFavorite(favorite);
  }, [idRecipe, recipe]);

  return (
    <button
      // data-testid="favorite-btn"
      onClick={ () => {
        favoriteRecipe();
        setIconFavorite(!iconFavorite);
      } }
    >
      <img
        data-testid="favorite-btn"
        src={ iconFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="whiteHeartIcon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  recipe: PropTypes.arrayOf(
    PropTypes.shape({
      idDrink: PropTypes.string,
      idMeal: PropTypes.string,
      strArea: PropTypes.string,
      strCategory: PropTypes.string,
      strAlcoholic: PropTypes.string,
      strDrink: PropTypes.string,
      strMeal: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strMealThumb: PropTypes.string,
    }),

  ).isRequired,
};
