import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) => {
    return contacts.filter(
      ({ name, number }) =>
        name.trim().toLowerCase().includes(filterName.trim().toLowerCase()) ||
        number.trim().includes(filterName.trim())
    );
  }
);
