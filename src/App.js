import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminDashboard from './admin/AdminDashboard';
import AddEvent from './admin/AddEvent';
import AdminEvents from './admin/AdminEvents';
import CartSidebar from './components/CartSidebar';
import './App.css';
import CartTest from './pages/CartTest';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';

import AdminOrders from './admin/AdminOrders';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/cart-test" element={<CartTest />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/add-event" element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/events" element={
            <ProtectedRoute>
              <AdminEvents />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;