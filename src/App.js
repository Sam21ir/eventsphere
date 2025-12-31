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

import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';


function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Notifications Toast */}
        <Toaster />
        
        {/* Sidebar du panier */}
        <CartSidebar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route path="/admin/events" element={<AdminEvents />} /> */}
          <Route path="/cart-test" element={<CartTest />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          {/* Login Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Routes Admin protégées */}
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;