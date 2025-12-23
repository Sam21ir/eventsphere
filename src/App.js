import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Page d'accueil</h1>} />
        <Route path="/cart" element={<h1>Panier</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
