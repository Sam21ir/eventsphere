import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Mon Panier</h1>
        <p>Votre panier est vide pour le moment</p>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;