import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import '../styles/CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (item.quantity < 10) {
      dispatch(incrementQuantity(item.id));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.id));
    } else {
      if (window.confirm(`Supprimer "${item.title}" du panier ?`)) {
        dispatch(decrementQuantity(item.id));
      }
    }
  };

  const handleRemove = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${item.title}" ?`)) {
    dispatch(removeFromCart(item.id));
  };
  }

  return (
    <div className="cart-item">
      <img 
        src={item.image || 'https://via.placeholder.com/80'} 
        alt={item.title}
        className="cart-item-image"
        onError={(e) => {
    e.target.src = 'https://via.placeholder.com/80?text=No+Image';
  }}
      />
      
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-date">
          Date: {new Date(item.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
        <p className="cart-item-price">{item.price.toFixed(2)} € × {item.quantity}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="qty-btn" 
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            title={item.quantity === 1 ? "Supprimer l'article" : "Diminuer"}
            aria-label="Diminuer la quantité"
          >
            {item.quantity === 1 ? 'Supprimer' : '−'}
          </button>
          <span className="quantity" aria-label={`Quantité: ${item.quantity}`}>{item.quantity}</span>
          <button 
            className="qty-btn" 
            onClick={handleIncrease}
            disabled={item.quantity >= 10}
            title={item.quantity >= 10 ? "Maximum atteint (10)" : "Augmenter"}
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
        
        <button 
          className="remove-btn" 
          onClick={handleRemove}
          title="Supprimer"
          aria-label={`Supprimer ${item.title}`}
        >
            Annuler
        </button>
      </div>

      <div className="cart-item-subtotal">
        {(item.price * item.quantity).toFixed(2)} €
      </div>
    </div>
  );
};

export default CartItem;