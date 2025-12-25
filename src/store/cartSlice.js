import { createSlice } from '@reduxjs/toolkit';

// Helper pour sauvegarder dans localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      items: state.items,
      total: state.total,
    });
    localStorage.setItem('eventsphere_cart', serializedState);
  } catch (error) {
    console.error('Erreur sauvegarde localStorage:', error);
  }
};

// Helper pour charger depuis localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('eventsphere_cart');
    if (serializedState === null) {
      return { items: [], total: 0, isOpen: false };
    }
    const parsed = JSON.parse(serializedState);
    return {
      items: parsed.items || [],
      total: parsed.total || 0,
      isOpen: false,
    };
  } catch (error) {
    console.error('Erreur chargement localStorage:', error);
    return { items: [], total: 0, isOpen: false };
  }
};

// Helper pour calculer le total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadFromLocalStorage(),
  reducers: {
    // Ajouter un événement au panier
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Si l'événement existe déjà, augmenter la quantité
        existingItem.quantity += 1;
      } else {
        // Sinon, l'ajouter avec quantité = 1
        state.items.push({ 
          ...action.payload, 
          quantity: 1,
          addedAt: new Date().toISOString() // Horodatage
        });
      }
      
      state.total = calculateTotal(state.items);
      saveToLocalStorage(state);
    },
    
    // Supprimer un événement du panier
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      saveToLocalStorage(state);
    },
    
    // Mettre à jour la quantité d'un événement
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          // Si quantité <= 0, supprimer l'item
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // Limiter la quantité max à 10 par événement
          item.quantity = Math.min(quantity, 10);
        }
        state.total = calculateTotal(state.items);
        saveToLocalStorage(state);
      }
    },
    
    // Incrémenter la quantité d'un événement
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity < 10) {
        item.quantity += 1;
        state.total = calculateTotal(state.items);
        saveToLocalStorage(state);
      }
    },
    
    // Décrémenter la quantité d'un événement
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.total = calculateTotal(state.items);
          saveToLocalStorage(state);
        }
      }
    },
    
    // Vider complètement le panier
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToLocalStorage(state);
    },
    
    // Ouvrir/Fermer la sidebar
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

// Export des actions
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = cartSlice.actions;

// Sélecteurs (helpers pour accéder au state)
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectIsCartOpen = (state) => state.cart.isOpen;

// Export du reducer
export default cartSlice.reducer;