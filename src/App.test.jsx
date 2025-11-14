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
  const welcomeElement = screen.getByText(/Getting Started/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('displays feature list', () => {
  // Arrange & Act: Render the App component
  render(<App />);

  // Assert: Check if at least one feature is listed
  const featureElement = screen.getByText(/Add and manage pottery items/i);
  expect(featureElement).toBeInTheDocument();
});
