import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭;',
    () => {
      renderWithRouter(<NotFound />);
      const headingText = screen.getByRole('heading', {
        name: /Page requested not found/i, level: 2,
      });
      expect(headingText).toBeInTheDocument();
    });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    // como testar imagem em react: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgNotFound)
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
