import React from 'react';
import Itens from '../components/Itens';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

export default function Meals() {
  return (
    <>
      <SearchBar />
      <Itens />
      <Footer />
    </>
  );
}
