import React from 'react';
import '../styles/AdminEventCard.css';

const AdminEventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="admin-event-card">
      <div className="event-image-container">
        <img 
          src={event.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={event.title}
          className="event-image"
        />
        {event.category && (
          <span className="event-category">{event.category}</span>
        )}
      </div>
      
      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="event-description">{event.description || 'Pas de description'}</p>
        
        <div className="event-info">
          <span className="event-date">Date: {new Date(event.date).toLocaleDateString('fr-FR')}</span>
          <span className="event-price">{event.price} €</span>
        </div>
      </div>

      <div className="event-actions">
        <button className="btn-edit" onClick={() => onEdit(event)} style={{ fontFamily: 'Englebert, sans-serif' }}>
            Modifier
        </button>
        <button className="btn-delete" onClick={() => onDelete(event.id)} style={{ fontFamily: 'Englebert, sans-serif' }}>
            Supprimer
        </button>
      </div>
    </div>
  );
};

export default AdminEventCard;