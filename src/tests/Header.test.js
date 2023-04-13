import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Header from '../components/Header';

describe('Realizando testes do Header', () => {
  test('Testando se o botão de pesquisa está no Header', () => {
    renderWithRouter(<Header />);
    const searchButton = screen.getByAltText('searchBtn');
    expect(searchButton).toBeInTheDocument();
  });
  test('Testando se o botão de perfil está no Header', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getByAltText('perfilBtn');
    expect(profileButton).toBeInTheDocument();
  });
  test('Testa se ao clicar no icone de perfil ele redireciona para a pagina de perfil', () => {
    const { history } = renderWithRouter(<Header />);
    const profileButton = screen.getByAltText('perfilBtn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Teste se ao clicar no botão de pesquisa exibe os radio buttons a barra de pesquisa e o bottao search', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const loginSubmitButton = screen.getByTestId(/login-submit-btn/i);
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginSubmitButton);
    const searchButton = screen.getByAltText('searchBtn');
    userEvent.click(searchButton);
    const radioButtons = screen.getAllByRole('radio');
    const searchInput = screen.getByPlaceholderText('Pesquise sua receita...');
    const searchBarButton = screen.getAllByRole('button', { name: /search/i });
    expect(radioButtons).toHaveLength(3);
    expect(searchInput).toBeInTheDocument();
    expect(searchBarButton).toHaveLength(2);
    const profileButton = screen.getByAltText('perfilBtn');
    userEvent.click(profileButton);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });
});
