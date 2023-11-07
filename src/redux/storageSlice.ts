import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { TStorage } from '../../types';

const initialState: TStorage[] = [];

export const storageSlice = createSlice({
  name: 'storages',
  initialState,
  reducers: {
    setStorages: (state, action: PayloadAction<TStorage[]>) => {
      return action.payload;
    },
  },
});

export const { setStorages } = storageSlice.actions;

export const selectStorages = (state: RootState) => state.storages;

export default storageSlice.reducer;
