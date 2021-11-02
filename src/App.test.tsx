import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the game', () => {
  render(<App />);
  const title = screen.getByText(/Lights Out/i);
  const moves = screen.getByText(/Number of Moves: 0/i);
  const restartBtn = screen.getByText(/New Game/i);

  expect(title).toBeInTheDocument();
  expect(moves).toBeInTheDocument();
  expect(restartBtn).toBeInTheDocument();
});
