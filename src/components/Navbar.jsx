import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, selectCartItemCount } from '../store/cartSlice';
import '../styles/Navbar.css';

const Navbar = () => {
  const totalItems = useSelector(selectCartItemCount);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">EventSphere</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Accueil</Link></li>
        <li>
          <button 
            className="cart-btn" 
            onClick={handleCartClick}
            aria-label={`Panier: ${totalItems} article${totalItems > 1 ? 's' : ''}`}
          >
            🛒 Panier
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;