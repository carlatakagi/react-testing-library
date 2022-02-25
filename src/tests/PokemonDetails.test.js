import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pikachuTest = data[0];
  const { id, name, foundAt } = pikachuTest;
  console.log(foundAt[0]);

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });

      // clica e redireciona para pagina de detalhes
      userEvent.click(linkDetailsPoke);
      history.push(`/pokemons/${id}`);

      const pokeDetailsHeading = screen.getByRole(
        'heading',
        { name: `${name} Details`, level: 2 },
      );
      expect(pokeDetailsHeading).toBeInTheDocument();
      expect(linkDetailsPoke).not.toBeInTheDocument();

      const summaryHeading = screen.getByRole('heading', {
        name: 'Summary',
        level: 2,
      });
      expect(summaryHeading).toBeInTheDocument();

      // verifica se existe um paragrafo com resumo do pokemon - usarei pikachu
      const paraghDetailsPoke = screen.getByText(/This intelligent Pokémon/i);
      expect(paraghDetailsPoke).toBeInTheDocument();
    });

  test(`Teste se existe na página uma seção com os mapas contendo as localizações do
  pokémon`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });

    // clica e redireciona para pagina de detalhes
    userEvent.click(linkDetailsPoke);
    history.push(`/pokemons/${id}`);

    const gameLocation = screen.getByRole(
      'heading',
      { name: `Game Locations of ${name}`, level: 2 },
    );
    expect(gameLocation).toBeInTheDocument();

    // location
    const nameLocOne = screen.getByText(`${foundAt[0].location}`);
    const nameLocTwo = screen.getByText(`${foundAt[1].location}`);
    const pokeLocation = screen.getAllByRole('img', { name: `${name} location` });

    // como testar imagem em react: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(pokeLocation[0]).toHaveAttribute('src', foundAt[0].map);
    expect(pokeLocation[1]).toHaveAttribute('src', foundAt[1].map);
    expect(pokeLocation[0] && pokeLocation[1]).toHaveAttribute('alt', `${name} location`);
    expect(pokeLocation[0] && pokeLocation[1]).toBeInTheDocument();
    expect(nameLocOne && nameLocTwo).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);

      const detailsPoke = screen.getByRole('link', { name: /More details/i });

      // clica e redireciona para pagina de detalhes
      userEvent.click(detailsPoke);
      history.push(`/pokemons/${id}`);

      // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
      const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
      expect(labelCheckbox).toBeInTheDocument();
      // clicou no checkbox, espero que tenha a imagem de fav
      // quando clicar de novo, espero que nao tenha a img
      userEvent.click(labelCheckbox);
      const imgStar = screen.getByRole('img', { name: `${name} is marked as favorite` });
      expect(imgStar).toBeInTheDocument();
      userEvent.click(labelCheckbox);
      expect(imgStar).not.toBeInTheDocument();
    });
});
