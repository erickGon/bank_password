import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('Test Home Render', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Openbank/i);
  expect(linkElement).toBeInTheDocument();
});
