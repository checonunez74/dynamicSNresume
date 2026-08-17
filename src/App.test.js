import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio landing page', () => {
  render(<App />);
  expect(screen.getByText(/Online Resume/i)).toBeInTheDocument();
});
