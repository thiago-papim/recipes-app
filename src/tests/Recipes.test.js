import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando Itens', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByText(/corba/i));
    });
  });
  it('Testando Filtros e redirecionamento quando clicar no item', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /beef/i }));
    });
    const btnBeef = screen.getByRole('button', { name: /beef/i });
    userEvent.click(btnBeef);
    await waitFor(() => {
      expect(screen.getByText(/beef and mustard pie/i));
    });
    userEvent.click(btnBeef);
    const itemBurek = screen.getByText(/burek/i);
    expect(itemBurek).toBeInTheDocument();
    userEvent.click(itemBurek);
    await waitFor(() => {
      expect(screen.getByText(/Side/i));
    });
  });
  it('Testando Filtros All', async () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
  });
});

describe('Testando Itens em Drinks', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      expect(screen.getByText(/gg/i));
    });
  });
  it('Testando Filtros e redirecionamento quando clicar no item', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /shake/i }));
    });
    const btnShake = screen.getByRole('button', { name: /shake/i });
    userEvent.click(btnShake);
    await waitFor(() => {
      expect(screen.getByText(/baby eskimo/i));
    });
    const itemEskimo = screen.getByText(/baby eskimo/i);
    expect(itemEskimo).toBeInTheDocument();
    userEvent.click(itemEskimo);
    await waitFor(() => {
      expect(screen.getByText(/Alcoholic/i));
    });
  });
  it('Testando Filtros All', async () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
  });
});
