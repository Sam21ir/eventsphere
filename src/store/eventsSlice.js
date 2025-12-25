import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEvents } from '../services/eventService';

// Action asynchrone pour charger les événements
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEvents();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCategory: 'Tous',
    searchTerm: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = 'Tous';
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory, setSearchTerm, clearFilters } = eventsSlice.actions;

// Sélecteurs
export const selectAllEvents = (state) => state.events.items;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export const selectSelectedCategory = (state) => state.events.selectedCategory;
export const selectSearchTerm = (state) => state.events.searchTerm;

// Sélecteur avec filtrage
export const selectFilteredEvents = (state) => {
  let filtered = state.events.items;
  
  // Filtre par catégorie
  if (state.events.selectedCategory !== 'Tous') {
    filtered = filtered.filter(
      event => event.category === state.events.selectedCategory
    );
  }
  
  // Filtre par recherche
  if (state.events.searchTerm) {
    const searchLower = state.events.searchTerm.toLowerCase();
    filtered = filtered.filter(
      event =>
        event.title.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};

export default eventsSlice.reducer;