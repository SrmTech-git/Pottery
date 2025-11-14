import React, { useState, useEffect } from 'react';
import './App.css';
import PotteryList from './components/pottery/PotteryList';
import Button from './components/common/Button';
import { hasData, seedSampleData, clearAllData } from './services/seedData';

/**
 * Main App component
 * This is the root component that contains the entire application
 */
function App() {
  // Track whether we have data and need to refresh the list
  const [showData, setShowData] = useState(false);
  const [dataExists, setDataExists] = useState(false);

  // Check if data exists when component mounts
  useEffect(() => {
    const exists = hasData();
    setDataExists(exists);
    setShowData(exists);
  }, []);

  /**
   * Load sample data into the app
   * This helps users understand how the app works
   * Clears existing data first to ensure fresh sample data
   */
  const handleLoadSampleData = () => {
    clearAllData(); // Clear any existing data first
    seedSampleData();
    setDataExists(true);
    setShowData(true);
    // Force a re-render of the PotteryList by toggling showData
    setShowData(false);
    setTimeout(() => setShowData(true), 0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>🏺 Pottery Management System</h1>
            <p>Track your pottery pieces from thrown to fired</p>
          </div>
          {dataExists && (
            <Button onClick={handleLoadSampleData} variant="secondary">
              Reset Sample Data
            </Button>
          )}
        </div>
      </header>

      <main className="app-main">
        {!dataExists && (
          <div className="welcome-message">
            <h2>Welcome!</h2>
            <p>Get started by loading sample data to see how the app works.</p>
            <p>Sample data includes:</p>
            <ul>
              <li>5 types of clay (Earthenware, Stoneware, Porcelain, B-Mix 5, B-Mix 10)</li>
              <li>4 glazes with different temperatures and finishes</li>
              <li>5 pottery pieces in various stages of completion</li>
            </ul>
            <div className="welcome-actions">
              <Button onClick={handleLoadSampleData}>
                Load Sample Data
              </Button>
            </div>
          </div>
        )}

        {showData && (
          <PotteryList key={Date.now()} />
        )}
      </main>

      <footer className="app-footer">
        <p>Pottery Management System v0.2.0</p>
      </footer>
    </div>
  );
}

export default App;
