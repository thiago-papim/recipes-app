import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinksFooter from '../images/DrinksFooter.png';
import MealsFooter from '../images/MealsFooter.png';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="bg-tertiary text-white p-4 fixed
      bottom-0 w-full h-14 flex justify-center items-center"
    >
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img
          className="w-12 mx-8"
          src={ MealsFooter }
          alt="Ícone da comida"
        />
      </button>
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          className="w-12 mx-8"
          src={ DrinksFooter }
          alt="Ícone da bebida"
        />
      </button>
    </footer>
  );
}

export default Footer;
