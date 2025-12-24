import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import '../styles/CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <img 
        src={item.image || 'https://via.placeholder.com/80'} 
        alt={item.title}
        className="cart-item-image"
      />
      
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-date">
          📅 {new Date(item.date).toLocaleDateString('fr-FR')}
        </p>
        <p className="cart-item-price">{item.price} € × {item.quantity}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="qty-btn" 
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className="quantity">{item.quantity}</span>
          <button className="qty-btn" onClick={handleIncrease}>
            +
          </button>
        </div>
        
        <button className="remove-btn" onClick={handleRemove}>
          🗑️
        </button>
      </div>

      <div className="cart-item-subtotal">
        {(item.price * item.quantity).toFixed(2)} €
      </div>
    </div>
  );
};

export default CartItem;