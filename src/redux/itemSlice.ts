import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { TItem } from '../../types';

const initialState: TItem[] = [];

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TItem[]>) => {
      return action.payload;
    },
  },
});

export const { setItems } = itemSlice.actions;

export const selectItems = (state: RootState) => state.items;

export default itemSlice.reducer;
