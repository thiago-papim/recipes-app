import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './pages/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
