import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import DoneRecipes from '../pages/DoneRecipes';
// import fetch from '../../cypress/mocks/fetch';

describe('Testando a página de detalhes de uma comida ou bebida', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockImplementation(fetch);
    // await act(async () => {
    //   renderWithRouter(<App />, '/meals/53065');
    // });
    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /detalhes da receita/i,
      }));
    });
  });
  it('Testando se existem os elementos esperados na tela', async () => {
    // expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: /side/i,
      }));
    });
    await waitFor(() => {
      expect(screen.getByText(/ingredientes/i));
    });
    await waitFor(() => {
      expect(screen.getByText(/Pick through your lentils for any foreign debris/i));
    });
    await waitFor(() => {
      expect(screen.getByTestId(/recipe-photo/i));
    });
    await waitFor(() => {
      expect(screen.getByTestId(/start-recipe-btn/i));
    });
  });
  // it('Testando Local Storage e Button finish', async () => {
  //   localStorage.setItem('doneRecipes', JSON.stringify([{
  //     id: '52977',
  //     type: 'meal',
  //     nationality: 'Turkish',
  //     category: 'Side',
  //     alcoholicOrNot: '',
  //     tags: [
  //       'Soup',
  //     ],
  //     name: 'Corba',
  //     doneDate: '2023-04-11T20:49:01.502Z',
  //     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //   }]));
  //   console.log(JSON.parse(localStorage.getItem('doneRecipes')));
  //   const button = screen.getByRole('button', { name: /start recipe/i });
  //   expect(button).toBeVisible();
  //   await waitFor(() => {
  //     expect(screen.getByText(/corba/i));
  //   });
  //   screen.logTestingPlaygroundURL();
  //   expect(button).not.toBeVisible();
  // await waitForElementToBeRemoved(() => screen.getByRole('button', { name: /start recipe/i }));
  // expect(btnStart).toBeDisabled();
});
