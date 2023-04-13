import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logo3 from '../images/logo3.png';

export default function Header() {
  const history = useHistory();
  const [btnSearch, setBtnSearch] = useState(false);
  const [btnOn, setBtnOn] = useState(false);
  const { location: { pathname } } = history;
  const title = (pathname.charAt(1).toUpperCase() + pathname
    .slice(2)).replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    const arrPageName = ['profile', 'done-recipes', 'favorite-recipes'];
    if (arrPageName.some((name) => pathname.includes(name)) === true) {
      setBtnSearch(true);
    }
  }, [pathname]);

  return (
    <div className="flex flex-row justify-between items-center w-ful bg-tertiary">
      <img src={ logo3 } alt="Logo" className="w-40" />
      <div className="flex items-center justify-between my-3">
        <h2 data-testid="page-title" className="text-quinary">{ title }</h2>
        <FontAwesomeIcon icon={ faUtensils } />
      </div>
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
      { btnOn && <SearchBar /> }
    </div>
  );
}
