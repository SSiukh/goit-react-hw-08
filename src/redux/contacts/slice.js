import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, { payload }) => {
  state.error = payload;
};

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(({ id }) => id !== payload);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map(item =>
          item.id === payload.id ? { ...item, ...payload } : item
        );
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export default slice.reducer;
