import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/eventService';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';
import image1 from '../Images/img1.jpg';
import image2 from '../Images/img2.jpg';
import image3 from '../Images/img3.jpg';
import image4 from '../Images/img4.jpg';


const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tous', 'Concert', 'Théâtre', 'Sport', 'Festival', 'Conférence', 'Autre'];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, searchTerm]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getAllEvents();
      console.log('Événements chargés:', data); // Debug
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    console.log('Événements filtrés:', filtered); // Debug
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <Navbar />
      
      <main className="home-container">
        <section className="hero">
          <h1>Bienvenue sur EventSphere</h1>
          <p>Découvrez nos événements</p>
          <div className="grid">
            <div className="card large-left">
              <img src={image1} alt="event 1" />
            </div>
            <div className="card top-right">
                <img src={image2} alt="event 2" />
            </div>
            <div className="card bottom-right-1">
                <img src={image3} alt="event 3" />
            </div>
            <div className="card bottom-right-2">
                <img src={image4} alt="event 4" />
            </div>
          </div>
        </section>

        <section className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher des événements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        <section className="filters-section">
          <h2>Catégories</h2>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <div className="results-count">
          {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
        </div>

        <section className="events-section">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Chargement des événements...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="no-events">
              <h3>Aucun événement trouvé</h3>
              {/* <p>Essayez de modifier vos filtres</p> */}
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;