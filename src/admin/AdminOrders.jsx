import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('Tous');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      // Trier par date (plus récent en premier)
      const sortedData = data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setMessage('❌ Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setMessage('✅ Statut mis à jour');
      loadOrders();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return;
    }

    try {
      await deleteOrder(orderId);
      setMessage('✅ Commande supprimée');
      loadOrders();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors de la suppression');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredOrders = filter === 'Tous' 
    ? orders 
    : orders.filter(order => order.status === filter);


  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'En attente').length;

  return (
    <div>
      <Navbar />
      <main className="admin-orders-container">
        <div className="admin-header">
          <h1>Gestion des commandes</h1>
          {/* <button onClick={handleLogout} className="logout-btn">
            🚪 Déconnexion
          </button> */}
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* Statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total commandes</h3>
            <p className="stat-value">{totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Chiffre d'affaires</h3>
            <p className="stat-value">{totalRevenue.toFixed(2)} €</p>
          </div>
          <div className="stat-card">
            <h3>En attente</h3>
            <p className="stat-value">{pendingOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Confirmées</h3>
            <p className="stat-value">
              {orders.filter(o => o.status === 'Confirmée').length}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'Tous' ? 'active' : ''}`}
            onClick={() => setFilter('Tous')}
          >
            Tous ({orders.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'En attente' ? 'active' : ''}`}
            onClick={() => setFilter('En attente')}
          >
            En attente ({pendingOrders})
          </button>
          <button 
            className={`filter-btn ${filter === 'Confirmée' ? 'active' : ''}`}
            onClick={() => setFilter('Confirmée')}
          >
            Confirmées ({orders.filter(o => o.status === 'Confirmée').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'Annulée' ? 'active' : ''}`}
            onClick={() => setFilter('Annulée')}
          >
            Annulées ({orders.filter(o => o.status === 'Annulée').length})
          </button>
        </div>

        {/* Tableau des commandes */}
        {loading ? (
          <div className="loading">Chargement des commandes...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <h3>Aucune commande</h3>
            <p>Les commandes apparaîtront ici une fois passées</p>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Articles</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id}</td>
                    <td className="customer-name">{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>{order.customerPhone}</td>
                    <td className="items-count">{order.items.length} article{order.items.length > 1 ? 's' : ''}</td>
                    <td className="order-total">{order.total.toFixed(2)} €</td>
                    <td>
                      <select 
                        className={`status-select status-${order.status.toLowerCase().replace(' ', '-')}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="En attente">En attente</option>
                        <option value="Confirmée">Confirmée</option>
                        <option value="Annulée">Annulée</option>
                      </select>
                    </td>
                    <td className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="actions">
                      <button 
                        className="btn-view"
                        onClick={() => alert(`Détails commande #${order.id}\n\nArticles:\n${order.items.map(item => `- ${item.title} (x${item.quantity})`).join('\n')}`)}
                      >
                        Voir
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(order.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;