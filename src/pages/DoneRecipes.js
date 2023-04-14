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
      <div
        className="flex justify-center mt-6"
      >
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ recipeFilter }
        >
          All
        </button>
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ recipeFilter }
        >
          Meals
        </button>
        <button
          className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-2 w-20"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ recipeFilter }
        >
          Drinks
        </button>
      </div>
      <div className="flex flex-col pt-4">
        {
          doneRecipes ? doneRecipes.map((recipe, index) => (
            <div
              className="flex flex-col items-center text-center pb-4"
              key={ index }
            >
              <button
                type="button"
                onClick={ () => handleClick(recipe) }
              >
                <img
                  className="w-48"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.type }
                />
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h3>
              </button>
              <div>
                { recipe.tags.map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
                <h2
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.type === 'drink'
                    ? `${recipe.alcoholicOrNot}`
                    : (
                      <div>
                        <h3>{`Nacionalidade: ${recipe.nationality}`}</h3>
                        <h3>{`Categoria: ${recipe.category}`}</h3>
                      </div>)}
                </h2>
              </div>
              <h6
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Concluido em: ${recipe.doneDate}`}
              </h6>
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
            </div>
          )) : null
        }
      </div>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
