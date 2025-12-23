import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Navbar.css';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">EventSphere</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/cart">Panier ({cartItems.length})</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
