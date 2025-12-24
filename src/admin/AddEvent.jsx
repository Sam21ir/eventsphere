import React, { useState } from 'react';
import { createEvent } from '../services/eventService';
import ImageUpload from '../components/ImageUpload';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AddEvent.css';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    price: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUploaded = (imageUrl) => {
    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!formData.title || !formData.price || !formData.date) {
        setMessage('❌ Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      if (!formData.image) {
        setMessage('❌ Veuillez uploader une image');
        setLoading(false);
        return;
      }

      const eventData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await createEvent(eventData);
      
      setMessage('✅ Événement ajouté avec succès !');
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        category: '',
        image: '',
        price: '',
        date: '',
      });
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de l\'ajout de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-event-container">
        <h1>Ajouter un Événement</h1>
        
        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Nom de l'événement *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Concert de Jazz"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez l'événement..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Sélectionnez --</option>
              <option value="Concert">Concert</option>
              <option value="Théâtre">Théâtre</option>
              <option value="Sport">Sport</option>
              <option value="Festival">Festival</option>
              <option value="Conférence">Conférence</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Composant d'upload d'image */}
          <ImageUpload 
            onImageUploaded={handleImageUploaded}
            currentImage={formData.image}
          />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Prix du ticket (€) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="50"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date de l'événement *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter l\'événement'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddEvent;