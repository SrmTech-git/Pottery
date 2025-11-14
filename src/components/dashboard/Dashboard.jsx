import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { getAllPotteryPieces } from '../../services/potteryPieceService';
import { POTTERY_STATUS, STATUS_DISPLAY_NAMES } from '../../models/PotteryPiece';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands, faHammer, faFire, faDroplet, faStar } from '@fortawesome/free-solid-svg-icons';

/**
 * Dashboard Component
 *
 * Displays summary statistics and insights about pottery pieces.
 * Shows total count, breakdown by status, and other useful metrics.
 */
function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {},
    byFormType: {},
    completionRate: 0
  });

  // Load data and calculate stats when component mounts
  useEffect(() => {
    calculateStats();
  }, []);

  /**
   * Calculate statistics from pottery pieces
   */
  const calculateStats = () => {
    const pieces = getAllPotteryPieces();
    const total = pieces.length;

    // Count by status
    const byStatus = {};
    Object.values(POTTERY_STATUS).forEach(status => {
      byStatus[status] = pieces.filter(p => p.status === status).length;
    });

    // Count by form type
    const byFormType = {};
    pieces.forEach(piece => {
      const formType = piece.formType || 'Unknown';
      byFormType[formType] = (byFormType[formType] || 0) + 1;
    });

    // Calculate completion rate
    const completedPieces = pieces.filter(p => p.status === POTTERY_STATUS.FIRED).length;
    const completionRate = total > 0 ? Math.round((completedPieces / total) * 100) : 0;

    setStats({
      total,
      byStatus,
      byFormType,
      completionRate
    });
  };

  // Icon mapping for status cards
  const statusIcons = {
    [POTTERY_STATUS.THROWN]: faHands,
    [POTTERY_STATUS.LEATHER_DRY]: faHammer,
    [POTTERY_STATUS.BISQUE_FIRED]: faFire,
    [POTTERY_STATUS.GLAZED]: faDroplet,
    [POTTERY_STATUS.FIRED]: faStar
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-subtitle">Overview of your pottery collection</p>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-summary">
        <div className="summary-card summary-card-total">
          <div className="summary-card-content">
            <span className="summary-label">Total Pieces</span>
            <span className="summary-value">{stats.total}</span>
          </div>
        </div>

        <div className="summary-card summary-card-completion">
          <div className="summary-card-content">
            <span className="summary-label">Completion Rate</span>
            <span className="summary-value">{stats.completionRate}%</span>
          </div>
          <div className="summary-detail">
            {stats.byStatus[POTTERY_STATUS.FIRED] || 0} completed pieces
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="dashboard-section">
        <h3>Status Breakdown</h3>
        <div className="status-grid">
          {Object.values(POTTERY_STATUS).map(status => (
            <div key={status} className={`status-card status-card-${status}`}>
              <div className="status-card-icon">
                <FontAwesomeIcon icon={statusIcons[status]} />
              </div>
              <div className="status-card-content">
                <span className="status-card-label">{STATUS_DISPLAY_NAMES[status]}</span>
                <span className="status-card-count">{stats.byStatus[status] || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Type Breakdown */}
      {Object.keys(stats.byFormType).length > 0 && (
        <div className="dashboard-section">
          <h3>Pieces by Form Type</h3>
          <div className="form-type-list">
            {Object.entries(stats.byFormType)
              .sort((a, b) => b[1] - a[1]) // Sort by count, descending
              .map(([formType, count]) => (
                <div key={formType} className="form-type-item">
                  <span className="form-type-name">{formType}</span>
                  <div className="form-type-bar-container">
                    <div
                      className="form-type-bar"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="form-type-count">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
