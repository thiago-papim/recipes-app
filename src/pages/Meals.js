import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiSearch } from '../services/API_SEARCH';
import AppContext from '../context/AppContext';
import Recipes from '../components/Recipes';

export default function Meals() {
  const { setApi, setOriginalApi } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const response = await apiSearch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const magicNumber = 12;
      setApi(response.meals.slice(0, magicNumber));
      setOriginalApi(response.meals.slice(0, magicNumber));
    }
    fetchData();
  }, [setApi, setOriginalApi]);

  return (
    <>
      <Header />
      <Recipes />
      <Footer />
    </>
  );
}
