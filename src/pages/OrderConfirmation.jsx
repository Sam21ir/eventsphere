import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <main className="confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">✅</div>
          <h1>Commande confirmée !</h1>
          <p className="confirmation-message">
            Merci <strong>{order.customerName}</strong> pour votre commande !
          </p>

          <div className="order-details">
            <h2>Détails de la commande</h2>
            <div className="detail-row">
              <span>Numéro de commande :</span>
              <strong>#{order.id}</strong>
            </div>
            <div className="detail-row">
              <span>Email :</span>
              <strong>{order.customerEmail}</strong>
            </div>
            <div className="detail-row">
              <span>Téléphone :</span>
              <strong>{order.customerPhone}</strong>
            </div>
            <div className="detail-row">
              <span>Total payé :</span>
              <strong className="total-amount">{order.total.toFixed(2)} €</strong>
            </div>
            <div className="detail-row">
              <span>Statut :</span>
              <span className="status-badge">{order.status}</span>
            </div>
          </div>

          <div className="order-items-summary">
            <h3>Articles commandés ({order.items.length})</h3>
            {order.items.map((item) => (
              <div key={item.id} className="confirmation-item">
                <span>{item.title}</span>
                <span>{item.quantity}x {item.price.toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="confirmation-actions">
            <button onClick={() => navigate('/')} className="btn-home">
              Retour à l'accueil
            </button>
          </div>

          <p className="email-note">
            Un email de confirmation a été envoyé à <strong>{order.customerEmail}</strong>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;