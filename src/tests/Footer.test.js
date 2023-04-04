import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o Footer', () => {
  it('Testando se existem os 2 ícones na tela', () => {
    renderWithRouter(<Footer />);
    const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
    const mealIcon = screen.getByTestId(/meals-bottom-btn/i);
    const footerId = screen.getByTestId(/footer/i);
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
    expect(footerId).toBeInTheDocument();
  });
  it('Testando a rota drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testando se clicando no botão dr drinks, ele redireciona para a página de drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinkButton = screen.getByAltText('Ícone da bebida');
    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealButton = screen.getByAltText('Ícone da comida');
    userEvent.click(mealButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
