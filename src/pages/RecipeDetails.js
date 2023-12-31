/* eslint-disable max-lines */
import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../App.css';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from '../components/FavoriteButton';
import AppContext from '../context/AppContext';
import Carregando from '../images/Carregando....png';
import logo3 from '../images/logo3.png';

function RecipeDetails(props) {
  const { setLoad, load } = useContext(AppContext);
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState(null);
  const [recomendations, setRecomendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isThisRecipeDone, setIsThisRecipeDone] = useState(false);
  const history = useHistory();
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const { pathname } = location;
  const urlAposDominio = pathname.split('/');
  const type = urlAposDominio[1];

  const getFood = async () => {
    setLoad(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setLoad(false);
    return data.meals;
  };

  const getMealsRecomendations = async () => {
    setLoad(true);
    const magicNumber = 6;
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const recipes = data.meals;
    const slicedMeals = recipes.slice(0, magicNumber);
    setLoad(false);
    return slicedMeals;
  };

  const getDrink = async () => {
    setLoad(true);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setLoad(false);
    return data.drinks;
  };

  const getDrinksRecomendations = async () => {
    setLoad(true);
    const magicNumber = 6;
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const recipes = data.drinks;
    const slicedDrinks = recipes.slice(0, magicNumber);
    setLoad(false);
    return slicedDrinks;
  };
  const teste = () => {
    if (type === 'meals') {
      getFood().then((data) => {
        setDetails(data);
      });
      getDrinksRecomendations().then((data) => {
        setRecomendations(data);
      });
    } else {
      getDrink().then((data) => {
        setDetails(data);
      });
      getMealsRecomendations().then((data) => {
        setRecomendations(data);
      });
    }
  };

  useEffect(() => {
    teste();
  }, []);

  useEffect(() => {
    if (details.length > 0) {
      const data = details[0];
      const allIngredients = Object.entries(data)
        .filter((e) => e[0].includes('strIngredient') && e[1])
        .map((e) => e[1]);
      const measures = Object.entries(data)
        .filter((e) => e[0].includes('strMeasure') && e[1])
        .map((e) => e[1]);
      const results = allIngredients.map((e, i) => `${e} ${measures[i]}`);
      setIngredients(results);
    }
  }, [details]);

  const getLink = (youtubeLink) => {
    if (!youtubeLink) return;
    const embedLink = 'https://www.youtube.com/embed/';
    const linkId = youtubeLink.split('v=')[1];
    return `${embedLink}${linkId}`;
  };

  const handleClick = () => {
    if (type === 'meals') {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const copyLink = () => {
    clipboardCopy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  useEffect(() => {
    const currentPath = () => {
      if (pathname.includes('meals')) return 'meals';
      return 'drinks';
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (inProgressRecipes[currentPath()]
      && Object.keys(inProgressRecipes[currentPath()]).includes(id)) {
      setInProgressRecipe(true);
    }
  }, [id, pathname]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.forEach((doneRecipe) => {
        if (doneRecipe.id === id) setIsThisRecipeDone(true);
      });
    }
  }, [id]);

  return (
    <div>
      { load ? <img src={ Carregando } alt="carregando" /> : (
        <div>
          <div
            className="flex justify-between items-center w-ful h-24 bg-tertiary"
          >
            <img src={ logo3 } alt="Logo" className="w-40 left-0 ml-4" />
            <h1 className="text-quinary mr-8">Detalhes da receita</h1>
          </div>
          { details.length > 0 && (
            <div className="z-0">
              <section className="flex w-full">
                <div className="flex-col p-4">
                  <img
                    className="bg-cover
                    rounded-lg border-gray-300 shadow-sm"
                    data-testid="recipe-photo"
                    src={ details[0]?.strMealThumb || details[0]?.strDrinkThumb }
                    alt="Foto da receita"
                  />
                  <h2 className="font-bold text-center" data-testid="recipe-title">
                    { details[0]?.strMeal || details[0]?.strDrink }
                  </h2>
                  <h5 data-testid="recipe-category" className="text-center">
                    { type === 'meals' ? details[0].strCategory
                      : details[0].strAlcoholic }
                  </h5>
                  <div className="flex justify-around items-center w-ful">
                    <button
                      data-testid="share-btn"
                      onClick={ copyLink }
                    >
                      <img
                        src={ shareIcon }
                        alt="Compartilhar"
                      />
                    </button>
                    {copied && <p>Link copied!</p>}
                    { details ? <FavoriteButton
                      idRecipe={ id }
                      recipe={ details }
                    /> : ''}
                  </div>
                </div>
                <div className="flex p-4">
                  <div>
                    <div
                      className="border-2 px-10 py-2"
                    >
                      <h3 className="font-bold">Ingredientes</h3>
                      {
                        ingredients && (
                          <div>

                            <ul className="container">
                              {
                                ingredients.map((e, index) => (

                                  <li
                                    key={ index }
                                    data-testid={ `${index}-ingredient-name-and-measure` }
                                  >
                                    {e}

                                  </li>
                                ))
                              }
                            </ul>
                          </div>

                        )
                      }
                    </div>
                    { !isThisRecipeDone && (
                      <div className="p-2 mx-4">
                        <button
                          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-4"
                          type="button"
                          data-testid="start-recipe-btn"
                          onClick={ handleClick }
                        >
                          { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <h3 className="font-bold text-center border-t-4 p-4">Modo de preparo</h3>
              <p data-testid="instructions" className="text-justify px-2">
                { details[0]?.strInstructions }
              </p>
              <div
                className="flex"
              >
                {
                  type === 'meals'
                && (
                <div>
                  <h2 className="font-bold text-center">Receita em vídeo</h2>
                  <iframe
                    data-testid="video"
                    src={ getLink(details[0]?.strYoutube) }
                    width="420px"
                    height="315px"
                    title={ `${details[0]?.strMeal}` }
                  />
                </div>
                )
                }
                <div
                  className="carousel flex-col w-96 justify-center"
                >
                  <h2 className="font-bold text-center">Recomendações</h2>
                  <Carousel>
                    {
                      recomendations.map((recipe, i) => (
                        <Carousel.Item
                          key={ i }
                          data-testid={ `${i}-recommendation-card` }
                        >
                          <img
                            className="d-block w-100"
                            src={ recipe.strMealThumb || recipe.strDrinkThumb }
                            alt="Foto da receita"
                          />
                          <h2
                            className="text-center"
                            data-testid={ `${i}-recommendation-title` }
                          >
                            {recipe.strMeal || recipe.strDrink}
                          </h2>
                        </Carousel.Item>
                      ))
                    }
                  </Carousel>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
