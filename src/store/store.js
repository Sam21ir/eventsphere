import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import eventsReducer from './eventsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les avertissements pour les dates
        ignoredActions: ['cart/addToCart'],
        ignoredPaths: ['cart.items.addedAt'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // DevTools uniquement en dev
});