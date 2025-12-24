import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(event));
    dispatch(openCart()); 
  };

  const handleViewDetails = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card">
      {/* ... reste du code identique ... */}
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