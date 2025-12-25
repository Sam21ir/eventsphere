import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Événement reçu dans EventCard:', event); // Debug

  const handleAddToCart = () => {
    dispatch(addToCart(event));
    dispatch(openCart());
  };

  const handleViewDetails = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card">
      <div className="event-card-image-container">
        <img 
          src={event.image || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={event.title}
          className="event-card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250?text=Image+Indisponible';
          }}
        />
        {event.category && (
          <span className="event-card-category">{event.category}</span>
        )}
      </div>
      
      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-description">
          {event.description 
            ? event.description.substring(0, 100) + '...' 
            : 'Découvrez cet événement exceptionnel'}
        </p>
        
        <div className="event-card-info">
          <span className="event-card-date">
            📅 {new Date(event.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <span className="event-card-price">{event.price} €</span>
        </div>
      </div>

      <div className="event-card-actions">
        <button className="btn-details" onClick={handleViewDetails}>
          Détails
        </button>
        <button className="btn-add-cart" onClick={handleAddToCart}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default EventCard;