import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não
  tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokeFound = screen.getByText(/No favorite pokemon found/i);
    expect(noPokeFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    // pegar o pokemon favoritado pelo checkbox
    const isFavPoke = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(isFavPoke).toBeInTheDocument();
    userEvent.click(isFavPoke);

    // aqui renderiza a pagina favoritos
    history.push('/favorites');

    // aqui verifica se o pokemon está na pagina
    const favPokeImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(favPokeImg).toBeInTheDocument();
  });
});
