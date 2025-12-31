import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  closeCart, 
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  selectCartItemCount
} from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import '../styles/CartSidebar.css';

const CartSidebar = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);
  const itemCount = useSelector(selectCartItemCount);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // tax

  const subtotal = total;
  const taxRate = 0.20;
  const taxes = subtotal * taxRate;
  const totalWithTaxes = subtotal + taxes;

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm(`Voulez-vous vraiment vider le panier (${itemCount} article${itemCount > 1 ? 's' : ''}) ?`)) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>Mon Panier</h2>
          <button className="close-btn" onClick={handleClose} title="Fermer">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Votre panier est vide</h3>
              <p>Ajoutez des événements pour commencer</p>
              <button className="continue-shopping-btn" onClick={handleClose}>
                Continuer les achats
              </button>
            </div>
          ) : (
            <>
              {/* Liste des items */}
              <div className="cart-items-list">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Bouton vider le panier */}
              <button className="clear-cart-btn" onClick={handleClearCart} style={{ fontFamily: 'Englebert' }}>
                Vider le panier ({itemCount} article{itemCount > 1 ? 's' : ''})
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Nombre d'articles</span>
                <span className="summary-value">{itemCount}</span>
              </div>
              <div className="summary-row">
                <span>Sous-total</span>
                <span className="summary-value">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="summary-row">
                <span>TVA (20%)</span>
                <span className="summary-value">{taxes.toFixed(2)} €</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total TTC</span>
                <span className="summary-value">{totalWithTaxes.toFixed(2)} €</span>
              </div>
            </div>
          
            <button className="checkout-btn" onClick={handleCheckout}>
              Passer la commande
            </button>
            <p className="secure-payment">
              Paiement 100% sécurisé
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;