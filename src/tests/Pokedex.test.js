import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const encounteredPoke = screen.getByRole('heading', {
        name: /Encountered pokémons/i, level: 2,
      });
      expect(encounteredPoke).toBeInTheDocument();
    });

  test(`Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon
  é clicado.`, () => {
    renderWithRouter(<App />);

    // O botão deve conter o texto Próximo pokémon;
    const buttonNextPoke = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNextPoke).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    // clica para aparecer o proximo pokemon
    userEvent.click(buttonNextPoke);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const snorlax = screen.getByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const dragonair = screen.getByText(/dragonair/i);
    expect(dragonair).toBeInTheDocument();

    userEvent.click(buttonNextPoke);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
  se estiver no último Pokémon da lista;`, () => {
    const { history } = renderWithRouter(<App />);
    const buttonNextPoke = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    history.push('/pokemons/148');

    const lastPoke = screen.getByAltText(/Dragonair sprite/i);
    expect(lastPoke).toBeInTheDocument();
    userEvent.click(buttonNextPoke);

    history.push('/pokemons/25');

    const firstPoke = screen.getByAltText(/Pikachu sprite/i);
    expect(firstPoke).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const buttonNextPoke = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(buttonNextPoke);

    const altImgPoke = screen.getByAltText(/sprite/i);
    expect(altImgPoke).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    // primeiro tinha criado uma variavel para cada botao e o teste apontava como erro o testid
    // e eu não estava utilizando o testid
    // entao consultei o PR do meu amigo Mario Fernando para finalizar este requisito do requisito (linhas 114 a 118)
    // link: https://github.com/tryber/sd-018-b-project-react-testing-library/pull/52/files
    // aqui crio uma variavel que pega todos os elementos que tem o datatestid sinalizado
    const buttonFilters = screen.getAllByTestId('pokemon-type-button');
    // console.log(buttonFilters.length);
    // defino o magic number em 7, pois é a quantidade dos botoes e depois testa se é o mesmo tamanho
    const LENGTH_BUTTON_FILTERS = 7;
    expect(buttonFilters).toHaveLength(LENGTH_BUTTON_FILTERS);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    /* const buttonElectric = screen.getByRole('button',
      { name: /electric/i });
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    const buttonBug = screen.getByRole('button', { name: /bug/i });
    const buttonPoison = screen.getByRole('button', { name: /poison/i });
    const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
    const buttonNormal = screen.getByRole('button', { name: /normal/i });
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    expect(buttonAll && buttonElectric && buttonFire
      && buttonBug && buttonPoison && buttonPsychic
      && buttonNormal && buttonDragon).toBeInTheDocument(); */

    // texto do botao, aparecer somente pokemons daquele tipo e botao all sempre visivel
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(buttonDragon);
    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke).toHaveTextContent('Dragon');
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', { name: /all/i });
    expect(buttonReset).toBeInTheDocument();

    userEvent.click(buttonReset);
    history.push('/');

    const buttonNextPoke = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    // quando clicar devera mostar os pokemons normalmente
    userEvent.click(buttonNextPoke);
    const nextPokeChar = screen.getByText(/charmander/i);
    expect(nextPokeChar).toBeInTheDocument();
    userEvent.click(buttonNextPoke);
    const nextPokeCater = screen.getByText(/caterpie/i);
    expect(nextPokeCater).toBeInTheDocument();

    expect(buttonReset).toBeInTheDocument();
    expect(buttonReset).toBeEnabled();
  });
});
