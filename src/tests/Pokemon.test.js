import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  // pego o pikachu para teste
  const pikachuTest = data[0];
  console.log(pikachuTest);

  // desestruturo o value e o measurementUnit para utilizar la na frente
  const { averageWeight: { value, measurementUnit }, id, name } = pikachuTest;

  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      // nome de determinado pokemon, neste teste escolhi o pikachu
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      // tipo do pokemon
      const typePoke = screen.getByTestId('pokemon-type');
      expect(typePoke).toHaveTextContent('Electric');
      // peso do poke
      expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
        .toBeInTheDocument();
      // imagem do poke
      const imgPikachu = screen.getByRole('img');
      // como testar imagem em react: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
      expect(imgPikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(imgPikachu).toHaveAttribute('alt', 'Pikachu sprite');
    });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
  exibir detalhes deste Pokémon.O link deve possuir a URL /pokemons/<id>, onde <id> é o
  id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const url = `/pokemons/${id}`;
    const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });
    // testar href: https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    expect(linkDetailsPoke).toHaveAttribute('href', url);
  });

  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    console.log(history);
    const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });

    // clicou
    userEvent.click(linkDetailsPoke);

    // redireciona
    history.push(`/pokemons/${id}`);
    const pokeDetailsHeading = screen.getByRole(
      'heading',
      { name: /Details/i, level: 2 },
    );
    expect(pokeDetailsHeading).toBeInTheDocument();
  });

  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);

    const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });

    // clica e redireciona
    userEvent.click(linkDetailsPoke);
    history.push(`/pokemons/${id}`);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetailsPoke = screen.getByRole('link', { name: /More details/i });

    // clica e redireciona para pagina de detalhes
    userEvent.click(linkDetailsPoke);
    history.push(`/pokemons/${id}`);

    // pega o checkbox para clicar
    const isChecked = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(isChecked);

    // verifica se existe a imagem de estrela
    const imgStar = screen.getByRole('img', { name: `${name} is marked as favorite` });
    // como testar imagem em react: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStar).toHaveAttribute('alt', `${name} is marked as favorite`);
    expect(imgStar).toBeInTheDocument();
  });
});
