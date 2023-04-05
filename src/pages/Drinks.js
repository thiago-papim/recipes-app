import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Itens from '../components/Itens';
import AppContext from '../context/AppContext';
import { apiSearch } from '../services/API_SEARCH';

function Drinks() {
  const { setApi } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const response = await apiSearch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const magicNumber = 12;
      setApi(response.drinks.slice(0, magicNumber));
    }
    fetchData();
  }, [setApi]);

  return (
    <div>
      <Header />
      <Itens />
      <Footer />
    </div>
  );
}

export default Drinks;
