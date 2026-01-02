import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEventById } from '../services/eventService';
import { addToCart, openCart, selectItemInCart } from '../store/cartSlice';
import { showInfoToast } from '../utils/toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const itemInCart = useSelector(state => selectItemInCart(Number(id))(state));

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(event));
    }
    dispatch(openCart());
    showInfoToast(`✅ ${quantity} ticket${quantity > 1 ? 's' : ''} ajouté${quantity > 1 ? 's' : ''} au panier`);
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <Navbar />
        <div className="error-container">
          <h2>Événement introuvable</h2>
          <button onClick={() => navigate('/')} className="btn-home">
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="event-details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Retour
        </button>

        <div className="event-details-grid">
          {/* Image */}
          <div className="event-image-section">
            <img 
              src={event.image || 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={event.title}
              className="event-main-image"
            />
            {event.category && (
              <span className="event-category-badge">{event.category}</span>
            )}
          </div>

          {/* Informations */}
          <div className="event-info-section">
            <h1 className="event-title">{event.title}</h1>
            
            <div className="event-meta">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <div>
                  <p className="meta-label">Date</p>
                  <p className="meta-value">
                    {new Date(event.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="meta-item">
                <span className="meta-icon">💰</span>
                <div>
                  <p className="meta-label">Prix du ticket</p>
                  <p className="meta-value price">{event.price.toFixed(2)} €</p>
                </div>
              </div>

              {event.category && (
                <div className="meta-item">
                  <span className="meta-icon">🎭</span>
                  <div>
                    <p className="meta-label">Catégorie</p>
                    <p className="meta-value">{event.category}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="event-description">
              <h2>Description</h2>
              <p>{event.description || 'Aucune description disponible pour cet événement.'}</p>
            </div>

            {/* Sélection quantité */}
            <div className="quantity-section">
              <label>Nombre de tickets</label>
              <div className="quantity-selector">
                <button 
                  className="qty-btn" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={increaseQuantity}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              <p className="qty-hint">Maximum 10 tickets par commande</p>
            </div>

            {/* Prix total */}
            <div className="total-price">
              <span>Total</span>
              <span className="total-amount">{(event.price * quantity).toFixed(2)} €</span>
            </div>

            {/* Bouton d'ajout */}
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Ajouter au panier ({quantity} ticket{quantity > 1 ? 's' : ''})
            </button>

            {itemInCart && (
              <p className="in-cart-notice">
                ✅ Déjà {itemInCart.quantity} ticket{itemInCart.quantity > 1 ? 's' : ''} dans le panier
              </p>
            )}
          </div>
        </div>

        {/* Section supplémentaire (optionnel) */}
        <div className="event-additional-info">
          <h2>Informations pratiques</h2>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-icon">🎫</span>
              <h3>Billets électroniques</h3>
              <p>Recevez vos billets par email immédiatement après l'achat</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🔒</span>
              <h3>Paiement sécurisé</h3>
              <p>Toutes les transactions sont sécurisées et cryptées</p>
            </div>
            <div className="info-card">
              <span className="info-icon">📧</span>
              <h3>Confirmation instantanée</h3>
              <p>Recevez une confirmation par email après votre commande</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;