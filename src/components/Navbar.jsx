import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, selectCartItemCount } from '../store/cartSlice';
import '../styles/Navbar.css';

const Navbar = () => {
  const totalItems = useSelector(selectCartItemCount);
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  // Animation quand le compteur change
  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

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
            Panier
            {totalItems > 0 && (
              <span className={`cart-badge ${animate ? 'animate' : ''}`}>
                {totalItems}
              </span>
            )}
          </button>
        </li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;