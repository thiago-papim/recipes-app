import { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [originalRecipes, setOriginalRecipes] = useState([]);

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(getDoneRecipes);
    setOriginalRecipes(getDoneRecipes);
  }, []);

  const recipeFilter = async ({ target: { textContent } }) => {
    console.log(textContent);
    if (textContent === 'All') {
      setDoneRecipes(originalRecipes);
    } else if (textContent === 'Meals') {
      const filteredRecipes = originalRecipes
        ?.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(filteredRecipes);
    } else if (textContent === 'Drinks') {
      const filteredRecipes = originalRecipes
        ?.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(filteredRecipes);
    }
  };

  const copyLink = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  function handleClick(recipe) {
    const { id, type } = recipe;
    const route = `/${type}s/${id}`;
    history.push(route);
  }

  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ recipeFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ recipeFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ recipeFilter }
        >
          Drinks
        </button>
      </div>
      {
        doneRecipes ? doneRecipes.map((recipe, index) => (
          <div
            key={ index }
          >
            <button
              type="button"
              onClick={ () => handleClick(recipe) }
            >
              <img
                className="doneRecipeImg"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.type }
              />
            </button>
            <h2
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'drink'
                ? `${recipe.alcoholicOrNot}`
                : `${recipe.nationality} - ${recipe.category}`}
            </h2>
            <button
              onClick={ () => handleClick(recipe) }
            >
              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h3>
            </button>
            <h4
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </h4>
            <button
              type="button"
              onClick={ () => copyLink(recipe.id, recipe.type) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img
                alt="shareIcon"
                src={ shareIcon }
              />
            </button>
            {copied && <p>Link copied!</p>}
            { recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        )) : null
      }
      <Footer />
    </div>
  );
}

export default DoneRecipes;
