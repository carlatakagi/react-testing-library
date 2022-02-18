import React from 'react';
import {Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

// history cria o histórico de navegação
// a helper passa o historico para o Router
// renderiza o componente(que é passado como argumento) dentro dele

export default renderWithRouter;