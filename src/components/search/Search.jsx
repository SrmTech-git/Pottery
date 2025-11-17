import React, { useState, useEffect } from 'react';
import './Search.css';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';
import ClayTooltip from '../common/ClayTooltip';
import GlazeTooltip from '../common/GlazeTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button';
import { getAllPotteryPieces } from '../../services/potteryPieceService';
import { getAllClayTypes } from '../../services/clayTypeService';
import { getAllGlazes } from '../../services/glazeService';
import { getClayTypeById } from '../../services/clayTypeService';
import { getGlazesForPiece } from '../../services/potteryPieceGlazeService';
import { STATUS_DISPLAY_NAMES, getProgressPercentage } from '../../models/PotteryPiece';

/**
 * Search Component
 *
 * Advanced search and filter interface for pottery pieces.
 * Allows text search, filtering by status/clay/glaze, and sorting.
 *
 * @param {function} onBackClick - Function to call when back button is clicked
 */
function Search({ onBackClick }) {
  // Search and filter state
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clayFilter, setClayFilter] = useState('all');
  const [glazeFilter, setGlazeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name, status
  const [includeArchived, setIncludeArchived] = useState(false);

  // Results state
  const [allPieces, setAllPieces] = useState([]);
  const [filteredPieces, setFilteredPieces] = useState([]);

  // Available filters
  const [clayTypes, setClayTypes] = useState([]);
  const [glazes, setGlazes] = useState([]);

  // Load data on mount
  useEffect(() => {
    loadData();

    // Listen for data changes
    const handleDataChange = () => {
      loadData();
    };
    window.addEventListener('potteryDataChanged', handleDataChange);

    return () => {
      window.removeEventListener('potteryDataChanged', handleDataChange);
    };
  }, []);

  // Re-filter when any filter changes
  useEffect(() => {
    filterAndSortPieces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, statusFilter, clayFilter, glazeFilter, sortBy, includeArchived, allPieces]);

  /**
   * Sort function to put favorites first
   */
  const sortByFavorite = (items) => {
    return [...items].sort((a, b) => {
      // If one is favorite and the other isn't, favorite comes first
      if (a.isFavorite === b.isFavorite) {
        // If both are same favorite status, sort alphabetically by name
        const aName = `${a.manufacturer} ${a.name}`;
        const bName = `${b.manufacturer} ${b.name}`;
        return aName.localeCompare(bName);
      }
      return b.isFavorite ? 1 : -1; // favorites first
    });
  };

  /**
   * Load all data
   */
  const loadData = () => {
    const pieces = getAllPotteryPieces();
    setAllPieces(pieces);

    const types = getAllClayTypes();
    setClayTypes(sortByFavorite(types));

    const allGlazes = getAllGlazes();
    setGlazes(sortByFavorite(allGlazes));
  };

  /**
   * Filter and sort pieces based on current filters
   */
  const filterAndSortPieces = () => {
    let filtered = [...allPieces];

    // Filter by archived status
    if (!includeArchived) {
      filtered = filtered.filter(piece => !piece.isArchived);
    }

    // Text search (name, form type, notes)
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(piece =>
        piece.name.toLowerCase().includes(searchLower) ||
        piece.formType.toLowerCase().includes(searchLower) ||
        (piece.notes && piece.notes.toLowerCase().includes(searchLower))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(piece => piece.status === statusFilter);
    }

    // Filter by clay type
    if (clayFilter !== 'all') {
      filtered = filtered.filter(piece => piece.clayTypeId === parseInt(clayFilter));
    }

    // Filter by glaze
    if (glazeFilter !== 'all') {
      filtered = filtered.filter(piece => {
        const pieceGlazes = getGlazesForPiece(piece.id);
        return pieceGlazes.some(glaze => glaze.id === parseInt(glazeFilter));
      });
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredPieces(filtered);
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    setSearchText('');
    setStatusFilter('all');
    setClayFilter('all');
    setGlazeFilter('all');
    setSortBy('newest');
    setIncludeArchived(false);
  };

  /**
   * Get clay type display name
   */
  const getClayTypeName = (clayTypeId) => {
    const clayType = getClayTypeById(clayTypeId);
    return clayType ? `${clayType.manufacturer} - ${clayType.name}` : 'Unknown';
  };

  /**
   * Format date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const hasActiveFilters = searchText || statusFilter !== 'all' || clayFilter !== 'all' ||
                           glazeFilter !== 'all' || includeArchived;

  return (
    <div className="search-page">
      <div className="search-back-button">
        <Button onClick={onBackClick} variant="secondary">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Main
        </Button>
      </div>

      <div className="search-header">
        <h2>
          <FontAwesomeIcon icon={faSearch} /> Search Pottery
        </h2>
        <p className="search-subtitle">Find pottery pieces by name, type, status, or materials</p>
      </div>

      {/* Search and Filter Panel */}
      <div className="search-panel">
        {/* Text Search */}
        <div className="search-input-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, form type, or notes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Filters Row */}
        <div className="filters-row">
          <div className="filter-group">
            <label>
              <FontAwesomeIcon icon={faFilter} /> Status
            </label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUS_DISPLAY_NAMES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>
              <FontAwesomeIcon icon={faFilter} /> Clay Type
            </label>
            <select value={clayFilter} onChange={(e) => setClayFilter(e.target.value)}>
              <option value="all">All Clay Types</option>
              {clayTypes.map(clay => (
                <option key={clay.id} value={clay.id}>
                  {clay.manufacturer} - {clay.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>
              <FontAwesomeIcon icon={faFilter} /> Glaze
            </label>
            <select value={glazeFilter} onChange={(e) => setGlazeFilter(e.target.value)}>
              <option value="all">All Glazes</option>
              {glazes.map(glaze => (
                <option key={glaze.id} value={glaze.id}>
                  {glaze.manufacturer} - {glaze.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Additional Options */}
        <div className="search-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeArchived}
              onChange={(e) => setIncludeArchived(e.target.checked)}
            />
            Include archived pieces
          </label>

          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="search-results">
        <div className="results-header">
          <h3>
            {filteredPieces.length} {filteredPieces.length === 1 ? 'Result' : 'Results'}
          </h3>
        </div>

        {filteredPieces.length === 0 ? (
          <div className="no-results">
            <p>No pottery pieces found matching your search criteria.</p>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={handleClearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="results-grid">
            {filteredPieces.map(piece => {
              const glazes = getGlazesForPiece(piece.id);

              return (
                <div key={piece.id} className="result-card">
                  <div className="result-card-header">
                    <h3>{piece.name}</h3>
                    <StatusBadge status={piece.status} />
                  </div>

                  {piece.imageUrl && (
                    <div className="result-card-image">
                      <img src={piece.imageUrl} alt={piece.name} />
                    </div>
                  )}

                  <div className="result-card-body">
                    <div className="result-detail">
                      <span className="detail-label">Form:</span>
                      <span className="detail-value">{piece.formType || 'N/A'}</span>
                    </div>

                    <div className="result-detail">
                      <span className="detail-label">Clay:</span>
                      <ClayTooltip clayType={getClayTypeById(piece.clayTypeId)}>
                        <span className="detail-value">{getClayTypeName(piece.clayTypeId)}</span>
                      </ClayTooltip>
                    </div>

                    {glazes.length > 0 && (
                      <div className="result-detail">
                        <span className="detail-label">Glazes:</span>
                        <span className="detail-value">
                          {glazes.map((glaze, index) => (
                            <span key={glaze.relationshipId}>
                              <GlazeTooltip glaze={glaze}>
                                <span className="glaze-name">{glaze.name}</span>
                              </GlazeTooltip>
                              {index < glazes.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    <div className="result-detail">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{formatDate(piece.thrownDate)}</span>
                    </div>

                    {piece.isArchived && (
                      <div className="archived-badge">Archived</div>
                    )}
                  </div>

                  <ProgressBar percentage={getProgressPercentage(piece.status)} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
