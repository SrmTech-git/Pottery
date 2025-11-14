import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test suite for the main App component
 * These tests ensure the App renders correctly
 */

test('renders pottery management heading', () => {
  // Arrange & Act: Render the App component
  render(<App />);

  // Assert: Check if the heading is displayed
  // Using getByRole to specifically target the h1 heading
  const headingElement = screen.getByRole('heading', {
    name: /Pottery Management System/i,
    level: 1
  });
  expect(headingElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  // Arrange & Act: Render the App component
  render(<App />);

  // Assert: Check if welcome message is present
  const welcomeElement = screen.getByText(/Welcome!/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('displays load sample data button', () => {
  // Arrange & Act: Render the App component
  render(<App />);

  // Assert: Check if the load sample data button is present
  const buttonElement = screen.getByText(/Load Sample Data/i);
  expect(buttonElement).toBeInTheDocument();
});
