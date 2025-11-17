import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';
import { getAllPotteryPieces } from '../../services/potteryPieceService';
import { updatePotteryPiece } from '../../services/potteryPieceService';
import { POTTERY_STATUS, STATUS_DISPLAY_NAMES } from '../../models/PotteryPiece';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands, faHammer, faFire, faDroplet, faStar } from '@fortawesome/free-solid-svg-icons';

/**
 * KanbanBoard Component
 *
 * Displays pottery pieces in a Kanban/Trello-style board.
 * Cards can be dragged between columns to update their status.
 */
function KanbanBoard() {
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);

  // Load pottery pieces when component mounts
  useEffect(() => {
    loadPieces();
  }, []);

  /**
   * Load all pottery pieces from localStorage
   */
  const loadPieces = () => {
    const allPieces = getAllPotteryPieces();
    console.log('🔄 Loaded pieces:', allPieces.map(p => ({ id: p.id, name: p.name, status: p.status })));
    setPieces(allPieces);
  };

  /**
   * Handle drag start event
   */
  const handleDragStart = (e, piece) => {
    e.stopPropagation();
    console.log('🟢 DRAG START:', { id: piece.id, name: piece.name, status: piece.status });
    setDraggedPiece(piece);
    // Store the piece ID in dataTransfer
    e.dataTransfer.setData('text/plain', piece.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    // Add a class instead of directly modifying style
    e.currentTarget.classList.add('dragging');
  };

  /**
   * Handle drag end event
   */
  const handleDragEnd = (e) => {
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    setDraggedPiece(null);
  };

  /**
   * Handle drag over event (required to allow drop)
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  /**
   * Handle drop event - update piece status
   */
  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('🔵 DROP EVENT:', { newStatus, draggedPiece: draggedPiece ? { id: draggedPiece.id, name: draggedPiece.name, oldStatus: draggedPiece.status } : null });

    if (!draggedPiece) {
      console.log('⚠️ NO DRAGGED PIECE!');
      return;
    }

    // Don't update if dropped in same column
    if (draggedPiece.status === newStatus) {
      console.log('⏭️ Same column, skipping update');
      setDraggedPiece(null);
      return;
    }

    // Update the piece status
    const updatedPiece = {
      ...draggedPiece,
      status: newStatus,
      // Update the corresponding date field based on new status
      ...(newStatus === POTTERY_STATUS.LEATHER_DRY && { leatherDryDate: new Date().toISOString() }),
      ...(newStatus === POTTERY_STATUS.BISQUE_FIRED && { bisqueFiredDate: new Date().toISOString() }),
      ...(newStatus === POTTERY_STATUS.GLAZED && { glazedDate: new Date().toISOString() }),
      ...(newStatus === POTTERY_STATUS.FIRED && { firedDate: new Date().toISOString() })
    };

    console.log('📝 Updating piece:', { id: updatedPiece.id, name: updatedPiece.name, newStatus: updatedPiece.status });

    // Update the piece in localStorage
    const result = updatePotteryPiece(draggedPiece.id, updatedPiece);
    console.log('💾 Update result:', result);

    // Clear drag state
    setDraggedPiece(null);

    // Reload pieces to reflect changes
    loadPieces();

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('potteryDataChanged'));
  };

  // Icon mapping for each status
  const statusIcons = {
    [POTTERY_STATUS.THROWN]: faHands,
    [POTTERY_STATUS.LEATHER_DRY]: faHammer,
    [POTTERY_STATUS.BISQUE_FIRED]: faFire,
    [POTTERY_STATUS.GLAZED]: faDroplet,
    [POTTERY_STATUS.FIRED]: faStar
  };

  // Define the columns
  const columns = [
    POTTERY_STATUS.THROWN,
    POTTERY_STATUS.LEATHER_DRY,
    POTTERY_STATUS.BISQUE_FIRED,
    POTTERY_STATUS.GLAZED,
    POTTERY_STATUS.FIRED
  ];

  /**
   * Get pieces for a specific status
   */
  const getPiecesForStatus = (status) => {
    return pieces.filter(piece => piece.status === status);
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <h2>Pottery Workflow</h2>
        <p className="kanban-subtitle">Drag cards to update status</p>
      </div>

      <div className="kanban-columns">
        {columns.map(status => {
          const statusPieces = getPiecesForStatus(status);

          return (
            <div
              key={status}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="kanban-column-header">
                <div className="column-icon">
                  <FontAwesomeIcon icon={statusIcons[status]} />
                </div>
                <h3>{STATUS_DISPLAY_NAMES[status]}</h3>
                <span className="column-count">{statusPieces.length}</span>
              </div>

              <div className="kanban-cards">
                {statusPieces.length === 0 ? (
                  <div className="kanban-empty">
                    Drop cards here
                  </div>
                ) : (
                  statusPieces.map(piece => (
                    <div
                      key={piece.id}
                      className="kanban-card"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, piece)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="kanban-card-header">
                        <h4>{piece.name}</h4>
                      </div>
                      <div className="kanban-card-body">
                        <div className="kanban-card-detail">
                          <span className="detail-label">Form:</span>
                          <span>{piece.formType || 'N/A'}</span>
                        </div>
                        <div className="kanban-card-detail">
                          <span className="detail-label">Size:</span>
                          <span>{piece.height}" × {piece.width}"</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanbanBoard;
