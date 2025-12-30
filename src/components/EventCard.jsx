import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, openCart, selectCartItems } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { showInfoToast } from '../utils/toast';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const [isAdding, setIsAdding] = useState(false);

  // Vérifier si l'événement est déjà dans le panier
  const itemInCart = cartItems.find(item => item.id === event.id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Animation de feedback
    setTimeout(() => {
      dispatch(addToCart(event));
      dispatch(openCart());
      
      if (itemInCart) {
        showInfoToast(`Quantité augmentée : ${event.title} (${itemInCart.quantity + 1})`);
      } else {
        showInfoToast(`Ajouté au panier : ${event.title}`);
      }
      
      setIsAdding(false);
    }, 300);
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
        />
        {event.category && (
          <span className="event-card-category">{event.category}</span>
        )}
        {itemInCart && (
          <span className="in-cart-badge">
            {itemInCart.quantity}
          </span>
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
          Date: {new Date(event.date).toLocaleDateString('fr-FR')}
          </span>
          <span className="event-card-price">{event.price} €</span>
        </div>
      </div>

      <div className="event-card-actions">
        <button className="btn-details" onClick={handleViewDetails}>
        Détails
        </button>
        <button 
          className={`btn-add-cart ${isAdding ? 'adding' : ''} ${itemInCart ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Ok' : itemInCart ? 'Ajouter +1' : 'Ajouter'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;