import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
        src="../images/drinkIcon.svg"
      >
        <img src={ drinkIcon } alt="Ícone da bebida" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ () => history.push('/meals') }
        src="../images/mealIcon.svg"
      >
        <img src={ mealIcon } alt="Ícone da comida" />
      </button>
    </footer>
  );
}

export default Footer;
