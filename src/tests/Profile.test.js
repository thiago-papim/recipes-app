import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('Testando o Login', () => {
  it('', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginSubmitButton = screen.getByTestId(/login-submit-btn/i);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginSubmitButton);
    expect(history.location.pathname).toBe('/meals');
  });
  it('Testando Botão done recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testando Botão favorites recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavorites = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(btnFavorites);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testando Botão Logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
