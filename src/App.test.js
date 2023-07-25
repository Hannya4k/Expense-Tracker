import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the Expense Tracker title', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Expense Tracker/i);
    expect(titleElement).toBeInTheDocument();
  });
  
  test('renders the Add Expense button', () => {
    const { getByText } = render(<App />);
    const buttonElement = getByText(/Add Expense/i);
    expect(buttonElement).toBeInTheDocument();
  });