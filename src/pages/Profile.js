import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'))?.email;
  console.log(user);

  const btn = (page) => {
    if (page === '/') {
      localStorage.clear();
    }
    history.push(page);
  };
  return (
    <div>
      <Header />
      <h3
        data-testid="profile-email"
      >
        {user}
      </h3>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => btn('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => btn('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ () => btn('/') }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
