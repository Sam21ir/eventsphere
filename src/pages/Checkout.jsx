import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { createOrder } from '../services/orderService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Checkout.css';
import { sendOrderToN8n } from '../services/n8nService';


const Checkout = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="empty-checkout">
          <h2>🛒 Votre panier est vide</h2>
          <p>Ajoutez des événements avant de passer commande</p>
          <button onClick={() => navigate('/')} className="btn-home">
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro invalide (10 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: total,
        status: 'En attente',
        createdAt: new Date().toISOString(),
      };

      const order = await createOrder(orderData);

        try {
          await sendOrderToN8n(order);
          console.log('✅ Email envoyé via n8n');
        } catch (error) {
          console.error('⚠️ Erreur email n8n (commande enregistrée quand même)');
        }
        
      dispatch(clearCart());

      navigate('/order-confirmation', { state: { order } });

    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('❌ Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Calculs
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total;
  const taxRate = 0.20;
  const taxes = subtotal * taxRate;
  const totalWithTaxes = subtotal + taxes;

  return (
    <div>
      <Navbar />
      <main className="checkout-container">
        <h1>Finaliser la commande</h1>

        <div className="checkout-content">
          {/* Formulaire */}
          <div className="checkout-form-section">
            <h2>Vos informations</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Samir EL Alami"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="elalamisamirr@gmail.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0630002010"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Traitement en cours...' : `Confirmer et payer`}
              </button>
            </form>
          </div>

          {/* Récapitulatif */}
          <div className="order-summary-section">
            <h2>Récapitulatif de la commande</h2>
            
            <div className="order-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.title} />
                  <div className="summary-item-details">
                    <h4>{item.title}</h4>
                    <p>{item.price.toFixed(2)} € × {item.quantity}</p>
                  </div>
                  <div className="summary-item-total">
                    {(item.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Articles ({itemCount})</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="total-row">
                <span>TVA (20%)</span>
                <span>{taxes.toFixed(2)} €</span>
              </div>
              <div className="total-divider"></div>
              <div className="total-row final">
                <span>Total TTC</span>
                <span>{totalWithTaxes.toFixed(2)} €</span>
              </div>
            </div>

            <div className="security-badge">
              Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;