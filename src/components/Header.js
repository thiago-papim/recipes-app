import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
    <div>
      <div>
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
      <div>
        <h2 data-testid="page-title">{ title }</h2>
      </div>
      { btnOn && <SearchBar /> }
    </div>
  );
}
