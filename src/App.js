import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import AdminDashboard from './admin/AdminDashboard';
import AddEvent from './admin/AddEvent';
import AdminEvents from './admin/AdminEvents';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-event" element={<AddEvent />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
