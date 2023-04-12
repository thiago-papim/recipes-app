import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando Recipe in Progress', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    await waitFor(() => {
      expect(screen.getByText(/Lentils 1 cup/i));
    });
  });
  it('Testando Local Storage', async () => {
    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
  });
  it('Testando com Local Storage e testando Checkboxes', async () => {
    localStorage.setItem('inProgressRecipes', JSON
      .stringify({ drinks: {}, meals: {} }));
    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    const checkboxes = screen.getAllByRole('checkbox');
    expect(btnFinish).toBeDisabled();
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[0]);
    checkboxes.forEach((e) => userEvent.click(e));
    expect(checkboxes[0]).toBeChecked();
    expect(btnFinish).not.toBeDisabled();
    userEvent.click(btnFinish);
  });
  it('Testando botão compartilhar', async () => {
    window.document.execCommand = jest.fn(() => true);
    const btnStart = screen.getByRole('button', { name: /continue recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    const btnShare = screen.getByRole('button', { name: /compartilhar/i });
    console.log(btnShare);
    fireEvent.click(btnShare);
  });
});

describe('Testando Recipe in Progress em Drinks', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/17222');
    });
    await waitFor(() => {
      expect(screen.getByText('Gin 1 3/4 shot'));
    });
  });
  it('Testando Local Storage e Button finish', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      tags: [
        'Soup',
      ],
      name: 'Corba',
      doneDate: '2023-04-11T20:49:01.502Z',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    }]));
    const btnStart = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    expect(btnFinish).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((e) => {
      userEvent.click(e);
      expect(e).toBeChecked();
    });
    expect(btnFinish).not.toBeDisabled();
    userEvent.click(btnFinish);
    console.log(JSON.parse(localStorage.getItem('doneRecipes')));
  });
  it('Testando localStorage caso já tenha a receita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '17222',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      tags: [],
      name: 'A1',
      doneDate: '2023-04-12T15:00:16.529Z',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    }]));
    const btnStart = screen.getByRole('button', { name: /continue recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    const btnFinish = screen.getByRole('button', { name: /finalizar receita/i });
    expect(btnFinish).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[0]);
    expect(btnFinish).not.toBeDisabled();
    userEvent.click(btnFinish);
  });
  it('Testando checkbox Marcar e Desmarcar', async () => {
    localStorage.clear();
    const btnStart = screen.getByRole('button', { name: /continue recipe/i });
    userEvent.click(btnStart);
    await waitFor(() => {
      expect(screen.getAllByRole('checkbox'));
    });
    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    userEvent.click(checkboxes[0]);
  });
});
