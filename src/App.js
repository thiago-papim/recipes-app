import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import AppProvider from './context/AppProvider';
import Routes from './pages/Routes';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
