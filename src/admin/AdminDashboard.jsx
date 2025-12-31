import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminDashb.css';
import { useAuth } from '../context/AuthContext';


const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div>
      <Navbar />
      <main className="admin-dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Tableau de bord Admin</h1>
        <button 
            onClick={handleLogout}>
            Déconnexion
        </button>
        </div>


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