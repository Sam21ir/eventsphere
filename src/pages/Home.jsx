import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Bienvenue sur EventSphere</h1>
        <p>Découvrez nos événements</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
