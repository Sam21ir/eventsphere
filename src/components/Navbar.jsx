import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../store/cartSlice';
import '../styles/Navbar.css';

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
          <button className="cart-btn" onClick={handleCartClick}>
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