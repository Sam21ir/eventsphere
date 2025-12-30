import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartItemCount } from '../store/cartSlice';

const CartTest = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  // Recalcul manuel pour vérification
  const manualTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🧪 Test des calculs du panier</h1>
      
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <h2>Résumé</h2>
        <p><strong>Nombre d'articles:</strong> {itemCount}</p>
        <p><strong>Total Redux:</strong> {total.toFixed(2)} €</p>
        <p><strong>Total recalculé:</strong> {manualTotal.toFixed(2)} €</p>
        <p style={{ color: total === manualTotal ? 'green' : 'red' }}>
          ✓ {total === manualTotal ? 'Calculs corrects ✅' : 'ERREUR DE CALCUL ❌'}
        </p>
      </div>

      <h2>Détails des items</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#61dafb', color: '#282c34' }}>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Titre</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Prix unitaire</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Quantité</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Sous-total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{item.id}</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{item.title}</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{item.price.toFixed(2)} €</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '0.5rem', border: '1px solid #ddd', fontWeight: 'bold' }}>
                {(item.price * item.quantity).toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: '#f8f9fa', fontWeight: 'bold' }}>
            <td colSpan="4" style={{ padding: '0.5rem', border: '1px solid #ddd', textAlign: 'right' }}>
              TOTAL
            </td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd', color: '#61dafb', fontSize: '1.2rem' }}>
              {total.toFixed(2)} €
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTest;