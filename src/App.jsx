import React from 'react';
import './App.css';

/**
 * Main App component
 * This is the root component that contains the entire application
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏺 Pottery Management System</h1>
        <p>Welcome to your pottery inventory manager</p>
      </header>

      <main className="app-main">
        <div className="welcome-message">
          <h2>Getting Started</h2>
          <p>This is your pottery management application.</p>
          <p>Features coming soon:</p>
          <ul>
            <li>Add and manage pottery items</li>
            <li>Track inventory quantities</li>
            <li>Search and filter items</li>
            <li>View detailed pottery catalog</li>
          </ul>
        </div>
      </main>

      <footer className="app-footer">
        <p>Pottery Management System v0.2.0</p>
      </footer>
    </div>
  );
}

export default App;
