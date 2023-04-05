import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
// import App from '../App';
import AppProvider from '../context/AppProvider';
import Routes from '../pages/Routes';

describe('Testando o SearchBar', () => {
  jest.setTimeout(10000);
  it('Testando o retorno da pesquisa em Meals', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>,
    );
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginSubmitButton = screen.getByTestId(/login-submit-btn/i);
    userEvent.type(emailInput, 'emailInvalido');
    userEvent.type(passwordInput, '000');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginSubmitButton);
    const searchButton = screen.getByAltText('searchBtn');
    userEvent.click(searchButton);
    const inputSearch = screen.getByPlaceholderText('Pesquise sua receita...');
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    const radioName = screen.getByRole('radio', { name: /name/i });
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter.checked).toBe(true);
    userEvent.type(inputSearch, ('ab'));
    const btnSubmit = screen.getByText(/search/i);
    userEvent.click(btnSubmit);
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter.checked).toBe(true);
    userEvent.type(inputSearch, ('a'));
    expect(btnSubmit).toBeInTheDocument();
    userEvent.click(btnSubmit);
    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'salt');
    userEvent.click(btnSubmit);
    userEvent.click(radioName);
    userEvent.type(inputSearch, ('Apple Frangipan Tart'));
    userEvent.click(btnSubmit);

    screen.logTestingPlaygroundURL();
  });
});
