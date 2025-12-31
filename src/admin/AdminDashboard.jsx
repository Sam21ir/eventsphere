import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminDashb.css';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <main className="admin-dashboard-container">
        <h1>Tableau de bord Admin</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <Link to="/admin/add-event" style={{ textDecoration: 'none' }}>
            <div className='EventAdd'>
              <h2>Ajouter un événement</h2>
            </div>
          </Link>
          <Link to="/admin/events" style={{ textDecoration: 'none' }}>
            <div className='EventManage'>
              <h2>Gérer les événements</h2>
            </div>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: 'none' }}>
            <div className='CommandsManage'>
              <h2>Gérer les commandes</h2>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;