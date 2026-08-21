import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Ezekiel Lara/i })).toBeInTheDocument();
  expect(
    screen.getByText(/Seeking Engineering Leader roles/i)
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('link', { name: /ezeklara74@gmail.com/i }).length
  ).toBeGreaterThan(0);
});
