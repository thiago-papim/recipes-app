import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logo3 from '../images/logo3.png';
import DrinksHeader1 from '../images/DrinksHeader1.png';
import MealsHeader1 from '../images/MealsHeader1.png';

export default function Header() {
  const history = useHistory();
  const [btnSearch, setBtnSearch] = useState(false);
  const [btnOn, setBtnOn] = useState(false);
  const { location: { pathname } } = history;
  // const title = (pathname.charAt(1).toUpperCase() + pathname
  //   .slice(2)).replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    const arrPageName = ['profile', 'done-recipes', 'favorite-recipes'];
    if (arrPageName.some((name) => pathname.includes(name)) === true) {
      setBtnSearch(true);
    }
  }, [pathname]);

  return (
    <div>
      <div
        className="flex flex-row justify-between
      items-center w-ful bg-tertiary px-8 h-24"
      >
        <img src={ logo3 } alt="Logo" className="w-40" />
        {
          btnSearch
          || (
            <div className="flex items-center justify-between my-3">
              <img
                className="w-48"
                src={ pathname.includes('meals') ? MealsHeader1 : DrinksHeader1 }
                alt="titulo"
              />
            </div>
          )
        }
        <div className="flex flex-row items-center space-x-4">
          {
            btnSearch
          || (
            <button
              onClick={ () => setBtnOn(!btnOn) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="searchBtn"
                className="w-18"
              />
            </button>
          )
          }
          <button
            onClick={ () => history.push('/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="perfilBtn"
            />
          </button>
        </div>
      </div>
      <div>
        { btnOn && <SearchBar /> }
      </div>
    </div>
  );
}
