import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
// import App from '../App';

describe('Testando o Login', () => {
  it('', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginSubmitButton = screen.getByTestId(/login-submit-btn/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitButton).toBeInTheDocument();
    userEvent.type(emailInput, 'emailInvalido');
    userEvent.type(passwordInput, '000');
    expect(loginSubmitButton).toBeDisabled();
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456789');
    expect(loginSubmitButton).toBeEnabled();
    userEvent.click(loginSubmitButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
