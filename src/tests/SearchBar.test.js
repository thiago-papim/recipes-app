import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o SearchBar', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
  });
  it('Testando Radio first letter', () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'ae');

    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);
    expect(alertMock).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    userEvent.type(inputSearch, 'z');
    userEvent.click(submitSearch);
    expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
  it('TEstando redirecionamento caso venha uma unica receita', async () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioName = screen.getByRole('radio', { name: /name/i });
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'corba');

    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);

    const ingredient = await screen.findByText('Lentils 1 cup');
    expect(ingredient).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
  it('Testando se retorna 4 receitas', async () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioFirstLetter = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(radioFirstLetter);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'a');
    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);

    const itemApple = await screen.findByText(/apple frangipan tart/i);
    expect(itemApple).toBeInTheDocument();
  });
  it('Testando radio ingredient', async () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'chicken');
    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);

    const itemChicken = await screen.findByText(/brown stew chicken/i);
    expect(itemChicken).toBeInTheDocument();
  });
});

describe('Testando o SearchBar em drinks', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
  });
  it('Testando radio ingredient', async () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'gin');
    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);

    const itemChicken = await screen.findByText(/69 special/i);
    expect(itemChicken).toBeInTheDocument();
  });
  it('TEstando redirecionamento caso venha uma unica receita', async () => {
    const btnSearch = screen.getByAltText(/searchbtn/i);
    userEvent.click(btnSearch);
    const radioName = screen.getByRole('radio', { name: /name/i });
    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, '69 special');

    const submitSearch = screen.getByText(/search/i);
    userEvent.click(submitSearch);

    const ingredient = await screen.findByText(/Alcoholic/);
    expect(ingredient).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});
