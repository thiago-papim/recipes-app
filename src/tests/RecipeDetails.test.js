import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import fetch from '../../cypress/mocks/fetch';

describe('Testando a página de detalhes de uma comida ou bebida', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53065');
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
      expect(screen.getByText(/seafood/i));
    });
    await waitFor(() => {
      expect(screen.getByText(/ingredientes/i));
    });
    screen.logTestingPlaygroundURL();
    // const img = screen.getByTestId(/recipe-photo/i);
    // const title = screen.getByRole('heading', {
    //   name: /sushi/i,
    // });
    // const shareButton = screen.getByTestId(/share-btn-title/i);
    // const category = screen.getByTestId(/category/i);
    // const instructions = screen.getByTestId(/instructions/i);
    // const video = screen.getByTestId(/video/i);
    // const startButton = screen.getByTestId(/recipe-title/i);
    // expect(img).toBeInTheDocument();
    // expect(title).toBeInTheDocument();
    // expect(shareButton).toBeInTheDocument();
    // expect(category).toBeInTheDocument();
    // expect(instructions).toBeInTheDocument();
    // expect(video).toBeInTheDocument();
    // expect(startButton).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
});
