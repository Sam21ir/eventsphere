import React, { useState, useEffect } from 'react';
import { getAllEvents, updateEvent, deleteEvent } from '../services/eventService';
import AdminEventCard from './AdminEventCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminEvents.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    price: '',
    date: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setMessage('❌ Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category || '',
      image: event.image || '',
      price: event.price,
      date: event.date,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const updatedData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await updateEvent(editingEvent.id, updatedData);
      
      setMessage('✅ Événement modifié avec succès !');
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        image: '',
        price: '',
        date: '',
      });
      
      loadEvents();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      setMessage('❌ Erreur lors de la modification');
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      price: '',
      date: '',
    });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      await deleteEvent(id);
      setMessage('✅ Événement supprimé avec succès !');
      loadEvents(); 
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="admin-events-container">
        <h1>Gestion des événements</h1>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* Formulaire de modification */}
        {editingEvent && (
          <div className="edit-form-container">
            <h2>Modifier l'événement</h2>
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label htmlFor="title">Nom de l'événement *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
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

              <div className="form-group">
                <label htmlFor="image">URL de l'image</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Prix (€) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date *</label>
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

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  💾 Enregistrer
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                  ❌ Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des événements */}
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <p>Aucun événement pour le moment</p>
            <a href="/admin/add-event" className="btn-add">Ajouter un événement</a>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <AdminEventCard
                key={event.id}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminEvents;