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
      <div className="flex-col text-center">
        <h3
          className="my-8"
          data-testid="profile-email"
        >
          {user}
        </h3>
        <div>
          <button
            className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-4"
            data-testid="profile-done-btn"
            onClick={ () => btn('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            className="p-2 bg-quinary rounded-lg hover:bg-quaternary mx-4"
            data-testid="profile-favorite-btn"
            onClick={ () => btn('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className="p-2 bg-[#e64747] rounded-lg hover:bg-[#e61616] mx-4"
            data-testid="profile-logout-btn"
            onClick={ () => btn('/') }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
